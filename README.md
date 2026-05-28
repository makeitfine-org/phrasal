# Phrasal Verbs Master Quiz

A flashcard-style quiz app for practising English phrasal verbs. Built with Vite, React 18, and Tailwind CSS — migrated from a legacy single-file HTML/CDN app.

## Features

- 228 phrasal verbs with definitions, example sentences, and masked hints
- Answer checking with instant correct/wrong feedback
- Mastered-verb tracking persisted across sessions
- Exclude verbs from the quiz pool and re-include them at any time
- Search and jump to any verb by name or definition
- Dark/light mode toggle
- Keyboard shortcuts for hands-free navigation
- Touch swipe support for mobile
- Session history — navigate back to previously seen cards
- IDK button to reveal the answer without guessing

---

## Architecture

```
phrasal/
├── index.html                  # Vite HTML entry point (Inter font, #root div)
├── vite.config.js              # Vite + @vitejs/plugin-react + Vitest config
├── tailwind.config.js          # darkMode: 'class', extends gray-850 color
├── postcss.config.js           # tailwindcss + autoprefixer
├── package.json
└── src/
    ├── main.jsx                # ReactDOM.createRoot bootstrap
    ├── index.css               # @tailwind directives, fadeIn keyframe, .fade-in class
    ├── App.jsx                 # Root component: all state, effects, event handlers
    ├── data/
    │   └── phrasalVerbs.js     # rawData array + allVerbs derived export
    ├── utils/
    │   └── renderSentence.jsx  # renderSentenceWithMask utility (exported for testing)
    ├── components/
    │   ├── Icons.jsx           # SVG icon components (SunIcon, MoonIcon, Trash2, etc.)
    │   ├── Header.jsx          # Title, mastered count, question №, dark toggle, reset
    │   ├── QuizCard.jsx        # Explanation, hint, masked sentence, answer input form
    │   ├── Feedback.jsx        # Correct / wrong result panel (fade-in animated)
    │   ├── NavigationControls.jsx  # Prev/Next history nav + Reset + Skip buttons
    │   ├── ExcludedModal.jsx   # Modal listing excluded verbs with search and re-include
    │   └── SearchModal.jsx     # Modal for searching and jumping to any verb
    └── __tests__/
        ├── setup.js            # jest-dom, scrollIntoView stub, localStorage mock
        ├── renderSentence.test.jsx
        ├── Feedback.test.jsx
        ├── Header.test.jsx
        ├── NavigationControls.test.jsx
        ├── QuizCard.test.jsx
        ├── ExcludedModal.test.jsx
        ├── SearchModal.test.jsx
        └── App.test.jsx
```

### State model (`App.jsx`)

All application state lives in `App.jsx` and is persisted to `localStorage` under the key `phrasalQuizState`.

| State | Type | Description |
|---|---|---|
| `darkMode` | `boolean` | Drives the `dark` class on the root element |
| `mastered` | `Set<number>` | Indices of correctly answered verbs |
| `excluded` | `Set<number>` | Indices excluded from the active quiz pool |
| `history` | `HistoryItem[]` | Ordered list of cards shown this session |
| `currentIndex` | `number` | Pointer into `history` (enables back navigation) |
| `revealSentence` | `boolean` | Whether the masked words in the sentence are shown |

`HistoryItem` shape: `{ index: number, inputValue: string, status: 'idle' | 'correct' | 'wrong' }`.

### Data flow

```
phrasalVerbs.js  →  allVerbs[]
                         ↓
                      App.jsx  (state + handlers)
               ↙    ↙    ↓    ↓         ↘         ↘
          Header  QuizCard  Feedback  NavigationControls  ExcludedModal  SearchModal
```

`App.jsx` passes data and callbacks as props — no context or global store needed at this scale.

### Sentence masking

`renderSentenceWithMask` (`src/utils/renderSentence.jsx`) splits the example sentence on a case-insensitive regex built from the `wordsToHide` field of each verb entry. Longer phrases are matched first to avoid partial overlaps. Matched tokens are rendered as clickable `<span>` elements that toggle between an `XXX` placeholder and the real text.

### Verb data format

Each entry in `rawData` is a 5-element tuple:

```js
[verb, definition, exampleSentence, wordsToHide, isLearned]
//  0        1             2               3           4
```

`allVerbs` is `rawData` filtered to `isLearned === false` (index 4), so setting the 5th field to `true` removes a verb from the active quiz pool. The example sentence (index 2) can be a string or an array of strings; `allVerbs` normalises both to `string[]`.

---

## Deployment

The app is deployed to GitHub Pages and publicly accessible at:

**https://makeitfine-org.github.io/phrasal/**

### Releasing a new version

Tag the commit you want to deploy and push the tag:

```bash
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

The `phrasal-deploy.yml` workflow triggers automatically on any `v*.*.*` tag (and
on every push to `main`). It runs the test suite, builds the app, and deploys to
Pages. Track progress under the **Actions** tab; the live URL also appears in the
deploy job summary once it completes.

To re-deploy without changing source (e.g. after a Pages outage):
**Actions → Deploy to GitHub Pages → Run workflow**.

> **Prerequisite:** Settings → Pages → Source must be set to **GitHub Actions**
> in the `makeitfine-org/phrasal` repo before the first deploy.

---

## Usage

### Install & run

```bash
npm install
npm run dev        # dev server at http://localhost:5173
```

### Tests

```bash
npm test           # Vitest in watch mode
npm run test:run   # one-shot (CI)
```

### Build for production

```bash
npm run build      # output in dist/
npm run preview    # preview the production build locally
```

### Serve in production

The build output in `dist/` is a static site — serve it with any static file server.

**Node (`serve` package):**
```bash
npx serve dist
```

**Python (quick check):**
```bash
python3 -m http.server 8080 --directory dist
```

**nginx — minimal config:**
```nginx
server {
    listen 80;
    root /var/www/phrasal/dist;
    index index.html;

    # Required for client-side routing (SPA fallback)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache hashed assets indefinitely; revalidate index.html
    location ~* \.(js|css|woff2|png|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location = /index.html {
        add_header Cache-Control "no-cache";
    }
}
```

> All user state is stored in `localStorage` — no backend or database required.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `←` / `→` | Navigate back / forward through history |
| `Enter` (after answering) | Go to next card |
| `Escape` | Mark current card as IDK (reveal answer) |
| `` ` `` or `Ctrl+R` | Reset current card back to idle |

### Touch / swipe

| Gesture | Action |
|---|---|
| Swipe left | Next card |
| Swipe right | Previous card |

### Adding new verbs

Edit `src/data/phrasalVerbs.js` and append to `rawData`:

```js
["Verb phrase", "Definition", "Example sentence using the verb phrase.", ["verb", "phrase"], false],
//                                                                          ^                  ^
//                                                               words to mask           false = active
```

Set the 5th field to `true` to mark a verb as already learned — it will be excluded from the quiz pool.
