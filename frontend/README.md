# Phrasal — Frontend

React 18 + TypeScript + Vite SPA for the Phrasal language learning app. Features phrasal verb quizzes, grammar exercises, and a browsable verb reference library with 71 individual verb detail pages.

Part of the full-stack **Phrasal** project. Running `docker compose up` from the repository root also starts the backend on **port 8080**. See [`../backend/README.md`](../backend/README.md) for backend documentation.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, TypeScript |
| Build | Vite 8 with HMR |
| Styling | Tailwind CSS 4 (PostCSS plugin) |
| Routing | react-router-dom 7 |
| HTTP | Native `fetch` wrapper (no Axios) |
| Unit testing | Vitest + React Testing Library |

---

## Prerequisites

- Node.js 26+
- npm 10+
- Spring Boot backend running on `http://localhost:8080` (see `../backend/README.md`)

---

## Quick Start

```bash
npm install
npm run dev
```

App opens at **http://localhost:5173**.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Dev server with HMR on port 5173 |
| `build` | `vite build` | Bundle to `dist/` |
| `preview` | `vite preview` | Preview production build |
| `test` | `vitest` | Vitest in watch mode |
| `test:run` | `vitest run` | Vitest one-shot (CI) |

---

## Features

- 270 phrasal verbs with definitions, example sentences, and masked hints
- 71 individual verb detail pages with collapsible particle sections and meaning cards
- Fill-in-the-blank quiz with answer checking and mastered-verb tracking
- Grammar exercises (I wish / If only translation quiz)
- Particle reference page (27 core particle meanings)
- Search and jump to any verb by name or definition
- Exclude/re-include verbs from the quiz pool
- Dark/light mode toggle
- Session history with back/forward navigation
- Keyboard shortcuts and touch swipe support
- All user progress persisted in localStorage

---

## Routing

| Path | Component | Purpose |
|---|---|---|
| `/` | `HomePage` | Choose exercise type |
| `/phrasal-verbs` | `PhrasalVerbsPage` | Choose quiz, list, or particles |
| `/phrasal-verbs/test-most-popular` | `App` | Phrasal verbs fill-in-the-blank quiz |
| `/phrasal-verbs/particles` | `ParticlesPage` | Reference: 27 particle core meanings |
| `/phrasal-verbs/list` | `PhrasalVerbsListPage` | Browse all verbs as expandable cards |
| `/phrasal-verbs/list/:verb` | `VerbDetailPage` | Dynamic verb detail page (fetches from API) |
| `/grammar` | `GrammarPage` | Choose grammar exercise |
| `/grammar/i-wish-if-only` | `IWishPage` | Translation quiz (Russian → English) |
| `*` | `NotFoundPage` | 404 |

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `←` / `→` | Navigate back / forward through history |
| `Enter` (after answering) | Go to next card |
| `Escape` | Reveal the answer (IDK) |
| `` ` `` or `Ctrl+R` | Reset current card |

Touch: swipe left/right for next/previous card.

---

## Project Structure

```
src/
├── main.tsx              # Router setup (ErrorBoundary > BrowserRouter > PageShell)
├── App.tsx               # Phrasal verb quiz page
├── api/                  # fetch wrapper + API calls (phrasalVerbs, grammar, verbDetails)
├── components/           # Shared UI (QuizCard, Header, Feedback, modals, etc.)
├── pages/                # Route pages
├── data/                 # Static reference data, search index
├── hooks/                # usePhrasalVerbs, useGrammarEntries, useVerbList, useVerbDetail
├── utils/                # renderSentence, normalizeAnswer
├── types.ts              # Shared types (Status, VerbEntry, GrammarEntry, etc.)
└── __tests__/            # Vitest + Testing Library (4700+ tests)
    └── listPage/         # List page tests with shared helpers
```

---

## Docker

The frontend ships as an Nginx container:

```
Dockerfile — multi-stage build
  stage 1: node:26-alpine  → npm run build → dist/
  stage 2: nginx:stable-alpine → serves dist/ on port 80
```

`nginx.conf` handles SPA routing (`try_files $uri /index.html`) and proxies all `/api/*` requests to `app:8080`, so the browser never needs to know the backend's address.

```bash
# Build and run via docker-compose (recommended, from repo root)
docker compose up frontend

# Build the image standalone
docker build -t phrasal-frontend .
```

---

## Testing

### Unit tests — Vitest + React Testing Library

```bash
npx vitest run    # run once
npx vitest        # watch mode
```

### Test conventions

- Setup file: `src/__tests__/setup.ts` (jest-dom matchers, `scrollIntoView` stub, localStorage mock)
- One `.test.tsx` per component/page
- List page tests in `src/__tests__/listPage/` with shared `helpers.tsx`
