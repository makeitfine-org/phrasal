# Gemini Project Context: Phrasal Verbs Master Quiz

This document provides essential context and guidelines for the Phrasal Verbs Master Quiz project.

## Project Overview

Phrasal Verbs Master Quiz is a flashcard-style web application for practicing English phrasal verbs. It allows users to test their knowledge of meanings and usage in sentences through an interactive quiz interface.

### Core Technologies
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router 7
- **Testing:** Vitest with React Testing Library and JSDOM
- **Deployment:** GitHub Pages (Base URL: `/phrasal/`)

### Architecture
- **State Management:** Local component state in `src/App.tsx`, persisted to `localStorage` under the key `phrasalQuizState`.
- **Layout:** A shared `PageShell` component wraps the application, providing theme management and basic structure.
- **Routing:** Simple client-side routing using `react-router-dom`.
- **Data Model:** Phrasal verbs are stored in a raw tuple format in `src/data/phrasalVerbs.ts` and normalized for application use.

## Building and Running

### Development
```bash
npm install    # Install dependencies
npm run dev    # Start development server at http://localhost:5173
```

### Testing
```bash
npm test          # Run Vitest in watch mode
npm run test:run  # Run tests once (CI mode)
```

### Production
```bash
npm run build    # Build optimized assets to dist/
npm run preview  # Preview the production build locally
```

## Development Conventions

### Directory Structure
- `src/components/`: Reusable UI components (QuizCard, Header, Feedback, etc.).
- `src/pages/`: Page-level components (HomePage, App, NotFoundPage).
- `src/data/`: Static data sources, primarily `phrasalVerbs.ts`.
- `src/utils/`: Utility functions (e.g., sentence masking logic).
- `src/__tests__/`: Comprehensive test suite using Vitest and RTL.
- `src/types.ts`: Centralized TypeScript interfaces and types.

### Coding Style
- **TypeScript:** Strict typing is preferred. Use interfaces and types defined in `src/types.ts`.
- **Styling:** Use Tailwind CSS utility classes directly in JSX.
- **Persistence:** All progress (mastered verbs, excluded verbs, history) is stored in `localStorage`.
- **Components:** Functional components with Hooks are standard.

### Adding Data
To add new phrasal verbs, append to the `rawData` array in `src/data/phrasalVerbs.ts` following the tuple format:
`["Verb", "Definition", "Example Sentence", ["words", "to", "mask"], false]`

### Testing Standards
- Every component and utility should have corresponding tests in `src/__tests__/`.
- Use `screen` from `@testing-library/react` for querying.
- Mock `localStorage` and other browser APIs as needed in `src/__tests__/setup.ts`.
