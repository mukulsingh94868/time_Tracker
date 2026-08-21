# Code Standards

## Language & Framework

- **JavaScript (JSX)** - no TypeScript
- **Next.js 15** App Router (`"use client"` for client components)
- **React 19** with hooks (useState, useEffect, useRef)

## File Conventions

- Components use `.jsx` extension
- Config files use `.mjs` extension (ES modules)
- Single component per file pattern (currently only one component exists)
- Path alias: `@/*` maps to project root (configured in `jsconfig.json`)

## Component Patterns

- All components are `"use client"` (client-side rendering)
- Functional components only (no class components)
- Inline styles avoided - use Tailwind CSS utility classes
- CSS custom properties for colors (defined in `globals.css :root`)
- Icons imported from `lucide-react`

## Styling Approach

- **Tailwind CSS** for layout, spacing, responsive design
- **CSS Custom Properties** for all color values (dark theme)
- Color variables referenced via `var(--variable-name)` in Tailwind classes
- Example: `bg-[var(--card-bg)]`, `text-[var(--text-primary)]`
- Responsive breakpoints: `sm:` prefix (640px+)

### Color Naming Convention

| Category | Variable Pattern | Example |
|----------|-----------------|---------|
| Backgrounds | `--*bg` | `--card-bg`, `--input-bg` |
| Borders | `--*border` | `--card-border`, `--input-border` |
| Text | `--text-*` | `--text-primary`, `--text-secondary` |
| Semantic | `--{success,warning,info,danger}` | `--success`, `--warning` |
| Semantic BG | `--{success,warning,info,danger}-bg` | `--success-bg` |
| Semantic Border | `--{success,warning,info,danger}-border` | `--success-border` |

## State Management

- Local `useState` hooks only - no global state management
- State variables use descriptive camelCase names
- Boolean state prefixed with `show` (e.g., `showGuideModal`)
- Derived values computed inline (not stored in state)

## Event Handling

- Event handlers named `handle{Action}` (e.g., `handleCalculate`, `handlePasteFromClipboard`)
- Async handlers use `async/await`
- Error handling: silent catch for non-critical operations (clipboard)

## Formatting

- Tabular numbers for numeric displays: `tabular-nums` Tailwind class
- Monospace font for time/data displays: `font-mono` class
- Time format: 24-hour internally (`HH:MM:SS`), 12-hour for display
- Duration format: `"X hr : Y min : Z sec"` or compact `"Xh Ym Zs"`

## Code Organization (within page.jsx)

1. Imports
2. Helper functions (outside component)
3. Component definition with hooks
4. Handler functions
5. Business logic functions
6. Derived values / computed state
7. JSX return (header, main, footer, modals)

## Linting

- ESLint via `next lint`
- No custom ESLint config beyond Next.js defaults
- Run: `npm run lint`
