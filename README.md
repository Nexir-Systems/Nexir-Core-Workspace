# Nexir Core Workspace

Angular **21** SPA: a **product-style shell** with mock auth, entities, favorites, settings, and local persistence—useful as a reference workspace or onboarding playground. **UI copy is English-only.**

## Quick start

| Step | Command / action |
| ---- | ---------------- |
| 1 | `npm install` |
| 2 | `npm start` → open `http://localhost:4200` |
| 3 | Register a test account at `/register` or use **Application map** (`/workspace-map`) for a route overview |
| 4 | After sign-in, the app lives under **`/app/*`** (sidebar + toolbar) |

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm start` | Dev server (`ng serve`) |
| `npm run build` | Production build |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run storybook` | Storybook dev server |
| `npm run build-storybook` | Static Storybook output |

## Mental model: where things live

```
src/app/
├── core/           # No imports from features — session, storage keys, guards, theme, validators, notifications, favorites ids
├── shared/         # Layout (landing, app shell, app map), reusable UI (nx-*), meta helpers
└── features/       # Vertical slices: auth, dashboard, entities, favorites, settings, account
    └── <feature>/
        ├── routes/
        ├── pages/
        ├── components/    # optional
        ├── store/         # *Store — signals
        ├── data/          # *Api — RxJS mocks → localStorage
        └── models/
```

- **State:** feature `*Store` classes use **signals** (`signal`, `computed`, `effect` where needed).
- **Async IO:** `*Api` services use **RxJS** (timers, `Observable`) and persist via `StorageService`.
- **Path aliases:** `@core/*`, `@shared/*`, `@features/*` (see `tsconfig.json`).
- **Quality bar:** `ChangeDetectionStrategy.OnPush` on presentational components; **pure** functions for catalog filtering (`entity-catalog-filter.ts`) and display labels (`entity-catalog-display.ts`); **no `features` → features** cross-imports—use `@core` / `@shared` or shared feature modules. Run **`npm run lint`** before merge.

### Entity catalog (Entities + Favorites)

- **Single source of list state:** `EntitiesStore` holds rows, loading/errors, and **catalog filter state** (search, status, category, sort). `filteredItems` is a `computed` built from **`filterAndSortEntityRecords()`** in `features/entities/catalog/entity-catalog-filter.ts` (pure, easy to test).
- **Shared UI:** `EntityCatalogToolbarComponent` (filter strip) and `EntityCatalogTableComponent` (mat-table + stars) live under `features/entities/components/`. Both list pages compose them inside one elevated card + paginator.
- **Favorites:** `FavoriteEntitiesService` stores starred ids; the Favorites page shows `filteredItems()` **∩** those ids, so changing filters on either page uses the same pipeline.

## Main routes

| Path | Guard | What it is |
| ---- | ----- | ---------- |
| `/` | — | Landing (redirects to `/app/dashboard` if already signed in) |
| `/workspace-map` | — | Application map (structure + routes) |
| `/login`, `/register` | guest | Sign-in / sign-up |
| `/app/dashboard` | auth | Session summary, quick actions, recent entities |
| `/app/entities` | auth | Entity catalog: search, filters, **star** → Favorites, row → **edit** |
| `/app/favorites` | auth | Starred rows from the catalog, **same search/filters/sort** as Entities (`EntitiesStore` + intersection with favorite ids) |
| `/app/account` | auth | Change password (mock user registry) |
| `/app/settings` | auth | Theme + UI density (local preferences) |
| `/app/entities/:id` | auth | Detail (read-heavy) |
| `/app/entities/:id/edit` | auth | Edit form |
| `/app/entities/new` | auth | Create |

Default authenticated entry: **`/app/dashboard`**.

## Persistence (mock)

Everything is **`localStorage`** in this browser profile: session, users/passwords (mock), preferences, entity rows, recent entity ids, **favorite entity ids**. No backend.

## UI notes

- Global look is driven by **CSS variables** on `html` (`theme-light` / `theme-dark`, `density-*`) plus shared tokens (`--nx-surface-elevated`, `--nx-card-border`, `--nx-surface-inset`, etc.) in `src/styles.scss` and `src/app/shared/styles/_product-shell.scss`. Base **page background** is intentionally a bit **deeper** than flat gray so cards and the shell read clearly.
- **Landing** hero: single title **Nexir Core Workspace** (larger type); **shell** sidebar brand uses **title-medium** (balanced with nav labels). Sidenav links: rounded rows, short background **transition**, **focus-visible** ring for keyboard users.
- **Entity create/edit** action row: **Cancel** left; **Generate sample data** + primary save/create **right**.
- **Catalog table:** status as **pill badges**, semibold **Name**, title-cased category/priority, **amber** star when favorited; headers **uppercase** in card tables.
- **Customization:** Prefer Material theme tokens (`--mat-sys-*`) and `nx-*` surface tokens before hard-coded colors. Section cards and product surfaces share the same elevation language; catalog tables inherit styles when nested in `mat-card.nx-product-surface`.
- **Storybook:** `npm run storybook` — stories under `src/app/shared/ui/**/*.stories.ts` and `src/app/features/entities/components/**/*.stories.ts`. **Controls** tweak copy, tones, icons, and catalog args (`favoriteStarFilled`, mock rows). The toolbar story uses the real `EntitiesStore` (root injector) so filters match the running app. See **Docs** per story for role and customization notes.

## Screen copy & layout (detailed)

- Full verbatim copy and structure: **[docs/APP_UI_SPEC.md](docs/APP_UI_SPEC.md)** (keep aligned with code when changing flows).
- **React / parity migration (full 1:1 spec):** architecture, UI/visual system, routes, persistence, state matrix, screen-by-screen copy, complexity, React folder layout, phased plan, and checklist — **[docs/REACT_MIGRATION_SPEC.md](docs/REACT_MIGRATION_SPEC.md)**.

## When you add a feature

1. Create `src/app/features/<name>/` with `routes/`, `pages/`, and optionally `store/`, `data/`, `models/`.
2. Register lazy routes under `app.routes.ts` → `path: 'app', children: [...]`.
3. Add a sidebar item in `app-shell.component.html` if it should be primary navigation.
4. Reuse `StorageService` + `STORAGE_KEYS` for mock persistence.

---

Generated with [Angular CLI](https://github.com/angular/angular-cli) 21.x.
