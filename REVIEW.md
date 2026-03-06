# Portfolio Review: Code Quality Assessment

**Date:** 2026-03-06 (updated)
**Previous Review:** 2026-03-05
**Repository:** osortega/office
**Tracking Issue:** [#19](https://github.com/osortega/office/issues/19)
**Description:** A visual office dashboard where the CEO can see agents working, their current tasks, and work history

---

## Dashboard Data Source Analysis

### Current State: Live API Integration ✅

Since PRs #10–#12, the dashboard fetches live data from a CTO bot API at `cto.octanelabs.xyz/api/dashboard`. The previous mock-data-only architecture has been replaced.

### Data flow

```
CTO API (remote)  →  src/services/api.ts  →  src/App.tsx (state)  →  Components (props)
   (fetch + retry)     (transform)             (useState/useEffect)     (render)
```

- **`src/services/api.ts`** — Fetches from remote API with retry logic (1 retry, 3s timeout)
- **`src/App.tsx`** — Manages state via `useState`/`useEffect`, polls every 10 seconds, transforms API data
- **`src/data/types.ts`** — TypeScript interfaces for internal component types
- **`src/data/mockData.ts`** — Fallback data used when API is unreachable or on GitHub Pages

### What is displayed

**Agents:** Name, role, status, current task, success rate, skills, description.

**Workers:** Active worker banner showing real-time running tasks with repo info.

**Projects:** Task-level progress calculated from API data with assigned agent mapping.

**Header:** Connection status indicator, manual refresh button, last-updated timestamp, and strategic goals.

---

## Category Assessments

### 1. Code Quality — Score: 7/10
- Clean TypeScript with strict mode (`tsconfig.app.json:17`) — `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` active
- Well-defined type interfaces in `src/data/types.ts` with proper union types
- Components use explicit prop interfaces (e.g., `HeaderProps` at `Header.tsx:1-10`)
- Good separation: API layer → transform → state → render
- **Gap:** No linting (ESLint) or formatting (Prettier) tools configured
- **Gap:** No React error boundary for graceful crash recovery
- **Gap:** `stats` typed as `Record<string, number>` (`api.ts:8`) — too loose for the single field used
- **Gap:** Module-level `isGitHubPages` (`App.tsx:70`) computed at import time — could cause SSR issues

### 2. Test Coverage — Score: 0/10
- Zero test files exist (no `*.test.*` or `*.spec.*` files)
- No testing framework installed (no Vitest, Jest, React Testing Library)
- No test script in `package.json`
- No CI test step in deploy workflow

### 3. Security — Score: 6/10
- `.env` files properly gitignored; `.env.example` provides template
- External links use `rel="noopener noreferrer"` (`PortfolioPanel.tsx:81`)
- No `dangerouslySetInnerHTML`, `eval()`, or `innerHTML` usage
- CI secrets use `${{ secrets.* }}` properly
- **Gap:** No API response validation — `response.json()` trusted without schema check (`api.ts:58`)
- **Gap:** No API authentication — endpoint fetched without credentials (`api.ts:47-49`)
- **Gap:** Hardcoded fallback API URL exposes domain in source (`api.ts:1`)

### 4. Performance — Score: 7/10
- Small bundle: 164 KB JS (52 KB gzipped), 19 KB CSS (4 KB gzipped)
- Only 2 production deps (React + ReactDOM) — excellent dependency hygiene
- `AbortController` timeout prevents hanging requests (`api.ts:44-45`)
- **Gap:** No visibility-based polling — continues when tab is hidden (`App.tsx:121-126`)
- **Gap:** No memoization — `transformData()` called every render (`App.tsx:73`); no `React.memo`
- **Gap:** `agents.filter()` duplicated without memoization (`App.tsx:128`, `OfficeFloor.tsx:25`)

### 5. UX / Accessibility — Score: 4/10
- Clean visual hierarchy with color-coded statuses
- Loading spinner and demo mode banner provide good feedback
- Responsive layout: column on mobile, row on desktop
- **Critical:** Zero `aria-*` or `role` attributes in the entire codebase
- **Critical:** SVG icons have no accessible labels (`Header.tsx:52-64`, `AgentDesk.tsx:75-87`)
- **Critical:** Refresh button has `title` but no `aria-label` (`Header.tsx:50`)
- **Critical:** Progress bars lack `role="progressbar"` and `aria-valuenow` (`PortfolioPanel.tsx:99-104`)
- **Critical:** No skip-to-content link or keyboard focus management

### 6. Documentation — Score: 5/10
- README has setup instructions, features, tech stack, project structure
- `.env.example` documents required environment variable
- **Stale:** README references old `mockData.ts` path; says "swap with API later" but API is done
- **Gap:** No API contract documentation, no ADRs, no contributing guidelines

### 7. Deployment & CI — Score: 5/10
- Vercel deployment looks correct with SPA rewrites
- Concurrency group prevents duplicate deploys
- **Gap:** No test or lint step before deploy
- **Gap:** No Dependabot or Renovate for dependency updates

### 8. Dependencies — Score: 7/10
- Minimal, modern set: React 18, Vite 6, Tailwind 3, TypeScript 5.6
- Lock file present for reproducible builds
- No production deps beyond React/ReactDOM

---

## Overall Score: 5/10

Well-structured, cleanly written React dashboard with real API integration, proper error handling, and polished visual design. Critical gaps: zero test coverage, no accessibility support, no API response validation, and stale documentation.

---

## Top 5 Actionable Recommendations (by impact)

### 1. 🧪 Add Testing Infrastructure and Basic Tests (Critical)
Install Vitest + React Testing Library. Write tests for `fetchDashboard()` retry logic (`api.ts:39-72`), `transformData()`/`mapStatus()`/`mapProjectStatus()` pure functions (`App.tsx:14-66`), and key component rendering. Add test script to `package.json` and test step in CI. **~4-6 hours.**

### 2. ♿ Add Accessibility Support (Critical)
Add `aria-label` to refresh button and SVG icons. Add `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` to progress bars. Add landmark roles to Header, OfficeFloor, PortfolioPanel. Add `aria-hidden="true"` to decorative SVGs. **~2-3 hours.**

### 3. 🔒 Validate API Responses + Add Error Boundary (High)
Add Zod or lightweight validator for `DashboardData` shape at `api.ts:58`. Wrap `<App />` in React error boundary in `main.tsx`. **~2-3 hours.**

### 4. ⚡ Optimize Polling and Re-renders (Medium)
Add `document.visibilitychange` listener to pause polling when tab is hidden. Memoize `transformData(FALLBACK_DASHBOARD)` with `useMemo`. Add `React.memo` to `AgentDesk` and `StatusBadge`. **~1-2 hours.**

### 5. 📖 Update Documentation and Add Linting (Medium)
Fix stale README references. Add ESLint + Prettier config. Add Dependabot. Document API contract and env vars. **~2-3 hours.**
