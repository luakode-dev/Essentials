# AGENTS.md - Developer Guidelines

This document provides guidelines for AI agents working on this codebase.

## Project Overview

- **Framework**: Astro 5.x with React 19.x
- **Styling**: Tailwind CSS 4.x with CSS variables for theming
- **State**: Nanostores + React hooks
- **Language**: Spanish (UI), JavaScript/JSX (code)

---

## Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run astro        # Run Astro CLI
```

- No formal test scripts exist. Test manually with `npm run dev`.
- No linter configured. Check code style manually.

---

## Code Style

### General
- Use **4 spaces** for indentation (not tabs)
- Use **single quotes** for strings in JS/JSX, **double quotes** for HTML attributes
- Maximum line length: ~120 characters (soft limit)
- Always add **trailing commas** in multi-line objects/arrays

### File Structure
```
src/
├── components/dashboard/  # Dashboard card components
├── layouts/              # Astro layouts
├── pages/                # Astro pages (index.astro)
├── styles/               # Global CSS
└── lib/                  # Utilities (Supabase client, etc.)
```

### Imports (order by category)
1. React/Framework (`react`, `framer-motion`)
2. Libraries (`date-fns`, `nanostores`, `@supabase/...`)
3. Local components (`../components/...`)
4. Local utilities (`../lib/...`)

```jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

import DollarCard from './DollarCard';
import { supabase } from '../lib/supabase';
```

### Components

#### Astro (.astro)
- Use frontmatter for imports/logic, minimal JS in template
- Import React with `client:load` or `client:visible`

```astro
---
import Layout from '../layouts/Layout.astro';
import ThemeToggle from '../components/ThemeToggle';
---
<Layout title="Essentials">
  <ThemeToggle client:load />
</Layout>
```

#### React (.jsx)
- Use **default exports**, **PascalCase** names
- Destructure props with **default values**
- Use **camelCase** for handlers (`handleClick`)

```jsx
export default function DollarCard({
    title,
    price,
    currency = "VES",
    className = ""
}) {
    return <div className={className}>...</div>;
}
```

### Tailwind CSS

#### Classes Order
1. Layout: `flex`, `grid`, `absolute`, `relative`, `fixed`, `sticky`
2. Sizing: `w`, `h`, `min-h`, `max-w`
3. Spacing: `m`, `p`, `gap`
4. Visual: `bg`, `border`, `rounded`, `shadow`
5. Typography: `text`, `font`, `leading`
6. Interactive: `hover:`, `focus:`, `transition-`
7. Responsive: `md:`, `lg:`, `xl:`
8. State: Conditional via template literals

```jsx
<div className={`
    flex items-center justify-between
    w-full p-4 gap-4
    bg-[var(--color-surface)] shadow-card
    hover:bg-primary/10 transition-colors
    md:flex-row flex-col
    ${isActive ? 'bg-primary' : ''}
`}>
```

#### CSS Variables
Use theme variables from `src/styles/global.css`:
```jsx
<div className="bg-[var(--color-surface)] text-[var(--color-text-main)] border border-[var(--color-border)]">
```

### Naming Conventions
- **Components**: PascalCase (`ThemeToggle`)
- **Files**: kebab-case (`dollar-card.jsx`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Variables/Functions**: camelCase

### Error Handling
- Return `null` or fallback UI for errors
- Check `typeof window === 'undefined'` for SSR safety
- Use optional chaining (`?.`) and nullish coalescing (`??`)

```jsx
if (typeof window === 'undefined') return null;
const price = data?.price?.toFixed(2) ?? '...';
```

### Icons
- Use **Material Symbols Outlined**
- `<span className="material-symbols-outlined text-[24px]">icon</span>`

### Accessibility
- Include `aria-label` on icon-only buttons
- Use semantic HTML (`<header>`, `<main>`, `<button>`)

---

## Working with This Codebase

### Adding New Dashboard Cards
1. Create component in `src/components/dashboard/`
2. Reference `DollarCard` or `AddNew` for styling
3. Import in `src/pages/index.astro` with `client:load`

### Adding New Themes
Edit `src/styles/global.css`:
- Define colors under `:root` (light) and `:root.dark`
- Add to `@theme` block for Tailwind access

### Supabase Integration
- Client in `src/lib/supabase.js`
- Environment variables in `.env` (not committed)
