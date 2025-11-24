# Run TheMealDB Explorer locally with API proxy

This project includes a lightweight local API server that proxies TheMealDB and provides an in-memory cache.

Steps to run locally:

1. Install dependencies (if not already):

   npm install

2. Start the API server (runs on port 5174 by default):

   npm run start:api

3. In a separate terminal, start the frontend dev server:

   npm run dev

4. Open the app at http://localhost:5173/

Notes:
- The frontend is configured to call `/api` by default, so the local API will be used automatically.
- Cache TTL and max size can be configured with environment variables before starting the API:

  - CACHE_TTL (ms) default 300000 (5 minutes)
  - MAX_CACHE_SIZE default 1000

Example (PowerShell):

$env:CACHE_TTL=600000; $env:MAX_CACHE_SIZE=200; npm run start:api

Server endpoints available:
- GET /api/search?s=term
- GET /api/categories
- GET /api/filter?c=CategoryName
- GET /api/random
- GET /api/lookup?i=ID
- GET /api/health

Security:
- This local API is intended for local development only and does not require secrets.
