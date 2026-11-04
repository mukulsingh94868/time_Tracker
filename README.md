# Zentek Time Tracker

Calculate your effective working hours from GreytHr swipe data, see your breaks, and find out exactly when you can leave.

Everything runs in the browser. There is no backend, database, or login, and your swipe data never leaves your machine.

## Features

- Paste the Swipe In/Out log from [GreytHr](https://zentek.greythr.com/); every timestamp is read, IN/OUT labels are optional
- Working day types: Full Day (8h), Short Leave (6h 30m), Half Day (4h)
- Out time for an open session: default 6:30 PM, live current time, or a custom time
- Working hours, break time, progress toward the target, and the time you can leave
- Day timeline and a table of break sessions
- Copy the results as an image to paste into Teams (falls back to a PNG download)

## Getting started

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root path redirects to `/home`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the static export into `out/` |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | Run the TypeScript compiler in strict mode |

## Tech stack

Next.js 15 (App Router, static export), React 19, TypeScript (strict), Tailwind CSS 3 with CSS custom properties, lucide-react, html-to-image. Deployed to Netlify.

## Project structure

```
app/            Routes, root layout, global styles and design tokens
components/     UI grouped by area: layout, calculator, results, modals, ui (primitives)
hooks/          Calculator state, live clock, share-as-image
services/       Swipe parsing, attendance calculations, clipboard and screenshot helpers
utils/          Pure time formatting and conversion
constants/      Day types, out-time modes, tone and button class maps, links
types/          Shared TypeScript types
```

See [AGENTS.md](AGENTS.md) for coding conventions.
