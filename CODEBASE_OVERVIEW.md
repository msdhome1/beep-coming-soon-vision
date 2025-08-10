# Codebase Overview

This document provides a comprehensive overview of the project architecture, key modules, and conventions to help you navigate, extend, and maintain the codebase efficiently.

## Summary
- Stack: React + Vite + TypeScript + Tailwind CSS + shadcn/ui + Radix Primitives + TanStack Query + React Router
- Purpose: Simple landing page with a “Coming Soon” hero, video background, and a waitlist email form (simulated API). Ready foundation for scaling with components and Supabase integration.
- Style System: Tailwind with design tokens (HSL via CSS variables), shadcn component variants, and IBM Plex Sans as the primary font.

## Tech Stack
- Build: Vite (React SWC plugin)
- UI: React 18, Tailwind CSS, shadcn/ui components (built on Radix), lucide-react icons
- State/Data: @tanstack/react-query (QueryClientProvider pre-wired)
- Routing: react-router-dom v6
- Notifications: sonner (used in Index), shadcn Toaster (mounted; available)
- Animations: tailwindcss-animate
- Backend: Supabase JS SDK scaffolded (no DB schema/policies configured yet)

## Project Structure (high-level)
```
/
├─ index.html                 # HTML shell with meta + IBM Plex Sans
├─ vite.config.ts             # Vite config + alias @ → ./src
├─ tailwind.config.ts         # Tailwind theme, tokens, animations
├─ src/
│  ├─ main.tsx                # App bootstrap
│  ├─ App.tsx                 # Providers (Query, Tooltip, Toasters) + Router
│  ├─ index.css               # App stylesheet (design tokens mapped via Tailwind)
│  ├─ pages/
│  │  ├─ Index.tsx            # Landing page with video bg + waitlist form
│  │  └─ NotFound.tsx         # 404 page
│  ├─ components/
│  │  └─ ui/                  # shadcn components (Button, Card, ...)
│  ├─ hooks/                  # Custom hooks (use-toast etc.)
│  └─ integrations/
│     └─ supabase/
│        ├─ client.ts         # Supabase client setup
│        └─ types.ts          # (read‑only, currently empty)
├─ public/
│  ├─ lovable-uploads/        # Video/GIF/image assets used by Index
│  └─ robots.txt
└─ styles/globals.css         # Theme variables (not imported by app)
```

Note: There is a duplicate UI folder at project root (`components/ui/*`) and another under `src/components/ui/*`. Imports in the app use `@/components/ui` (the `src` version). The root-level `components/ui` appears unused/legacy — consider removing it to reduce confusion.

## Application Flow
1. index.html
   - Sets up meta tags, Open Graph/Twitter cards, and loads IBM Plex Sans via Google Fonts.
2. src/main.tsx
   - Renders the React app with global CSS `src/index.css`.
3. src/App.tsx
   - Wraps the app with providers: QueryClientProvider, TooltipProvider, Toasters.
   - Configures routes via BrowserRouter:
     - `/` → `Index`
     - `*` → `NotFound`
4. src/pages/Index.tsx
   - Full-screen hero with a background video, logo image, headline, and a waitlist email form.
   - Uses `sonner` to show success/error toasts and simulates an API call with a timeout.

## UI & Design System
- Tailwind + shadcn/ui
  - `src/components/ui/button.tsx` demonstrates cva-based variants (default, destructive, outline, secondary, ghost, link) and sizes.
  - `tailwind.config.ts` uses HSL CSS variables for semantic colors (primary, secondary, background, etc.) and defines accordion animations.
- Font
  - IBM Plex Sans loaded via Google Fonts in `index.html` and applied using the `font-ibm-plex-sans` Tailwind class on the root container in `Index.tsx`.
- Tokens & Theming
  - Colors are mapped to CSS variables (HSL). Prefer using semantic tokens over hardcoded colors.

