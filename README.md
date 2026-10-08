# Lotus Retail OS

Lotus is a production-shaped POS frontend MVP for a small-to-medium retail store. It includes a fast register experience, catalog and inventory workflows, purchasing, customer and supplier records, sales history, reports, team access, settings, and a JSON Server mock boundary.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 with component-owned style recipes
- Zod schemas for domain validation
- React Hook Form, TanStack Table, Lucide React, and JSON Server are declared in the project dependency contract for the next API-backed iteration. The current runnable surface keeps form/table behavior local so the MVP remains usable in restricted environments.

## Architecture

Routes are thin compositions under `app/(dashboard)`. Reusable shell and UI primitives live under `components/`. Domain types, fixture data, formatting, and schemas are centralized under `lib/`. API replacement seams live under `services/api/` and feature services such as `services/products/`.

```text
app/                 routes and layouts
components/          shell, icons, reusable UI primitives
components/ui/legacy.ts  shared component-owned recipes for management screens
lib/                 types, mock fixtures, schemas, formatting
services/api/         environment-based API client
services/products/    feature service example
db/db.json            JSON Server resource shape
docs/erd.md           Mermaid ERD
```

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to `/dashboard`; `/login` is a lightweight demo sign-in surface.

Run the mock API separately:

```bash
npm run mock-api
```

The mock server listens on `http://localhost:3001`.

## Environment

Create `.env.local` when using the API service:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

The default is already `http://localhost:3001`. Components should call feature hooks/services, then services should call `services/api/client.ts`; do not distribute `fetch()` calls across pages.

## Styling

`app/globals.css` contains only the global font, theme tokens, reset, and browser defaults. Screen-specific styling lives with the component markup: reusable management-screen recipes are exported from `components/ui/legacy.ts`, while interactive POS and shell elements use local Tailwind utilities. This keeps responsive and hover/focus behavior available without a large external selector stylesheet.

## Main routes

`/dashboard`, `/pos`, `/sales`, `/products`, `/categories`, `/inventory`, `/purchases`, `/suppliers`, `/customers`, `/reports`, `/users`, and `/settings` are implemented, including product, sale, purchase, and customer detail/create flows.

## Replacing JSON Server

Keep the domain types and service signatures stable, update `API_URL` or the implementation in `services/api/client.ts`, then point feature services at the real endpoints. The route and UI layers do not need to know whether data comes from JSON Server or a production API.

## Verification

```bash
npm run lint
npm run build
```

The domain relationship diagram is in [`docs/erd.md`](docs/erd.md). Mock resource names match the ERD and can be populated as backend contracts are introduced.
