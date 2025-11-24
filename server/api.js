// Simple Express API proxy for TheMealDB with in-memory LRU cache
// Run: node server/api.js

import express from 'express';
import { LRUCache } from 'lru-cache';
import { createClient as createRedisClient } from 'redis';

// Only add if Node < 18
// import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5176;

// Global error handlers to log unexpected crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason && reason.stack ? reason.stack : reason);
});

const THEMEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

// Cache config
const CACHE_TTL = Number(process.env.CACHE_TTL || 5 * 60 * 1000);
const MAX_CACHE_SIZE = Number(process.env.MAX_CACHE_SIZE || 1000);

const cache = new LRUCache({
  max: MAX_CACHE_SIZE,
  ttl: CACHE_TTL,
});

// ---- FIX: Declare counters ----
let cacheHits = 0;
let cacheMisses = 0;

// Redis setup
let redisClient = null;
const useRedis = process.env.USE_REDIS === '1' && process.env.REDIS_URL;

async function initRedis() {
  if (!useRedis) return false;

  try {
    redisClient = createRedisClient({
      url: process.env.REDIS_URL,
      socket: { reconnectStrategy: () => false }
    });

    const errHandler = (err) => {
      console.error("Redis connection error:", err.message);
      redisClient.removeListener("error", errHandler);
    };

    redisClient.on("error", errHandler);

    const connectPromise = redisClient.connect();
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Redis connect timeout")), 3000)
    );

    await Promise.race([connectPromise, timeout]);
    console.log("Connected to Redis");

    return true;

  } catch (err) {
    console.error("Redis failed. Falling back to memory cache.");
    redisClient = null;
    return false;
  }
}

async function fetchAndCache(key, url) {
  // Try Redis first
  try {
    if (redisClient) {
      try {
        const raw = await redisClient.get(key);
        if (raw) {
          cacheHits++;
          return JSON.parse(raw);
        }
      } catch (_) {}
    }

    // Try in-memory
    const local = cache.get(key);
    if (local) {
      cacheHits++;
      return local;
    }

    // Fetch from API
    cacheMisses++;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Upstream error ${res.status}`);

    const data = await res.json();

    cache.set(key, data);

    if (redisClient) {
      try {
        const ttlSeconds = Math.floor(CACHE_TTL / 1000);
        await redisClient.setEx(key, ttlSeconds, JSON.stringify(data));
      } catch (_) {}
    }

    return data;

  } catch (err) {
    throw err;
  }
}

// Routes
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.s || "";
    const key = `search:${q.toLowerCase()}`;
    const url = `${THEMEALDB_API}/search.php?s=${encodeURIComponent(q)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Bad gateway" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const key = "categories:all";
    const url = `${THEMEALDB_API}/categories.php`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Bad gateway" });
  }
});

app.get("/api/filter", async (req, res) => {
  try {
    const c = req.query.c || "";
    const key = `filter:${c.toLowerCase()}`;
    const url = `${THEMEALDB_API}/filter.php?c=${encodeURIComponent(c)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Bad gateway" });
  }
});

app.get("/api/random", async (req, res) => {
  try {
    const key = `random:${Date.now()}`;
    const url = `${THEMEALDB_API}/random.php`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Bad gateway" });
  }
});

app.get("/api/lookup", async (req, res) => {
  try {
    const id = req.query.i || "";
    const key = `lookup:${id}`;
    const url = `${THEMEALDB_API}/lookup.php?i=${encodeURIComponent(id)}`;
    const data = await fetchAndCache(key, url);
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: "Bad gateway" });
  }
});

// Health
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    cacheSize: cache.size,
    usingRedis: Boolean(redisClient),
    cacheHits,
    cacheMisses
  });
});

// Start server
initRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`API proxy running at http://localhost:${PORT}`);
  });
});
