# Project Overview

## Zentek Time Tracker

A client-side utility tool for Zentek employees to calculate working hours and break times from GreytHr attendance swipe data.

### Purpose

Employees log in to [GreytHr](https://hiretek.greythr.com/), copy their swipe-in/swipe-out attendance logs, paste them into the app, and instantly get a breakdown of:

- **Total working hours** (sum of all IN-OUT sessions)
- **Total break time** (gaps between OUT and next IN)
- **Remaining break time** relative to a standard 8-hour workday
- **Individual break session details** with time intervals and durations

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.1.6 |
| UI Library | React | ^19.0.0 |
| Language | JavaScript (JSX) | - |
| Styling | Tailwind CSS + CSS Custom Properties | ^3.4.1 |
| Icons | lucide-react | ^0.511.0 |
| Fonts | Geist Sans + Geist Mono | next/font/google |
| Build Output | Static HTML export | `output: "export"` |
| Deployment | Netlify | @netlify/plugin-nextjs ^5.9.4 |

### Key Facts

- **No backend** - fully static, client-side SPA
- **No database** - all computation happens in the browser
- **No authentication** - publicly accessible
- **No testing** - no test framework or test files
- **Single page** - entire app is one route (`/home`)
- **Single component** - all UI in `app/home/page.jsx` (587 lines)

### Developers

- **Aakash Burman** (AB)
- **Mukul Singh** (MS)

### Repository

- **URL**: https://github.com/mukulsingh94868/time_Tracker.git
- **Branch**: `main`
- **Package Manager**: npm
