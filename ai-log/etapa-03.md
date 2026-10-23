# Stage 3: Vite and React project

## Tools Used
- Gemini

## Conversations and Solutions
- Initialized a new Vite + React project inside the `frontend/` folder using `npm create vite@latest`.
- Migrated the static HTML mockup structure (header, distro grid, search bar) into React's JSX syntax inside `App.jsx`.
- Moved the CSS from the mockup into `App.css` and imported it from `main.jsx`.
- Replaced `class` with `className` and adapted the HTML structure to work as a single React component.
- Kept the data arrays (packages, distros) defined above the component function so they are initialized once.

## What I Learned / What Worked
- Vite's hot module replacement (HMR) makes development much faster — changes appear instantly without full page reload.
- JSX requires `className` instead of `class` and self-closing tags like `<input />`.
- Placing static data outside the component function avoids unnecessary re-creation on every render.
- The `StrictMode` wrapper helped catch potential issues during development.
