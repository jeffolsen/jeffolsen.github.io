# jeffolsen.github.io

Angular app, served from GitHub Pages at the repo root.

## Stack

- Angular 22 (standalone components, signals)
- Yarn (Classic) for package management
- Storybook for component development
- IndexedDB-backed HTTP cache (`src/app/core`) with TTL, so the API isn't re-hit on every page load

## Node version

Pinned via `.nvmrc`. Run `nvm use` before installing or running anything.

## Development

```bash
yarn install
yarn start          # dev server at localhost:4200
yarn storybook       # component explorer
```

## Build

```bash
yarn build           # production build -> dist/jeffolsen-site/browser
```

## API config

`public/config.json` (gitignored) holds the real `apiBaseUrl`/`apiKey`, loaded at runtime by `ConfigService`. Copy `public/config.example.json` to get started.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages via Actions. Repo Settings → Pages → "Build and deployment" source must be set to "GitHub Actions".
