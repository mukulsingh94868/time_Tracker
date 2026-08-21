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

- **1 functional page**: `app/home/page.jsx` (587 lines, monolithic)
- **1 redirect page**: `app/page.jsx` (redirects `/` to `/home`)
- **0 backend files** - no API routes, no server actions
- **0 test files** - no testing framework
- **0 separate components** - everything is in one file
- **Empty `context/` directory** - intended for React Context but unused
- **Empty `.claude/` directory** - intended for AI context

## Rules for Agents

### DO

- Use `"use client"` directive for all client components
- Use JavaScript (JSX), never TypeScript
- Use Tailwind CSS for styling with CSS custom properties for colors
- Reference colors as `bg-[var(--card-bg)]`, `text-[var(--text-primary)]`, etc.
- Keep the monolithic component pattern unless explicitly asked to refactor
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
| `app/home/page.jsx` | The entire application (UI + logic) |
| `app/layout.jsx` | Root layout, fonts, metadata |
| `app/globals.css` | Dark theme CSS variables, global styles |
| `app/page.jsx` | Redirect from `/` to `/home` |
| `next.config.mjs` | Static export config |
| `tailwind.config.mjs` | Tailwind configuration |
| `package.json` | Dependencies and scripts |

## Core Logic

The app parses GreytHr swipe data by:
1. Finding lines starting with "IN" or "OUT"
2. Reading the next line for timestamp (`HH:MM:SS am/pm`)
3. Converting to 24-hour format
4. Pairing into [IN, OUT] tuples
5. Calculating working hours, break times, and remaining time

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
