# Next.js Frontend Hiring Assignment — Omega CRM

A production-grade Next.js 15 App Router frontend that demonstrates JWT authentication, protected routing, Redux Toolkit architecture, Axios interceptors, Tailwind CSS design tokens, Framer Motion UI polish, a premium light/dark experience, and a reusable custom table built without table libraries.

## Tech stack

- Next.js 15 App Router
- TypeScript with strict mode
- Tailwind CSS with CSS-variable design tokens
- Redux Toolkit and React Redux
- Axios with request and response interceptors
- Framer Motion
- Lucide React

## Folder architecture

```text
├── app/                  # App Router pages and layouts
├── components/           # Global reusable UI components
├── features/             # Feature-based modules
├── redux/                # Store configuration and slices
├── services/             # Axios instance and endpoint services
├── hooks/                # Custom React hooks
├── utils/                # Helper functions
├── constants/            # App constants and API routes
└── types/                # Global TypeScript definitions
```

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open the local Next.js URL and sign in with:

```text
Email: john@mail.com
Password: changeme
```

## API configuration

The public Platzi documentation page is `https://fakeapi.platzi.com/en/rest/auth-jwt/`, while the actual REST API host used by the docs is:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1
```

The Axios instance lives in `services/api.ts` and handles:

- `Authorization: Bearer <token>` injection
- centralized API error normalization
- 401/403 refresh-token retry
- session-expired event flow when refresh fails

## Implemented routes

- `/` — clean hero-only landing page with header, Sign in CTA, theme toggle, animated SVG background, and animated sales arc; redirects authenticated users to dashboard
- `/login` — premium public sign-in route with SVG illustration, glass form, social UI buttons, and theme toggle; redirects authenticated users to dashboard
- `/dashboard` — private overview route
- `/dashboard/users` — private custom table route
- `/dashboard/settings` — private settings route

## Redux slices

- `authSlice` — login state, access token, refresh token, logout flow
- `userSlice` — authenticated profile state
- `themeSlice` — light/dark theme state
- `uiLoadingSlice` — global and sectional loading states

## Custom table features

`components/table/DataTable.tsx` includes:

- dynamic columns and rows through typed props
- sorting
- global search
- pagination
- loading skeletons
- explicit empty state
- semantic accent colors
- drag-to-resize columns
- drag-and-drop header reordering

## UI refinements

- Landing page has a simplified header and a single primary login CTA.
- The sales-value blue arc animates from zero progress to its final position.
- Login page uses a premium split layout with animated SVG strokes and a polished glass card.
- Dashboard shell, sidebar, navbar, KPI cards, and widgets were cleaned up with consistent glass surfaces and spacing.
- Light/dark theme switching is available on landing, login, dashboard navbar, and settings.

## Design system

Design tokens are centralized in `app/globals.css` and consumed by `tailwind.config.ts`:

- semantic colors: primary, secondary, success, danger, warning, muted, background, surface
- spacing extensions
- radius tokens
- typography scales
- shadows
- reusable glass UI utilities

## Notes and assumptions

- Logout is implemented as a client-side JWT clear flow because Platzi's documented REST auth endpoints include login, profile, and refresh-token endpoints, not a dedicated logout endpoint.
- The uploaded CRM visual reference is included in `public/images/hero-crm-reference.png` and used as a visual asset inside the hero composition.
- The project avoids external table and authentication libraries.
