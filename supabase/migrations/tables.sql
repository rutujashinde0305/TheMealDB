
CREATE TABLE IF NOT EXISTS meal_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

CREATE TABLE IF NOT EXISTS cache_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text UNIQUE NOT NULL,
  hits integer DEFAULT 0,
  misses integer DEFAULT 0,
  last_accessed timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_meal_cache_key ON meal_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_meal_cache_expires ON meal_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_cache_stats_endpoint ON cache_stats(endpoint);

ALTER TABLE meal_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE cache_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to meal cache"
  ON meal_cache FOR SELECT
  TO anon, authenticated
  USING (expires_at > now());

CREATE POLICY "Allow public read access to cache stats"
  ON cache_stats FOR SELECT
  TO anon, authenticated
  USING (true);