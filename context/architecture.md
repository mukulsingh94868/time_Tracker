# Architecture

## Project Structure

```
time_Tracker/
├── app/                        # Next.js App Router
│   ├── globals.css             # Global styles + CSS custom properties (dark theme)
│   ├── layout.jsx              # Root layout (HTML shell, fonts, metadata)
│   ├── page.jsx                # Root page (redirects to /home)
│   └── home/
│       └── page.jsx            # The ENTIRE application (587 lines, monolithic)
├── context/                    # Empty - intended for React Context providers (unused)
├── public/                     # Static assets
│   ├── assets/tutorial.mp4    # Video tutorial
│   └── favicon.svg             # SVG clock favicon
├── out/                        # Static export output (Netlify deployment)
├── netlify.toml                # Netlify deployment config
├── next.config.mjs             # Next.js config (static export only)
├── tailwind.config.mjs         # Tailwind CSS config
├── postcss.config.mjs          # PostCSS config
├── jsconfig.json               # Path alias (@/*)
└── package.json                # Dependencies & scripts
```

## Routing

| Route | File | Behavior |
|-------|------|----------|
| `/` | `app/page.jsx` | Server redirect to `/home` via `next/navigation redirect()` |
| `/home` | `app/home/page.jsx` | The entire application - single client component |

## Build & Deployment

- **Build mode**: `output: "export"` - produces fully static HTML in `out/`
- **Deployment**: Netlify via `@netlify/plugin-nextjs`
- **SPA fallback**: `public/_redirects` handles client-side routing

### NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Development server |
| `build` | `next build` | Static export build |
| `start` | `next start` | Production server |
| `lint` | `next lint` | ESLint |

## State Management

All state is local React `useState`/`useEffect` hooks within the single `Home` component. No Redux, Zustand, or Context API.

### State Variables

| State | Type | Purpose |
|-------|------|---------|
| `inputData` | string | Raw swipe text pasted by user |
| `output` | string | Calculation result or error message |
| `endTimeMode` | string | `"default"` / `"current"` / `"custom"` |
| `customEndTime` | string | User-selected custom end time (default `"18:30:00"`) |
| `currentEndTime` | string | Captured current time string |
| `showGuideModal` | boolean | Guide modal visibility |
| `showVideoModal` | boolean | Video modal visibility |
| `breakInfo` | object/null | Calculated results object |

### Refs

| Ref | Purpose |
|-----|---------|
| `textareaRef` | Auto-focus the textarea on mount |

## Data Flow

```
User pastes swipe data
        │
        ▼
parseSwipeData(data, endTime)
  - Splits by newline
  - Finds lines starting with "IN" or "OUT"
  - Reads next line for time (HH:MM:SS am/pm)
  - Converts to 24-hour format
  - Appends endTime if odd count (missing final OUT)
        │
        ▼
convertData(times)
  - Pairs timestamps into [IN, OUT] tuples
  - Returns null if odd count
        │
        ▼
calculateWorkingHoursAndBreaks(swipes)
  - Sums working seconds (OUT - IN per pair)
  - Calculates break seconds (next IN - current OUT)
  - Tracks break count and session details
        │
        ▼
Results rendered in UI
  - Summary stats cards (working hours, breaks, remaining)
  - Break sessions table
```

## Core Logic Functions

All defined inline in `app/home/page.jsx`:

| Function | Lines | Purpose |
|----------|-------|---------|
| `getCurrentTimeStr()` | 6-12 | Returns current time as HH:MM:SS string |
| `parseSwipeData(data, endTime)` | 66-98 | Parses raw swipe text into 24h time array |
| `convertData(data)` | 100-112 | Pairs times into [IN, OUT] tuples |
| `formatDuration(seconds)` | 114-119 | Formats as "X hr : Y min : Z sec" |
| `formatDurationCompact(seconds)` | 121-129 | Formats as "Xh Ym Zs" |
| `splitHoursMinutes(seconds)` | 131-134 | Returns `{ h, m }` object |
| `formatClock(time)` | 136-143 | Converts 24h to 12h format with am/pm |
| `calculateWorkingHoursAndBreaks(swipes)` | 145-181 | Main calculation engine |

## Dependencies

### Runtime
- `next` 15.1.6
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `lucide-react` ^0.511.0

### Dev
- `@netlify/plugin-nextjs` ^5.9.4
- `postcss` ^8
- `tailwindcss` ^3.4.1

## What Does NOT Exist

- No `app/api/` directory (no API routes)
- No `components/` directory (no component decomposition)
- No `lib/` or `utils/` directory
- No `hooks/` directory
- No `services/` directory
- No database models or schemas
- No authentication middleware
- No test files or test configuration
