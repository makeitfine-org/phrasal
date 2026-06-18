# Task 68: Keyboard Navigation and Accessibility

## Context
The app lacks focus trapping in modals, ARIA attributes on interactive elements, and a skip-to-content link. Arrow key quiz navigation and Escape-to-close already work. This task adds the missing accessibility features.

## Key Finding
**AC #1 and #2 are already implemented** in `useQuiz.ts` (lines 251-281): ArrowLeft/Right navigate cards, Escape triggers IDK, and individual modal `useEffect` handlers close on Escape. Tests need to verify they work.

## Plan

### 1. Create `src/hooks/useFocusTrap.ts` (new file)
Shared hook consumed by all 5 modals.
- **Focus trap**: On Tab keydown inside the container, wrap focus between first and last focusable elements. Re-query focusable elements on each Tab press (modals have dynamic content).
- **Focus restore**: Capture `document.activeElement` during the first render (before `autoFocus` fires), restore it on unmount.
- Signature: `useFocusTrap(containerRef: RefObject<HTMLElement | null>): void`

### 2. Update all 5 modals (AC #3, #4, #5)
Same pattern for each modal:
- Add `ref={panelRef}` + `role="dialog"` + `aria-modal="true"` to the **inner panel** div
- Add `aria-labelledby` pointing to `<h2>` id (ExcludedModal, AllVerbsModal, TutorialModal) or `aria-label` on the panel itself (SearchModal, ListSearchModal — no visible title)
- Call `useFocusTrap(panelRef)`
- Add `aria-label="Close"` to close buttons missing it (ExcludedModal, SearchModal, ListSearchModal)

### 3. VerbPageLayout accessibility (AC #6)
In `src/components/VerbPage.tsx`:
- Section header divs: add `role="button"`, `tabIndex={0}`, `aria-expanded={expanded}`, onKeyDown for Enter/Space
- Meaning card divs: add `role="button"`, `tabIndex={0}`, `aria-expanded={!collapsed}`, onKeyDown for Enter/Space

### 4. Quiz input and nav button ARIA labels (AC #7)
- `QuizCard.tsx`: add `aria-label="Your answer"` to input
- `NavigationControls.tsx`: add `aria-label="Previous card"` / `aria-label="Next card"` to buttons

### 5. Skip-to-content link + dark mode aria-label (AC #8)
In `PageShell.tsx`:
- Add `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>` as first element
- Wrap `{children}` in `<main id="main-content">`
- Add `aria-label` to dark mode toggle reflecting current state

### 6. Tests (AC #9)
- New `src/__tests__/useFocusTrap.test.tsx`: trap forward/backward, focus restore
- New `src/__tests__/VerbPageLayout.test.tsx`: aria-expanded, keyboard toggle (Enter/Space) for sections and meanings
- Update 5 modal test files: verify `role="dialog"`, `aria-modal`, `aria-labelledby`/`aria-label`, close button `aria-label`
- Update `QuizCard.test.tsx`: verify input `aria-label`
- Update `NavigationControls.test.tsx`: verify button `aria-label`s
- Update `PageShell.test.tsx`: skip link, `<main>` landmark, toggle `aria-label`
- Add keyboard nav tests in `useQuiz.test.ts` (ArrowLeft/Right when input not focused)

### 7. Verify `npm run test:run` passes (AC #10)

## Files Modified
- `src/hooks/useFocusTrap.ts` (new)
- `src/components/ExcludedModal.tsx`
- `src/components/SearchModal.tsx`
- `src/components/AllVerbsModal.tsx`
- `src/components/ListSearchModal.tsx`
- `src/components/TutorialModal.tsx`
- `src/components/VerbPage.tsx`
- `src/components/QuizCard.tsx`
- `src/components/NavigationControls.tsx`
- `src/components/PageShell.tsx`
- `src/__tests__/useFocusTrap.test.tsx` (new)
- `src/__tests__/VerbPageLayout.test.tsx` (new)
- `src/__tests__/ExcludedModal.test.tsx`
- `src/__tests__/SearchModal.test.tsx`
- `src/__tests__/AllVerbsModal.test.tsx`
- `src/__tests__/ListSearchModal.test.tsx`
- `src/__tests__/TutorialModal.test.tsx`
- `src/__tests__/QuizCard.test.tsx`
- `src/__tests__/NavigationControls.test.tsx`
- `src/__tests__/PageShell.test.tsx`

## Verification
1. `npm run test:run` — all tests pass
2. Manual: open each modal, Tab/Shift+Tab cycles within, Escape closes, focus returns to trigger
3. Manual: on quiz pages, ArrowLeft/Right navigate cards when input not focused
4. Manual: Tab to skip link, press Enter, focus jumps to main content