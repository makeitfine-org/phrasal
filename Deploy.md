# Deploying to GitHub Pages

This app is part of the `makeitfine-org/docs` monorepo. These steps deploy the
Vite build output to GitHub Pages so the quiz is publicly accessible.

## 1. Determine the public URL

GitHub Pages serves the `makeitfine-org/docs` repo at:

```
https://makeitfine-org.github.io/docs/
```

Decide where within that site the app will live:

| Desired URL | `base` value to use |
|---|---|
| `https://makeitfine-org.github.io/docs/` | `/docs/` |
| `https://makeitfine-org.github.io/docs/phrasal/` | `/docs/phrasal/` |

## 2. Set the Vite base path

Open `vite.config.js` and add a `base` field matching your choice above:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/docs/phrasal/',   // ← adjust if needed
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
  },
});
```

Vite embeds this prefix into all asset URLs at build time. Without it, the
browser requests assets from `/assets/…` instead of `/docs/phrasal/assets/…`
and the page renders blank.

> **Verify locally:** after changing `base`, run `npm run build && npm run preview`
> and open the URL printed by `preview` to confirm the app loads correctly.

## 3. Configure the GitHub repository

1. Go to **Settings → Pages** in the `makeitfine-org/docs` repo.
2. Under **Source**, select **GitHub Actions** (not the legacy branch option).
3. Save. GitHub will now accept deploys triggered by a workflow.

## 4. Create the deploy workflow

Add a new file at `.github/workflows/phrasal-deploy.yml` in the repo root
(not inside the `phrasal/` subdirectory):

```yaml
name: Deploy Phrasal Verbs to GitHub Pages

on:
  push:
    branches:
      - master
    paths:
      - 'phrasal/**'
      - '.github/workflows/phrasal-deploy.yml'

  # Allow manual trigger from the Actions tab
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Only one deploy runs at a time; skip queued runs but don't cancel in-progress.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: phrasal/package-lock.json

      - name: Install dependencies
        working-directory: phrasal
        run: npm install

      - name: Run tests
        working-directory: phrasal
        run: npm run test:run

      - name: Build
        working-directory: phrasal
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: phrasal/dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This workflow:
- Runs only on pushes to `master` that touch `phrasal/` (or the workflow file itself)
- Runs tests before building so a broken build is never deployed
- Uses the official `actions/upload-pages-artifact` + `actions/deploy-pages` pair,
  which avoids the need for a `gh-pages` branch
- Exposes the live URL as a deployment link in the Actions summary

## 5. First deploy

```bash
# From the repo root, not from phrasal/
git add .github/workflows/phrasal-deploy.yml phrasal/vite.config.js
git commit -m "add phrasal verbs GitHub Pages deploy workflow"
git push origin master
```

Open **Actions** in GitHub to watch the run. When it completes, the live URL
appears in the **deploy** job summary and under **Settings → Pages**.

## 6. Subsequent deploys

Every push to `master` that modifies any file under `phrasal/` triggers the
workflow automatically. No manual steps required.

To trigger a deploy without changing any source file (e.g. to re-deploy after
a Pages outage), use **Actions → Deploy Phrasal Verbs to GitHub Pages →
Run workflow**.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Blank page, 404 errors in console | Wrong `base` in `vite.config.js` | Match `base` to the actual Pages URL path |
| `403 Resource not accessible` in the deploy job | Pages source not set to GitHub Actions | Settings → Pages → Source → GitHub Actions |
| Assets load but routing breaks on refresh | React Router using browser history | Use `HashRouter` instead of `BrowserRouter`, or add a `404.html` redirect |
| Old content served after deploy | Browser cache | Hard-refresh (`Ctrl+Shift+R`) or check that asset filenames changed in `dist/` |
