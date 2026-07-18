---
id: TASK-91
title: Fix page blinking on refresh
status: Skip
assignee: []
created_date: '2026-07-16 19:33'
updated_date: '2026-07-18 18:19'
labels:
  - frontend
  - ui
dependencies: []
references:
  - 'https://github.com/makeitfine-org/phrasal/issues/16'
priority: medium
type: bug
ordinal: 22000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The page blinks/flashes on refresh at /phrasal-verbs/list. This should be prevented for a smooth user experience.

GitHub issue: #16
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 No visible flash/blink when navigating to `/phrasal-verbs/list` or refreshing the page
- [ ] #2 CSS fade-in transition applied when content replaces `VerbListSkeleton` (opacity 0→1 over ~300ms)
- [ ] #3 Dark mode class (`dark`) applied to `<html>` via inline `<script>` in `index.html` before first paint — eliminates FOUC for dark-mode users
- [ ] #4 Skeleton card count and dimensions adjusted to better match typical content layout
- [ ] #5 Same fix applied to VerbDetailPage and other data-fetching pages for consistency
- [ ] #6 Manual verification: refresh `/phrasal-verbs/list` in both light and dark mode — no blink
- [ ] #7 `make clean build` passes
<!-- AC:END -->
