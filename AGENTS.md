# weather-app

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

No test, lint, typecheck, or formatter tooling is configured.

## Architecture

- **Entrypoint**: `src/main.js` → mounts `App.vue`, installs `naive-ui` as a Vue plugin
- **Component tree**: `App.vue` → `AppHeader`, `SearchBar`, `WeatherPanel` → `CurrentWeather` + `WeatherStats`; `BgDecorations` for animated circles
- **State management**: composable-based stores in `src/store/` — each domain (`weather/`, `background/`) has its own folder with an `index.js` that exports a `useXxx()` function using module-level singleton state
  - `src/store/weather/` — city, weatherData, isLoading, error state; `fetchWeather()` via axios; all computed derived values (temp, humidity, wind, icon URL, etc.)
  - `src/store/background/` — `getWeatherBackground()` pure function + `useBackground()` computed that reads from weather store
- **Styling**: custom design system via CSS custom properties in `src/assets/base.css` — all visual tokens are `var(--xxx)` references. Weather-based backgrounds map OpenWeatherMap `weather[0].main` to CSS variable names.

## Conventions

- **Path alias**: `@/` maps to `./src/` (configured in `vite.config.js` + `jsconfig.json`)
- **Imports**: store composables use `@/store/weather` and `@/store/background`; component imports within `src/components/` use relative paths
- **API**: OpenWeatherMap `/data/2.5/weather` endpoint, metric units, single API key in env vars
- **Env**: `.env` is gitignored; it contains `VITE_WEATHER_API_KEY` and `VITE_API_URL`. Copy or create `.env` (reference `.env` is in the repo for local development)
- **Favicons**: multiple sizes in `public/` referenced from `index.html`

## Notable

- `.env` is intentionally gitignored — the committed `.env` serves as a local dev reference, not a secret store. Treat the API key as a development-only value.
- Components use Vue 3 `<script setup>` + Composition API throughout.
- Naive UI is installed but no Naive UI components are directly used in the templates.
- No `provide`/`inject` needed — stores are singleton composables imported directly where needed.