## Pages
- Index (Landing)
  - Background: looping, muted MP4 video from `public/lovable-uploads/*` with a gradient fallback + opacity overlay for legibility.
  - Content: logo image, H1 “agentic payments”, subtitle, email input + button.
  - Form: minimal client-side validation (required email), simulated async submit.
  - Notifications: `sonner.toast` success/error.
- NotFound
  - Standard 404 page routed via `*` path.

## Providers & Utilities
- QueryClientProvider (TanStack Query)
  - Ready for data fetching and caching; currently unused by pages.
- TooltipProvider
  - Enables tooltip primitives across the app.
- Toasters
  - `@/components/ui/toaster` (shadcn) and `sonner` are both mounted.
  - The landing page currently uses `sonner`. Consider standardizing on one system to avoid duplicate patterns.
- Utilities
  - `src/lib/utils.ts` exposes `cn` (clsx + tailwind-merge) used by components (e.g., Button).

## Supabase Integration
- `src/integrations/supabase/client.ts` sets up the Supabase client (no environment secrets present in this project’s configuration).
- No tables, functions, triggers, or storage buckets are configured (see Supabase configuration in project settings). If you plan to persist the waitlist, create a `waitlist_subscriptions` table with RLS and use Supabase auth/storage as needed.

## Assets & SEO
- Assets live under `public/lovable-uploads/` and are referenced by absolute paths in `Index.tsx`.
- SEO
  - `index.html` includes a title, description, author, OG, and Twitter meta tags.
  - Potential enhancements: add canonical link, structured data (JSON‑LD), more descriptive social images, and per‑route titles/descriptions if more pages are added.

## Known Quirks & Recommendations
1. Duplicate UI directories
   - `components/ui/*` vs `src/components/ui/*`. Only the latter is used. Remove the unused set to simplify maintenance.
2. Inline button color on Index
   - The submit Button uses inline styles with hex colors. Move to the design system by adding a Button variant (e.g., `variant="accent"`) or using existing tokens to ensure theme consistency and dark/light mode safety.
3. Two toast systems mounted
   - Pick either `sonner` or `@/components/ui/toaster` to keep UX consistent and reduce bundle overhead.
4. `styles/globals.css`
   - Present but not imported by the app. Either import it intentionally (and merge tokens with `index.css`) or remove it to prevent confusion.
5. Accessibility
   - Ensure video background has no audio (muted: true). Consider reduced‑motion preferences and provide meaningful alt text for images (e.g., logo alt could be more descriptive).

## How to Run
- Install dependencies: `npm i`
- Start dev server: `npm run dev` (Vite on port 8080 per config)
- Build: `npm run build`
- Preview: `npm run preview`

## Extension Guide
- Adding a new page
  - Create a component under `src/pages/YourPage.tsx` and register it in `src/App.tsx` routes.
  - Add SEO tags: set document title/description dynamically or use a lightweight SEO helper.
- Adding data fetching
  - Use TanStack Query: create a query hook and wrap network calls. Example pattern:
    ```ts
    const { data, isLoading, error } = useQuery({ queryKey: ['resource'], queryFn: fetchResource })
    ```
- Persisting the waitlist
  - Add a Supabase table (e.g., `waitlist_subscriptions`) with RLS policies and call it from the form submit.
- UI consistency
  - Extend `tailwind.config.ts` tokens and `button.tsx` variants rather than ad‑hoc styles.

## Coding Conventions
- Prefer semantic tokens (HSL variables) for colors.
- Keep components small and focused; place shared primitives in `src/components/ui`.
- Use `cn` helper for class composition and keep Tailwind class lists readable.
- Co-locate hooks under `src/hooks` and keep them UI-agnostic where possible.

---
If you’d like, I can also generate an ADR-style Architecture Decision Record for choices like “Toast system” and “Design tokens for brand color,” or implement the recommendations above (cleanup duplicates, add a Button variant, and improve SEO).