# Project Style Guide

A comprehensive guide for building consistent, accessible, and beautiful UI in this project. This guide aligns with our current Tailwind + design tokens setup and shadcn-style components.

Last updated: 2025-08-10

- Tech stack: React 18, Vite, Tailwind CSS, TypeScript, shadcn/ui patterns
- Design tokens: CSS variables in styles/globals.css + Tailwind theme (HSL)
- Component library: src/components/ui/* (preferred)

Note: Some components exist in both src/components/ui and components/ui. Prefer the src/ versions throughout the app for consistency.

## 1) Design Tokens

All colors are HSL, exposed via CSS variables, and mapped in Tailwind. Always use semantic tokens rather than hardcoded colors.

- Core tokens (light/dark):
  - --background / --foreground
  - --card / --card-foreground
  - --popover / --popover-foreground
  - --primary / --primary-foreground
  - --secondary / --secondary-foreground
  - --muted / --muted-foreground
  - --accent / --accent-foreground
  - --destructive / --destructive-foreground
  - --border / --input / --ring
  - --radius (base corner radius)

Tailwind color mapping (conceptual):
- background: hsl(var(--background))
- foreground: hsl(var(--foreground))
- primary: hsl(var(--primary))
- primary-foreground: hsl(var(--primary-foreground))
- ... and similar for secondary, muted, accent, destructive, border, input, ring

Usage examples:
- Background + text: className="bg-background text-foreground"
- Themed border: className="border border-input"
- Primary CTA: className="bg-primary text-primary-foreground hover:bg-primary/90"

Radii:
- Use rounded-sm | rounded-md | rounded-lg per component spec
- Base value controlled by --radius (avoid hard-coded px)

Shadows:
- Prefer subtle elevation using shadow-sm | shadow (avoid heavy shadows)
- If custom, define new tokens first; avoid inline arbitrary values

Motion:
- Use tailwindcss-animate utilities (e.g., animate-in, accordion-down/up)
- Keep to 150–250ms with cubic-bezier(0.4, 0, 0.2, 1)

## 2) Typography

Font: IBM Plex Sans (primary), with system fallbacks.

- Base: text-base leading-6 on body; scale up for headings
- Weights: 400 regular, 500 medium for UI, 600–700 for headings as needed

Headings (one H1 per page):
- H1: text-3xl md:text-4xl font-semibold
- H2: text-2xl md:text-3xl font-semibold
- H3: text-xl md:text-2xl font-medium
- H4: text-lg font-medium

Body copy:
- Paragraphs: text-base md:text-lg leading-7 text-muted-foreground for secondary copy
- Links: text-primary underline-offset-4 hover:underline

Do:
- Use text-foreground for primary text
- Use text-muted-foreground for secondary text
- Avoid hard-coded colors; stick to tokens

## 3) Spacing, Layout, and Grid

Spacing scale: Tailwind default (4px base).
- x-2 (8px), x-3 (12px), x-4 (16px), x-6 (24px), x-8 (32px)
- Prefer consistent increments (2, 3, 4, 6, 8) for rhythm

Container & gutters:
- Wrap page content: container mx-auto px-4 md:px-6
- Sections: py-12 md:py-16 lg:py-24

Grid system:
- Use grid grid-cols-1 md:grid-cols-2/3/4 with gap-6 or gap-8
- For forms, use responsive stacks; avoid multi-column on mobile

Breakpoints:
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

## 4) Dark Mode

- All tokens support dark; no hard-coded light-only values
- Avoid transparency that reduces contrast too much in dark mode
- Test components in both themes to ensure contrast and readability

## 5) Components (Preferred src/components/ui/*)

General rules:
- Never hard-code colors; use semantic classes or component variants
- Use the cn utility for conditional classes
- Follow provided variants and sizes where available

Buttons (src/components/ui/button.tsx):
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: sm, default, lg, icon

Example:
```tsx
import { Button } from "@/components/ui/button"

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="icon" aria-label="Settings">⚙️</Button>
```

Input (src/components/ui/input.tsx):
```tsx
import { Input } from "@/components/ui/input"

<label htmlFor="email" className="sr-only">Email</label>
<Input id="email" type="email" placeholder="you@example.com" />
```

Label (src/components/ui/label.tsx):
```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="name">Name</Label>
<Input id="name" />
```

Textarea (src/components/ui/textarea.tsx):
```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Write your message…" />
```

Separator (src/components/ui/separator.tsx):
```tsx
import { Separator } from "@/components/ui/separator"

<Separator className="my-6" />
```

Progress (src/components/ui/progress.tsx):
```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={64} className="max-w-md" />
```

Card (src/components/ui/card.tsx):
- Use for grouped content. Combine with padding, gap-4/6, and text tokens.

Toasts:
- Prefer the built-in toast system in src/hooks/use-toast + src/components/ui/toaster.tsx
- Provide concise titles; use description for details

Icons:
- Use lucide-react
- Size: h-4 w-4 for most UI; keep inline with [&_svg]:size-4 rules where present

Images:
- Always provide alt text with relevant keywords
- Prefer lazy loading for below-the-fold media
- Use ImageWithFallback (src/components/figma/ImageWithFallback.tsx) when appropriate

## 6) Accessibility (A11y)

- Color contrast: WCAG AA minimum; verify tokens meet contrast in both themes
- Focus states: Must be visible (focus-visible:ring-2 ring-ring ring-offset-2)
- Keyboard navigation: All interactive elements reachable in a logical order
- Labels: Associate labels with inputs via htmlFor/id
- ARIA: Use roles and aria-* only when semantics aren’t implicit
- Motion: Respect reduced motion (avoid non-essential animations)

Checklist for components/pages:
- Has a single, meaningful H1
- Interactive controls have accessible names
- No keyboard traps; Escape closes modals/drawers
- Status changes announced (toasts or aria-live regions)

## 7) Content and Tone

- Headlines: Short, action-oriented; sentence case
- Body: Clear, concise; prefer active voice
- Links: Descriptive (avoid “click here”)
- Numbers/dates: Use consistent formats; localize if needed

## 8) SEO & Semantics

- One H1 per page, includes the primary keyword
- Semantic layout: header, main, section, article, aside, nav, footer
- Meta title < 60 chars; meta description < 160 chars
- Add canonical link to avoid duplicates
- Images: descriptive alt attributes with keywords
- Structured data (JSON-LD) for articles/products/FAQs when applicable
- Defer non-critical scripts; lazy load media
- Mobile-first layouts, proper viewport meta tag (configured in index.html)

Example page scaffold:
```tsx
export default function Page() {
  return (
    <>
      {/* SEO in route/layout or framework-specific head */}
      <main className="bg-background text-foreground">
        <section className="container mx-auto px-4 md:px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Page Title with Keyword
          </h1>
          <p className="mt-4 text-muted-foreground max-w-prose">
            Concise description that includes the keyword naturally.
          </p>
        </section>
      </main>
    </>
  )
}
```

## 9) Patterns and Composition

- Forms: Use react-hook-form + zod for validation; show errors with aria-invalid and helper text
- Modals/Dialogs: Close on Escape; trap focus; return focus to trigger
- Navigation: Highlight active route; keep keyboard navigation robust
- Empty states: Provide helpful guidance and primary actions

## 10) Performance

- Avoid large images; compress and set appropriate sizes
- Lazy load non-critical assets (video, below-the-fold images)
- Prefer CSS over JS for transitions/animations
- Minimize re-renders (memoize, stable keys)

## 11) Writing New Components

1) Start with tokens (no hard-coded colors)
2) Define variants and sizes via class-variance-authority (cva) when appropriate
3) Compose primitives (Radix) for accessibility
4) Add tests where possible; exercise keyboard and focus
5) Document usage and props briefly in the component file

Skeleton example:
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const thingVariants = cva(
  "rounded-md border border-input bg-background text-foreground",
  {
    variants: {
      intent: {
        default: "",
        subtle: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "p-2 text-sm",
        md: "p-3",
        lg: "p-4 text-lg",
      },
    },
    defaultVariants: { intent: "default", size: "md" },
  }
)

type ThingProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof thingVariants>

export function Thing({ className, intent, size, ...props }: ThingProps) {
  return (
    <div className={cn(thingVariants({ intent, size }), className)} {...props} />
  )
}
```

## 12) File/Folder Conventions

- Prefer src/components/ui over components/ui
- Use absolute imports with @ alias (e.g., @/components/ui/button)
- Keep components small and focused; co-locate only closely related files
- Name files using kebab-case for non-React utilities and PascalCase for components if creating folders

## 13) QA & Review Checklist (PRs)

- [ ] Uses semantic tokens (no hard-coded colors)
- [ ] Works in light and dark themes
- [ ] Meets accessibility checklist (focus, labels, contrast)
- [ ] Uses appropriate component variants and sizes
- [ ] Mobile-first, responsive at all breakpoints
- [ ] No console errors; network requests handled
- [ ] No unused code or dependencies

## 14) References

- Codebase Overview: CODEBASE_OVERVIEW.md
- Tailwind Config: tailwind.config.ts
- Global Styles & Tokens: styles/globals.css and src/index.css
- Components: src/components/ui
- Icons: lucide-react
- Forms: react-hook-form, zod

---

Questions or proposals to extend the design system? Open a PR proposing new tokens/variants before usage, so we keep the UI cohesive across the app.
