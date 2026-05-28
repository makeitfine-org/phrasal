# Deploying to GitHub Pages

This app lives in its own repo (`makeitfine-org/phrasal`) and is deployed as a
static site to GitHub Pages at:

```
https://makeitfine-org.github.io/phrasal/
```

## 1. Set the Vite base path

Open `vite.config.js` and add a `base` field matching the Pages path:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/phrasal/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
  },
});
```

Vite embeds this prefix into all asset URLs at build time. Without it, the
browser requests assets from `/assets/…` instead of `/phrasal/assets/…`
and the page renders blank.

> **Verify locally:** after changing `base`, run `npm run build && npm run preview`
> and open the URL printed by `preview` to confirm the app loads correctly.

## 2. Configure the GitHub repository

1. Go to **Settings → Pages** in the `makeitfine-org/phrasal` repo.
2. Under **Source**, select **GitHub Actions** (not the legacy branch option).
3. Save. GitHub will now accept deploys triggered by a workflow.

## 3. Create the deploy workflow

Add `.github/workflows/phrasal-deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

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
          cache-dependency-path: package-lock.json

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

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
- Runs on every push to `main`, on any `v*.*.*` tag, and can be triggered manually from the Actions tab
- Runs tests before building so a broken build is never deployed
- Uses the official `actions/upload-pages-artifact` + `actions/deploy-pages` pair,
  which avoids the need for a `gh-pages` branch
- Exposes the live URL as a deployment link in the Actions summary

> The existing `phrasal.yml` workflow handles CI (test + build) on pull requests.
> This deploy workflow is separate and runs on pushes to `main` or on version tags.

## 4. First deploy

```bash
git add .github/workflows/phrasal-deploy.yml vite.config.js
git commit -m "add GitHub Pages deploy workflow"
git push origin main
```

Open **Actions** in GitHub to watch the run. When it completes, the live URL
appears in the **deploy** job summary and under **Settings → Pages**.

## 5. Subsequent deploys

Every push to `main` and every `v*.*.*` tag triggers the workflow automatically.
No manual steps required.

To release a new version:

```bash
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

To trigger a deploy without changing any source file (e.g. to re-deploy after
a Pages outage), use **Actions → Deploy to GitHub Pages → Run workflow**.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Blank page, 404 errors in console | Wrong `base` in `vite.config.js` | Set `base` to `/phrasal/` |
| `403 Resource not accessible` in the deploy job | Pages source not set to GitHub Actions | Settings → Pages → Source → GitHub Actions |
| Assets load but routing breaks on refresh | React Router using browser history | Use `HashRouter` instead of `BrowserRouter`, or add a `404.html` redirect |
| Old content served after deploy | Browser cache | Hard-refresh (`Ctrl+Shift+R`) or check that asset filenames changed in `dist/` |
