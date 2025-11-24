const API_BASE_URL = import.meta.env.VITE_API_BASE || '/api';
const UPSTREAM_BASE = 'https://www.themealdb.com/api/json/v1/1';

const headers = {
  'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

async function tryFetchJson(url, options) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    const text = await res.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (err) {
    return null;
  }
}

export const mealService = {
  async searchMeals(query) {
    // Try local API first, fall back to upstream
    const local = await tryFetchJson(`${API_BASE_URL}/search?s=${encodeURIComponent(query)}`, { headers });
    if (local && local.meals) return local.meals;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/search.php?s=${encodeURIComponent(query)}`);
    return (up && up.meals) ? up.meals : [];
  },

  async getCategories() {
    const local = await tryFetchJson(`${API_BASE_URL}/categories`, { headers });
    if (local && local.categories) return local.categories;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/categories.php`);
    return (up && up.categories) ? up.categories : [];
  },

  async getMealsByCategory(category) {
    const local = await tryFetchJson(`${API_BASE_URL}/filter?c=${encodeURIComponent(category)}`, { headers });
    if (local && local.meals) return local.meals;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/filter.php?c=${encodeURIComponent(category)}`);
    return (up && up.meals) ? up.meals : [];
  },

  async getAreas() {
    const local = await tryFetchJson(`${API_BASE_URL}/areas`, { headers });
    if (local && local.meals) return local.meals;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/list.php?a=list`);
    return (up && up.meals) ? up.meals : [];
  },

  async getMealsByArea(area) {
    const local = await tryFetchJson(`${API_BASE_URL}/filterByArea?a=${encodeURIComponent(area)}`, { headers });
    if (local && local.meals) return local.meals;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/filter.php?a=${encodeURIComponent(area)}`);
    return (up && up.meals) ? up.meals : [];
  },

  async getRandomMeal() {
    const local = await tryFetchJson(`${API_BASE_URL}/random`, { headers });
    if (local && local.meals) return local.meals[0] || null;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/random.php`);
    return (up && up.meals) ? up.meals[0] : null;
  },

  async getMealById(id) {
    const local = await tryFetchJson(`${API_BASE_URL}/lookup?i=${encodeURIComponent(id)}`, { headers });
    if (local && local.meals) return local.meals[0] || null;

    const up = await tryFetchJson(`${UPSTREAM_BASE}/lookup.php?i=${encodeURIComponent(id)}`);
    return (up && up.meals) ? up.meals[0] : null;
  },
};
