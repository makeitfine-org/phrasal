---
id: TASK-89
title: Change font from bold to light
status: To Do
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/19'
priority: low
type: enhancement
ordinal: 20000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Change the font weight from bold to light across the application.

GitHub issue: #19
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Replace `font-bold` (700) with `font-normal` (400) or `font-light` (300) for body text and secondary elements across all components
- [ ] #2 Page headings (`h1`) retain `font-semibold` (600) or `font-medium` (500) to preserve visual hierarchy
- [ ] #3 Google Fonts import in `index.html` updated to include weight 300 if `font-light` is used
- [ ] #4 Section labels in QuizCard ("Explanation:", "Hint:", "Sentence:") use `font-medium` instead of `font-bold`
- [ ] #5 Visual review confirms all pages remain readable with clear heading/body distinction
- [ ] #6 Existing snapshot or visual tests updated if affected
- [ ] #7 `make clean build` passes
<!-- AC:END -->
