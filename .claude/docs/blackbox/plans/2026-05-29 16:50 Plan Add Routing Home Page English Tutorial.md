# Plan: Add Routing + Home Page ("English Tutorial")

## Context

The app is currently a single-page quiz with no router. The user wants a named landing page ("English Tutorial") at `/` that links to the existing Phrasal Verbs quiz, which moves to `/phrasal-verbs`. This is the foundation for adding more exercise types in the future.

---

## Approach

Install React Router v6, create a minimal home page, wire up routes. `App.tsx` (the phrasal verbs quiz) stays **unchanged** — keeping all existing tests green.

---

## Steps

### 1. Install `react-router-dom`
```bash
npm install react-router-dom
```

### 2. Update `index.html` title
Change `<title>Phrasal Verbs Master Quiz</title>` → `<title>English Tutorial</title>`

### 3. Create `src/pages/HomePage.tsx`
- Heading: "English Tutorial"
- A single nav card/link: **"Phrasal Verbs"** → navigates to `/phrasal-verbs` via `<Link>`
- Reads `darkMode` from `localStorage` (`phrasalQuizState`) and applies `dark` class to `<html>` on mount, matching the existing dark-mode behaviour from `App.tsx`
- Styled with Tailwind (consistent with the rest of the app)

### 4. Update `src/main.tsx`
Wrap the app with `<BrowserRouter>` and define routes:
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/phrasal-verbs" element={<App />} />
  </Routes>
</BrowserRouter>
```

---

## Critical files

| File | Change |
|---|---|
| `src/main.tsx` | Add BrowserRouter + Routes |
| `src/pages/HomePage.tsx` | New file — landing page |
| `index.html` | Title update |
| `package.json` / `package-lock.json` | New dep `react-router-dom` |

`src/App.tsx` and all test files — **no changes**.

---

## Verification

1. `npm run dev` → visit `http://localhost:5173/` — should show "English Tutorial" page with a "Phrasal Verbs" link
2. Click the link → navigates to `/phrasal-verbs`, quiz works as before
3. Browser back button returns to home page
4. Dark mode persists across the navigation
5. `npm run test:run` — all existing tests still pass (App.tsx unchanged)