<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# TheMealDB Explorer

A lightweight React + Vite app that explores TheMealDB content. Features:

- Recipe Search: search meals by name
- Category Browser: browse meals by category (Chicken, Vegan, etc.)
- Random Meal: "I'm Feeling Hungry" button to show a random recipe
- Recipe Details: ingredients, instructions, and YouTube video when available

This repository started from a React + Vite starter template and was adapted to use a small local proxy API and an LRU cache for offline-friendly development.

Quick start

1. Install dependencies:

	npm install

2. Start the local API (in one terminal):

	node server/api.js

3. Start the frontend (in another terminal):

	npm run dev

To run both at once (requires `concurrently`):

	npm run dev:all

Notes

- The project contains a simple Express-based `/api` proxy in `server/api.js` that caches TheMealDB responses in-memory with an LRU cache. Set `USE_REDIS=1` and `REDIS_URL` to enable Redis caching.
- Tailwind CSS is configured; styles are in `src/index.css` and components under `src/components/`.

License

This project is provided as-is for learning and exploration.
# TheMealDB
**Recipe Search**: Search bar to find meals by name. - **Category Browser**: Browse meals by category (Chicken, Vegan, etc.). - **Random Meal**: "I'm feeling hungry" button to show a random recipe. - **Recipe Details**: Ingredients list, instructions, and YouTube video embed.
>>>>>>> eec0e217a2b918179db45c8012df0a76bbc0dfc4
