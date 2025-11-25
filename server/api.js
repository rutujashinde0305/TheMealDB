/* eslint-env node */
/* eslint-disable no-undef */

import express from 'express';
import { LRUCache } from 'lru-cache';
import { createClient as createRedisClient } from 'redis';

const app = express();
const PORT = process.env.PORT || 5176;

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

const CACHE_TTL = process.env.CACHE_TTL ? Number(process.env.CACHE_TTL) : 5 * 60 * 1000;
const MAX_CACHE_SIZE = process.env.MAX_CACHE_SIZE ? Number(process.env.MAX_CACHE_SIZE) : 1000;

const cache = new LRUCache({
  max: MAX_CACHE_SIZE,
  ttl: CACHE_TTL,
});

let cacheHits = 0;
let cacheMisses = 0;

let redisClient = null;
const useRedis = Boolean(process.env.REDIS_URL);

async function initRedis() {
  if (!useRedis) return false;
  try {
    redisClient = createRedisClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis error', err));
    await redisClient.connect();
    console.log('Connected to Redis at', process.env.REDIS_URL);
    return true;
  } catch (err) {
    console.error('Failed to connect to Redis, falling back to in-memory cache', err);
    redisClient = null;
    return false;
  }
}

async function fetchAndCache(key, url) {
  if (redisClient) {
    try {
      const raw = await redisClient.get(key);
      if (raw) {
        cacheHits += 1;
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Redis get error', err);
    }
  }

  const cached = cache.get(key);
  if (cached) {
    cacheHits += 1;
    return cached;
  }

  cacheMisses += 1;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Upstream error ${res.status}`);
  const data = await res.json();

  cache.set(key, data);

  if (redisClient) {
    try {
      const ttlSeconds = Math.max(1, Math.floor(CACHE_TTL / 1000));
      if (redisClient.setEx) {
        await redisClient.setEx(key, ttlSeconds, JSON.stringify(data));
      } else {
        await redisClient.set(key, JSON.stringify(data), { EX: ttlSeconds });
      }
    } catch (err) {
      console.error('Redis set error', err);
    }
  }

  return data;
}

app.get('/api/search', async (req, res) => {
  try {
    const q = req.query.s || '';
    const key = `search:${q.toLowerCase()}`;
    const url = `${THEMEALDB_API}/search.php?s=${encodeURIComponent(q)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const key = 'categories:all';
    const url = `${THEMEALDB_API}/categories.php`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/filter', async (req, res) => {
  try {
    const c = req.query.c || '';
    const key = `filter:${c.toLowerCase()}`;
    const url = `${THEMEALDB_API}/filter.php?c=${encodeURIComponent(c)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/areas', async (req, res) => {
  try {
    const key = 'areas:all';
    const url = `${THEMEALDB_API}/list.php?a=list`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/filterByArea', async (req, res) => {
  try {
    const a = req.query.a || '';
    const key = `filterArea:${a.toLowerCase()}`;
    const url = `${THEMEALDB_API}/filter.php?a=${encodeURIComponent(a)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/random', async (req, res) => {
  try {
    const key = `random:${new Date().toISOString().slice(0,16)}`;
    const url = `${THEMEALDB_API}/random.php`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/lookup', async (req, res) => {
  try {
    const id = req.query.i || '';
    const key = `lookup:${id}`;
    const url = `${THEMEALDB_API}/lookup.php?i=${encodeURIComponent(id)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: 'Bad gateway' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, cacheSize: cache.size, usingRedis: Boolean(redisClient), cacheHits, cacheMisses });
});

initRedis()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API proxy listening on http://localhost:${PORT}`);
      console.log(`Cache TTL: ${CACHE_TTL}ms, max size: ${MAX_CACHE_SIZE}`);
    });
  })
  .catch((err) => {
    console.error('Error initializing cache adapters:', err);
    app.listen(PORT, () => {
      console.log(`API proxy listening on http://localhost:${PORT} (no Redis)`);
      console.log(`Cache TTL: ${CACHE_TTL}ms, max size: ${MAX_CACHE_SIZE}`);
    });
  });
