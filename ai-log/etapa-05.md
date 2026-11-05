# Stage 5: AI log

## Tools
- Claude

## Key requests

### 1. Moving the list into state
- Asked: how to keep the packages in `useState` in `App` and change them from the cards.
- Got: `handleToggle` with `map` and `handleDelete` with `filter`, both with the `prev =>` form, passed down as `onToggle` and `onDelete`.
- Changed or rejected: the counter in the header is computed from the list, not kept in a second state.

### 2. Light and dark mode
- Asked: how to switch the theme from a button, not only from the system setting.
- Got: a `theme` state and `document.documentElement.dataset.theme`, plus a `:root[data-theme="dark"]` block in CSS.

### 3. The site pages
- Asked: how to split the site into Home, Distros, Packages, Customize and My Setup without a router.
- Got: a `page` state in `App` and one component per page.
- Asked: how to do drag and drop for the Customize page.
- Got: `draggable`, `onDragStart` with `dataTransfer.setData`, `onDragOver` with `preventDefault` and `onDrop`. I also made every piece clickable, for phones.

### 4. Cleaning the project
- Removed the Vite template README, the empty `.env`, the course PDFs and commented-out CSS.

## What I learned / what did not work
- `onClick={onDelete(pkg.id)}` calls the function while rendering and empties the list; it must be `onClick={() => onDelete(pkg.id)}`.
- A checkbox with `checked` and no `onChange` becomes read-only and shows a warning.
- Changing the array in place (`push`, `p.selected = true`) does not update the page.
