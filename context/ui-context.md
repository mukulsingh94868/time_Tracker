# UI Context

## Design System

### Theme

- **Dark mode only** - no light mode toggle
- Dark navy background (`#090c14`)
- Purple/indigo primary color (`#6d5ffe`)
- Card-based layout with subtle borders and shadows

### Color Palette (CSS Custom Properties)

```css
/* Backgrounds */
--background: #090c14        /* Page background */
--header-bg: #0c0f1a         /* Header/footer background */
--card-bg: #10141f            /* Card backgrounds */
--input-bg: #060810           /* Input field backgrounds */
--surface-hover: #171d2c      /* Hover state backgrounds */

/* Primary */
--primary: #6d5ffe            /* Primary action color */
--primary-hover: #5b4df0      /* Primary hover state */
--primary-light: #211f45      /* Primary light background */

/* Text */
--text-primary: #f1f3fa       /* Main text */
--text-secondary: #8b93a7     /* Secondary text */
--text-muted: #5b6478         /* Muted/label text */

/* Borders */
--card-border: #1f2636        /* Card borders */
--input-border: #232b3d       /* Input borders */

/* Semantic Colors */
--success: #22c55e            /* Working hours (green) */
--warning: #f97316            /* Break time (orange) */
--info: #38bdf8               /* Remaining time (blue) */
--danger: #ef4444             /* Short hours (red) */

/* Shadows */
--shadow-sm / --shadow / --shadow-md / --shadow-lg
```

### Typography

- **Sans**: Geist Sans (primary UI font)
- **Mono**: Geist Mono (code/time displays)
- Font loaded via `next/font/google` in `layout.jsx`

## Layout Structure

### Page Layout

```
┌─────────────────────────────────────┐
│ Header (sticky, backdrop-blur)      │
│  [Logo] Zentek Time Tracker  [?] [▶]│
├─────────────────────────────────────┤
│                                     │
│  Calculate Working Hours            │
│  (centered title + subtitle)        │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Input Card                  │    │
│  │  - Textarea (paste data)    │    │
│  │  - Out Time Source dropdown │    │
│  │  - Current/Custom time row  │    │
│  │  - Calculate button         │    │
│  │  - Error message            │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │Work  │ │Break │ │Remain│        │
│  │Hours │ │ Time │ │ Time │        │
│  │(green)│ │(orange)│ │(blue/red)│  │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Break Sessions Table        │    │
│  │  Session | Interval | Dur   │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│ Footer                              │
│  Meet the Developers                │
│  [AB] Aakash Burman                 │
│  [MS] Mukul Singh                   │
└─────────────────────────────────────┘
```

### Responsive Breakpoints

- Mobile: default (< 640px)
- SM: 640px+ (grid changes from 1 to 3 columns for stats)

## UI Components

### Header (sticky)

- Fixed to top with `z-40`
- Backdrop blur effect
- Logo: inline SVG clock icon in purple rounded square
- App name: "Zentek Time Tracker" bold
- Guide button (NotepadText icon)
- Video Tutorial button (MonitorPlay icon)

### Input Card

- Rounded-xl, card background, card border
- **Textarea**: monospace font, 224px height, paste button (Clipboard icon) at bottom-right
- **Select dropdown**: custom SVG chevron background, 3 options (Default/Current/Custom)
- **Current Time row**: flex layout, displays captured time, Refresh button
- **Custom Time row**: native `<input type="time">` picker
- **Calculate button**: purple background, Calculator icon, full-width on mobile

### Stats Cards (3-column grid)

1. **Working Hours** (green/success theme)
   - Clock icon, "Total Working Hours" label
   - Large hours + minutes display

2. **Break Time** (orange/warning theme)
   - Coffee icon, "Total Break Time" label
   - Large hours + minutes display

3. **Remaining Time** (blue/info OR red/danger)
   - Hourglass icon, "Remaining Break Time" label
   - Shows negative prefix when short
   - Warning message when working hours < 8h

### Break Sessions Table

- Full-width table with header row
- Columns: Session #, Time Interval, Duration
- Hover effect on rows
- Monospace font for times

### Modals

- Full-screen overlay with `bg-black/50` backdrop
- Click-outside-to-close behavior
- Close button (X icon) at top-right
- Max-width constrained, centered

**Guide Modal**: Step-by-step instructions (6 steps)
**Video Modal**: Embedded `<iframe>` for tutorial.mp4

### Footer

- Bordered top, header background
- "Meet the Developers" heading
- Developer badges: avatar circle (initials) + name, pill-shaped container

## Icons Used (lucide-react)

| Icon | Usage |
|------|-------|
| `MonitorPlay` | Video Tutorial button |
| `NotepadText` | Guide button |
| `Clock` | Working Hours stat card |
| `Coffee` | Break Time stat card |
| `Clipboard` | Paste from clipboard button |
| `Calculator` | Calculate button |
| `Hourglass` | Remaining Time stat card |

## Interactions

- **Auto-focus**: Textarea focused on page load
- **Clipboard paste**: Reads system clipboard via `navigator.clipboard.readText()`
- **Modal backdrop click**: Closes modal
- **Select dropdown**: Custom SVG chevron styling
- **Hover states**: Color transitions on buttons, rows
- **Active state**: `active:scale-[0.98]` on Calculate button
