# AI Workflow Rules

## Code Generation Rules

### 1. Match Existing Patterns

- All components are `"use client"` functional components
- Use JavaScript (JSX), NOT TypeScript
- Follow the single-component-in-file pattern established in `app/home/page.jsx`
- Use `useState`, `useEffect`, `useRef` from React - no external state libraries

### 2. Styling Rules

- Use Tailwind CSS utility classes for all layout and spacing
- Reference colors via CSS custom properties: `bg-[var(--card-bg)]`, `text-[var(--text-primary)]`
- Never hardcode color values - always use the CSS variable system defined in `globals.css`
- Use `sm:` responsive prefix for breakpoints
- Use `tabular-nums` for numeric displays
- Use `font-mono` for time/data displays

### 3. Component Structure

- Keep components in the `app/` directory following Next.js App Router conventions
- Client components need `"use client"` directive at top
- Import icons from `lucide-react`
- Import fonts from `next/font/google`

### 4. State Management

- Use local `useState` only - no Redux, Zustand, or Context API
- Boolean state variables prefixed with `show` (e.g., `showGuideModal`)
- Derived values computed inline, not stored in state
- Clear dependent state when inputs change (via `useEffect`)

### 5. Time Handling

- Internal format: 24-hour `HH:MM:SS`
- Display format: 12-hour with am/pm via `formatClock()`
- Use `new Date('1970-01-01T${time}Z')` for time arithmetic
- Duration format: `"X hr : Y min : Z sec"` (full) or `"Xh Ym Zs"` (compact)

### 6. Error Handling

- Silent catch for non-critical operations (e.g., clipboard access)
- Display errors via state-driven error messages in the UI
- Return `null` from functions on error conditions

### 7. File Operations

- Config files use `.mjs` extension (ES modules)
- Component files use `.jsx` extension
- Static assets go in `public/`
- No `components/` directory exists yet - create under `app/` if needed

## Things NOT to Do

- Do NOT add TypeScript - project uses plain JavaScript
- Do NOT add external state management libraries
- Do NOT add a backend, API routes, or database - this is a static client-side app
- Do NOT add authentication - the app is public
- Do NOT add testing frameworks unless explicitly requested
- Do NOT change the color scheme or CSS variable system
- Do NOT remove the `"use client"` directive from page components
- Do NOT add comments to code unless explicitly requested
- Do NOT commit secrets, keys, or credentials

## When Modifying Existing Code

1. Read the file first to understand current patterns
2. Match the existing code style (naming, structure, formatting)
3. Use the same CSS variable system for any new colors
4. Keep the monolithic component pattern unless explicitly asked to refactor
5. Test the build with `npm run build` after changes
6. Run `npm run lint` to check for issues
