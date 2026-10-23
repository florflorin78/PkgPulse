# Stage 4: Components rendered from data

## Tools Used
- Claude Sonnet (Antigravity AI)

## What Stage 4 Requires
Stage 4 focuses on **components rendered from data arrays** — the core React pattern of mapping over arrays to produce lists of reusable components with proper `key` props. The evaluator will look for:

1. **Reusable components** that receive data through props (`DistroCard`, `PackageCard`)
2. **Rendering with `.map()` + `key={item.id}`** instead of hard-coded HTML
3. **Empty state handling** — show a message when no items exist or no search results match
4. **Data separated from UI** — packages in `packages.js`, distros in `data/distros.js`
5. **Props destructuring** — components use `{ distro, onClick }` pattern

## Conversations and Solutions

### Components extracted from data
- `DistroCard` (`src/components/DistroCard.jsx`) — receives `distro` and `onClick` through props. Renders icon, colored name, info text, and difficulty badge from data fields.
- `PackageCard` (`src/components/PackageCard.jsx`) — receives `pkg`, `onToggle`, `onDelete`. Shows name, type badge, category label, and action buttons.

### Data files
- `src/packages.js` — 50 popular Linux packages across 10 categories. Exports `initialPackages`, `countSelected`, `filterByDistro`, `filterByCategory`, `getCategories`.
- `src/data/distros.js` — 14 Linux distributions with id, name, info, pkgManager, icon emoji, color, difficulty level, and description.

### Rendering with .map() and key
- Distro grid: `filteredDistros.map((d) => <DistroCard key={d.id} distro={d} onClick={handleOpenDistro} />)`
- Portal packages: `portalPackages.map((p) => <div key={p.id} ...>)`
- Browse packages: `browsedPackages.map((p) => <div key={p.id} ...>)`
- Package list (My Setup): `packages.map((p) => <PackageCard key={p.id} pkg={p} ... />)`

### Empty state handling
- Distro search with no results: `{filteredDistros.length === 0 ? <p className="empty">No distributions match...</p> : (...)}`
- Portal with no compatible packages: shows `"No compatible packages in this category."`
- Browse with no results: shows `"No packages match your search."`
- My Setup with empty list: shows `"No packages yet. Add one using the form."`

### Category filter tabs (bonus interaction)
- Portal view shows category tabs dynamically generated from the compatible packages for the selected distro: `portalCategories.map((cat) => <button key={cat} ...>)`
- Browse Packages section has the same category tab filtering across all 10 categories

### Navigation across 3 sections
- `activeSection` state drives which section renders (`"Distributions"`, `"Browse Packages"`, `"My Setup"`)
- Navbar renders `SECTIONS.map((sec) => <li key={sec}><button ...>)` — nav itself is data-driven

## What I Learned / What Worked
- Destructuring props (`{ distro, onClick }`) keeps component code clean and makes the expected interface explicit.
- Using `key={item.id}` instead of array index prevents React re-rendering bugs when items are reordered or deleted.
- Early return / conditional render for empty lists (`{list.length === 0 ? <p>...</p> : list.map(...)}`) improves UX by informing the user instead of showing blank space.
- Separating data files (`packages.js`, `distros.js`) from components makes it easy to update 50 packages without touching UI code.
- Derived data (category lists, filtered lists) computed inline from state avoids redundant state variables.
- `filterByDistro` and `filterByCategory` are pure helper functions — easy to test and reason about.

## What to Show the Evaluator
1. Open the app → show the **distro grid** (14 distros rendered from `distros` array via `.map()`)
2. Type in the search bar → grid filters live → type nonsense to trigger the **empty state**
3. Click any distro → show the **portal**: package cards rendered from `filterByDistro()` via `.map()`
4. Click category tabs → show filtered sub-lists → click a category with 0 packages to show **empty state**
5. Click **"+ Add to setup"** on packages → card border turns green → install script updates
6. Click **"Copy"** → script copied to clipboard
7. Go to **Browse Packages** tab → show all 50 packages, use search and category tabs
8. Go to **My Setup** tab → add a new package via form → it appears in the list immediately
9. Toggle select / delete packages → counter in navbar updates
10. Show the **source code**: `DistroCard.jsx`, `PackageCard.jsx`, `packages.js`, `distros.js`
