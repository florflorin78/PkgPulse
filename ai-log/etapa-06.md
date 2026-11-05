# Stage 6: AI log

## Tools
- Claude

## Key requests

### 1. Mock API
- Asked: how to serve the packages and distros from a fake server.
- Got: `json-server@0.17.4` and `db.json` with two keys, `packages` and `distros`, which become the routes `/packages` and `/distros`.

### 2. Loading the data
- Asked: how to load the data when the page opens.
- Got: `useEffect` with `[]`, an `async function load()` inside it, `try / catch / finally` and the `ignore` flag for the cleanup.
- Changed or rejected: all `fetch` calls stay in `src/api.js`, and the address comes from `VITE_API_URL`.

### 3. Loading and error states
- Got: "Loading packages..." while waiting and an error message that says to run `npm run api`.

## What I learned / what did not work
- `fetch` does not throw on 404 or 500, so `res.ok` must be checked.
- In development React mounts the component twice, so two requests appear in the Network tab.
- Checking and deleting still change only the state, so they are lost on refresh (fixed in stage 7).
