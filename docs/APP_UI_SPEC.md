# Nexir Core Workspace — UI specification

Verbatim **English** copy and **screen structure** as implemented. Use this when changing flows or strings. **Source of truth for routes and architecture:** [README.md](../README.md).

---

## Global

- **Document title:** `Nexir Core Workspace`
- **HTML `lang`:** `en`
- **Default `html` classes (FOUC):** `theme-dark density-comfortable` — overridden at runtime by `AppThemeService` from saved preferences (`index.html` + `styles.scss` four-way `mat.theme()`).
- **Typography:** Roboto (Material); **icons:** Material Icons font.
- **Theming:** Theme (system / light / dark) and density (comfortable / compact) from **Settings**; `AppThemeService` sets `html.theme-*` and `html.density-*`.
- **Implementation quality:** Catalog list/filter logic stays in **pure** TS under `features/entities/catalog/`; presentational components use **`OnPush`** where applicable; sidebar nav links use **rounded** hit areas, **focus-visible** outline, and short **transitions** for polish.
- **Surfaces / background:** Page gradient and card surfaces use `--nx-app-bg`, `--nx-surface-elevated`, etc. (`styles.scss`) — slightly **deeper** neutrals than flat gray so shell and cards read clearly; card surfaces are tuned **marginally darker** than the page for separation.
- **Form action rows (entity create/edit):** **Cancel** on the **left**; **Generate sample data** and **Save** / **Create** grouped on the **right**.

---

## Route: `/` — Landing

**Layout:** `nx-product-page` — vertical stack.

### Hero (`nx-landing__hero nx-product-surface`)

- **Title (H1):** `Nexir Core Workspace` — **headline-small** scale, primary color (no separate “Workspace” line).
- **Subtitle:** `A neutral product shell for authentication, routing, entities, and local preferences—ready for focused engineering tasks.`
- **Actions:** `Sign in` → `/login` · `Create account` → `/register`

### Section — “Explore the app”

- **Subtitle:** `Structure and routes`
- **Lead + button:** Copy invites opening **`/workspace-map`** (“View application map”).

### Section — “Where to start in the repo”

- **Subtitle:** `Common touchpoints`
- **List:** Label, path (`code`), hint — from `EXAMPLE_SENSITIVE_PATHS` (`src/app/shared/meta/protected-paths.ts`).

### Info panel — “Access”

- **Title:** `Access`
- **Body:** Routes under `/app` require a session; links above for sign-in or test registration.

---

## Route: `/workspace-map` — Application map

- **Intro card:** `Application map` (headline-small) · subtitle explains structure; **Primary action:** `Back to our view` → `/`
- **Lists:** Route bullets and **Code layout** `dl` rows are **inset tiles** (rounded, bordered) for scanability.
- **Section cards:** Routes, Inside `/app`, Code layout, Data & mocks (copy matches live template).

---

## Route: `/login` — Sign in (guest guard)

**Layout:** `nx-login` — centered card (`nx-login__card nx-product-surface`), no tabs.

- **Title:** `Sign in`
- **Subtitle:** Mentions **Create one** link → `/register`
- **Fields:** Email, Password (validations as in form)
- **Submit:** `Sign in` / `Signing in…`
- **Footer:** `Back to overview` → `/`

---

## Route: `/register` — Create account (guest guard)

**Layout:** `nx-register` — centered card.

- **Title:** `Create account`
- **Subtitle:** **Sign in** link → `/login`
- **Rules line:** Password rules hint (`PASSWORD_RULES_HINT`)
- **Submit:** `Create account` / `Creating…`
- **Footer:** `Back to overview` → `/`

---

## Route: `/app/*` — Shell (auth)

### Sidenav

- **Brand:** `Nexir Core Workspace` (**title-medium** scale) + divider under title (**vertical margin** widened so nav blocks breathe)
- **Nav:** `Dashboard` · `Entities` · `Favorites` · `Settings`
- **Footer nav:** `Account` → `/app/account`

### Toolbar

- Menu · title `Workspace` · `Sign out` → session clear, navigate to `/login`

### Main

- `<router-outlet />`

---

## Route: `/app/dashboard`

