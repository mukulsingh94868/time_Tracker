# Agents

This file contains instructions for AI agents working on the Zentek Time Tracker project.

## Project Summary

Zentek Time Tracker is a **client-side-only** Next.js 15 + React 19 application that calculates employee working hours from GreytHr attendance swipe data. It is a **static site** deployed to Netlify with **no backend, no database, and no authentication**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.1.6 (App Router) |
| UI | React 19 |
| Language | JavaScript (JSX) - NO TypeScript |
| Styling | Tailwind CSS 3.4 + CSS Custom Properties |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono (next/font/google) |
| Build | Static export (`output: "export"`) |
| Deploy | Netlify |
| Package Manager | npm |

## Codebase Facts

- **1 functional page**: `app/home/page.jsx` (composes components, no business logic)
- **1 redirect page**: `app/page.jsx` (redirects `/` to `/home`)
- **0 backend files** - no API routes, no server actions
- **0 test files** - no testing framework
- **`context/` directory** - project documentation (markdown), not React Context

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `components/layout/` | Header, Footer |
| `components/calculator/` | InputForm, SwipeInput, DayTypeSelector, EndTimeSelector |
| `components/results/` | ResultsPanel, StatCard, TargetCard, DurationDisplay, BreakSessionsTable |
| `components/modals/` | Modal (shared shell), GuideModal, VideoModal |
| `hooks/` | `useAttendanceCalculator` (all calculator state + derived results), `useCurrentTime` |
| `services/` | `swipeParser` (text to times/pairs), `attendanceService` (hours, breaks, target), `clipboardService` |
| `utils/` | `time.js` - pure time conversion and formatting helpers |
| `constants/` | `attendance.js` (day types, end-time modes), `theme.js` (tone class maps) |

## Rules for Agents

### DO

- Use `"use client"` directive for all client components
- Use JavaScript (JSX), never TypeScript
- Use Tailwind CSS for styling with CSS custom properties for colors
- Reference colors as `bg-[var(--card-bg)]`, `text-[var(--text-primary)]`, etc.
- Keep one component per file; put logic in `services/`, `utils/` or `hooks/`, not in components
- Tailwind class strings in `constants/` are scanned via `tailwind.config.mjs`; keep them as full literals
- Match existing code style and naming conventions
- Run `npm run lint` after code changes
- Run `npm run build` to verify the build succeeds

### DO NOT

- Add TypeScript or type annotations
- Add backend code, API routes, or database connections
- Add external state management libraries (Redux, Zustand, etc.)
- Add authentication or user management
- Hardcode colors - always use CSS variables from `globals.css`
- Add comments to code unless explicitly requested
- Remove `"use client"` directives
- Change the color scheme or CSS variable names
- Commit without explicit user request

## Key Files

| File | Purpose |
|------|---------|
| `app/home/page.jsx` | Page composition (layout + modals) |
| `hooks/useAttendanceCalculator.js` | Calculator state and derived results |
| `services/attendanceService.js` | Working hours, breaks, target completion |
| `app/layout.jsx` | Root layout, fonts, metadata |
| `app/globals.css` | Dark theme CSS variables, global styles |
| `app/page.jsx` | Redirect from `/` to `/home` |
| `next.config.mjs` | Static export config |
| `tailwind.config.mjs` | Tailwind configuration |
| `package.json` | Dependencies and scripts |

## Core Logic

The app parses GreytHr swipe data by:
1. Extracting every timestamp in the text (IN/OUT keywords are ignored)
2. Converting to 24-hour format and sorting chronologically
3. Pairing sequentially into [IN, OUT] tuples (odd count closes with the selected out time)
4. Calculating working hours, break times, and remaining time against the day type (Full 8h, Short Leave 6.5h, Half 4h)

## Color System

All colors are CSS custom properties in `globals.css`:
- `--background`, `--card-bg`, `--input-bg` (dark backgrounds)
- `--primary`, `--primary-hover` (purple/indigo actions)
- `--text-primary`, `--text-secondary`, `--text-muted` (text hierarchy)
- `--success` (green), `--warning` (orange), `--info` (blue), `--danger` (red)

## NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Build static export
npm run lint     # Run ESLint
npm run start    # Start production server
```
