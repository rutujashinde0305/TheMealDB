/* global process */
import { createClient } from "@supabase/supabase-js";

const THEMEALDB_API = "https://www.themealdb.com/api.php";
const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 1000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

export async function mealsAPI(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const url = new URL(req.url, "http://localhost");
    const path = url.pathname.replace("/meals-api/", "");
    const searchParams = url.searchParams;

  let apiUrl = "";
    let cacheKey = "";

    if (path === "search") {
      const query = searchParams.get("s") || "";
      apiUrl = `${THEMEALDB_API}/search.php?s=${encodeURIComponent(query)}`;
      cacheKey = `search:${query.toLowerCase()}`;
    } else if (path === "categories") {
      apiUrl = `${THEMEALDB_API}/categories.php`;
      cacheKey = "categories:all";
    } else if (path === "filter") {
      const category = searchParams.get("c") || "";
      apiUrl = `${THEMEALDB_API}/filter.php?c=${encodeURIComponent(category)}`;
      cacheKey = `filter:${category.toLowerCase()}`;
    } else if (path === "random") {
      apiUrl = `${THEMEALDB_API}/random.php`;
      cacheKey = `random:${Date.now()}`;
    } else if (path === "lookup") {
      const id = searchParams.get("i") || "";
      apiUrl = `${THEMEALDB_API}/lookup.php?i=${encodeURIComponent(id)}`;
      cacheKey = `lookup:${id}`;
    } else {
      return res.status(400).json({ error: "Invalid endpoint" });
    }

    
    if (path !== "random") {
      const { data: cached } = await supabase
        .from("meal_cache")
        .select("data, expires_at")
        .eq("cache_key", cacheKey)
        .maybeSingle();

      if (cached && new Date(cached.expires_at) > new Date()) {
        return res
          .set({ ...corsHeaders, "X-Cache": "HIT" })
          .json(cached.data);
      }
    }

    
    const response = await fetch(apiUrl);
    const data = await response.json();

    
    if (path !== "random") {
      const expiresAt = new Date(Date.now() + CACHE_TTL).toISOString();

      const { count } = await supabase
        .from("meal_cache")
        .select("*", { count: "exact", head: true });

      if (count && count >= MAX_CACHE_SIZE) {
        await supabase
          .from("meal_cache")
          .delete()
          .lt("expires_at", new Date().toISOString());
      }

      await supabase.from("meal_cache").upsert(
        {
          cache_key: cacheKey,
          data,
          expires_at: expiresAt,
        },
        { onConflict: "cache_key" }
      );
    }

    return res.set({ ...corsHeaders, "X-Cache": "MISS" }).json(data);
  } catch (error) {
    console.error("Error:", error);
    return res
      .set(corsHeaders)
      .status(500)
      .json({ error: "Internal server error" });
  }
}