- **Title:** `Dashboard` · subtitle `Entry point to workspace data and preferences.`
- **Badge:** `Session active` (same `nx-status-badge` component family as entity status chips)
- **Cards:** Workspace (session summary + entity count), Quick actions (Create entity, Browse entities, **Favorites**, **Account**, **Settings**), Recent records

---

## Route: `/app/entities` — Entity catalog

- **Title:** `Entities` · subtitle describes search, **star for Favorites**, row → **edit**
- **States:** Loading spinner · error card + Retry · empty state + Reload
- **Single card:** Toolbar (`EntityCatalogToolbar`) + divider + table (`EntityCatalogTable`) + paginator
- **Toolbar:** Search, Status, Category, Sort by, Asc/Desc
- **Table:** Star column (amber when favorited), **Name** (semibold), **Status** as pill `nx-status-badge` (Active / Draft / Archived tones), Category & Priority title-cased, Owner, **Updated** (full `medium` datetime); headers uppercase; row click → `/app/entities/:id/edit`

---

## Route: `/app/favorites`

- **Title:** `Favorites` · subtitle describes same filters as Entities and edit/star behavior
- **States:** Loading · error + Retry · empty (no stars) · empty (filters exclude all favorites) + Clear filters · table (same layout as Entities)
- **Intersection:** `EntitiesStore.filteredItems` ∩ starred ids

---

## Route: `/app/entities/new` | `/app/entities/:id/edit`

- **Create:** Back `Entities` · title `New entity` · form in one **fields card** (`nx-entity-form-fields` sections with dividers) · actions card: **Cancel** (left) · **Generate sample data** + **Create entity** (right)
- **Edit:** Back `Back` · title `Edit entity` · same form pattern · **Cancel** (left) · **Generate sample data** + **Save changes** (right)

---

## Route: `/app/entities/:id` — Detail

- Back `Entities` · title · status badge · id · **Edit** → edit route
- **Section cards:** Overview (stats grid + description), Metadata (tile grid), Activity (list)

---

## Route: `/app/account`

- **Title:** `Account` · signed-in email
- **Card:** Password — current / new / confirm; rules hint; **Update password**

---

## Route: `/app/settings`

- **Title:** `Settings` · subtitle about local mock preferences
- **Section card (`nx-section-card`):** “Appearance” — **Theme** (System / Light / Dark), **Density** (Comfortable / Compact) — no email checkbox
- **Submit:** `Save preferences` / `Saving…` — snackbar on success

---

## Visual system

- **Surfaces:** `nx-product-surface`, `nx-section-card` (Material outlined cards + tokens `--nx-surface-elevated`, `--nx-card-border`, gradients on `body` — see `styles.scss`, `_product-shell.scss`).
- **Tables in cards:** Shared styling for `mat-table` inside `mat-card.nx-product-surface`.
- **Muted:** `.nx-muted`

---

## Storybook

- **Run:** `npm run storybook` (static build: `npm run build-storybook` → `storybook-static/`).
- **Shared primitives** (`Shared/*`): `section-card`, `shell-nav-item`, `empty-state`, `status-badge`, `info-panel`, `entity-list-item` — each story documents intent and exposes **Controls** for copy / tone / icons.
- **Entity catalog** (`Entities/*`): `EntityCatalogTable` (mock rows from `MOCK_ENTITIES_SEED`, toggle **filled stars** for the Favorites presentation) and `EntityCatalogToolbar` (live `EntitiesStore` filters, same as `/app/entities`).

---

## Routes summary

| Path | Guard | Purpose |
| ---- | ----- | ------- |
| `/` | — | Landing |
| `/workspace-map` | — | Application map |
| `/login` | guest | Sign in |
| `/register` | guest | Register |
| `/app` | auth | Redirect → `dashboard` |
| `/app/dashboard` | auth | Dashboard |
| `/app/entities` | auth | Catalog + filters + favorites star |
| `/app/favorites` | auth | Filtered favorites |
| `/app/entities/new` | auth | Create |
| `/app/entities/:id` | auth | Detail |
| `/app/entities/:id/edit` | auth | Edit |
| `/app/account` | auth | Password |
| `/app/settings` | auth | Appearance preferences |

---

*Update this file when user-visible copy or primary layout changes.*
