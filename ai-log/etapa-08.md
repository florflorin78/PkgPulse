# Stage 8: AI log

## Tools
- Claude

## Key requests

### 1. Pages with React Router
- Asked: how to replace the `page` state with real addresses.
- Got: `BrowserRouter` in `main.jsx`, a `Routes` map in `App.jsx`, `Link` and `NavLink` instead of buttons, and `useNavigate` to change the page from code (after choosing a distro and after adding the Customize packages).
- Changed or rejected: the list and the add form are on `/`, because the course check opens the first page and looks for the form. The old Home text moved to the About page. The state stays in `App` because the list, Customize, My Setup and the header all use it.

### 2. Layout and Outlet
- Asked: how to write the header and the footer only once.
- Got: a `Layout` route without a path. `Outlet` marks the place of the current page, and `NavLink` adds the active class by itself. `end` is needed on the `/` link, or it is active on every page.

### 3. Detail page
- Asked: how to open one package from its address.
- Got: `useParams()` returns the id as text, `fetchPackage(id)` asks the server for that package, and the effect has `[id]` in the dependency list so it runs again when the address changes. A missing id shows an error and a link back.
- Changed or rejected: I added the install command for every package manager and the list of distros where the package is missing, because that is what a new user needs.

### 4. CSS Modules
- Asked: how to move the styles next to the components.
- Got: `Name.module.css`, imported as `styles`, with `className={styles.card}`. Colors and the shared classes (`card`, `grid`, `btn-primary`, `badge`...) stay in `index.css`.
- Changed or rejected: `main.jsx` imports `index.css` first, so a module can override a global class (for example the level badge of a distro).

## What I learned / what did not work
- `<a href>` reloads the page and loses the state; `Link` only changes the address.
- Without `BrowserRouter` around `App`, `useParams` and `useNavigate` give an error.
- `useParams` returns text, so `"3"` and `3` are different when compared with `===`.
- A class from a module has a generated name, so it cannot be used from another file by writing the plain name.
- Refreshing on `/packages/1` works only in the Vite dev server; a normal server needs extra settings (stage 12).
