# PkgPulse
A friendly website for people who want to try Linux. You pick a distribution,
choose the packages you need (each one explains why you need it), design how
your desktop will look with drag and drop, and get one command that installs
everything after you install Linux.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| name | text | required, max 100 chars |
| selected | boolean | toggled from the list, default false |
| type | fixed values | package, configuration, script |
| category | relation | Interface & Tiling, Terminal & Shell, Apps, System packages |
| user | relation | the owner of the item (from week 11) |

Extra fields used by the site: `install` (the name used in the install
command), `recommended`, `managers` (package managers that have it),
`description`, `why`.

Sample data used across all stages:
1. Hyprland, selected, configuration
2. Zsh, selected, script
3. Alacritty, selected, package

## How to run
```
cd frontend
npm install
npm run api    # terminal 1, http://localhost:3001
npm run dev    # terminal 2, http://localhost:5173
```

## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | Structuring the project template (stages 1-3) |
| Claude | Components (stage 4), state, theme and API loading (stages 5-6) |

Details per stage: see the ai-log/ folder.

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the distro grid and search are rendered via JSX.

### Stage 3 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S3-R1 | npm run dev starts without errors | [package.json](https://github.com/florflorin78/PkgPulse/blob/c54b04f/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx](https://github.com/florflorin78/PkgPulse/blob/c54b04f/frontend/src/App.jsx) | edit data, save |
| S3-R3 | data from README, not from the example | [packages.js](https://github.com/florflorin78/PkgPulse/blob/c54b04f/frontend/src/packages.js) | compare with README |
| S3-R4 | stage 1 styles reused | [App.css](https://github.com/florflorin78/PkgPulse/blob/c54b04f/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [.gitignore](https://github.com/florflorin78/PkgPulse/blob/c54b04f/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | README.md, ai-log/etapa-03.md | read |
| S3-R7 | commit "Stage 3" pushed | [c54b04f](https://github.com/florflorin78/PkgPulse/commit/c54b04f) | commit history |

## Stage 4: components
The list is rendered from the data, through components that receive data
through props: `DistroCard` shows one distro, `PackageCard` shows one package.

### Stage 4 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S4-R1 | 2+ components in src/components/ | [components/](https://github.com/florflorin78/PkgPulse/tree/823a4b2/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [PackageCard.jsx](https://github.com/florflorin78/PkgPulse/blob/823a4b2/frontend/src/components/PackageCard.jsx) | read |
| S4-R3 | map + key={id}, no console warnings | [App.jsx](https://github.com/florflorin78/PkgPulse/blob/823a4b2/frontend/src/App.jsx) | F12, Console |
| S4-R4 | message for empty list | frontend/src/components/PackageList.jsx#L4-L6 | search for "xyz" |
| S4-R5 | state changes the card look | frontend/src/components/PackageCard.jsx#L12 | check a package |
| S4-R6 | README Stage 4 section + AI log | README.md, ai-log/etapa-04.md | read |
| S4-R7 | commit "Stage 4" pushed | [823a4b2](https://github.com/florflorin78/PkgPulse/commit/823a4b2) | commit history |

## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

The site also got its real pages: Home, Distros, Packages (search, category
tabs, "only recommended"), Customize (drag and drop desktop preview) and
My Setup (the final install command).

### Stage 5 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S5-R1 | list kept in useState, in App | frontend/src/App.jsx#L23 | read |
| S5-R2 | toggling changes state and card look | frontend/src/App.jsx#L56-L60, frontend/src/components/PackageCard.jsx#L12-L18 | click a checkbox |
| S5-R3 | delete removes the item | frontend/src/App.jsx#L62-L64, frontend/src/components/PackageCard.jsx#L32-L38 | click Delete |
| S5-R4 | header counter derived, not in state | frontend/src/App.jsx#L86 | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | frontend/src/App.jsx#L56-L72 | read |
| S5-R6 | light / dark toggle: state + data-theme on html | frontend/src/App.jsx#L79-L83, frontend/src/App.css#L17-L43 | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | README.md, ai-log/etapa-05.md | F12, Console |
| S5-R8 | commit "Stage 5" pushed | link to the commit | commit history |

## Stage 6: data from a mock API
The packages and the distros are served by json-server from `db.json`.
The app fetches them on load and shows a loading state and an error state.

    npm run api    # terminal 1, http://localhost:3001
    npm run dev    # terminal 2, http://localhost:5173

### Stage 6 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S6-R1 | npm run api starts, route shows JSON | frontend/package.json#L11, frontend/db.json | open localhost:3001/packages |
| S6-R2 | data no longer in React code | frontend/src/App.jsx#L23-L24 (useState([])) | read |
| S6-R3 | loading message while waiting | frontend/src/App.jsx#L122 | --delay 4000 |
| S6-R4 | error message when API is down | frontend/src/App.jsx#L123-L127 | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | frontend/src/api.js#L1-L19, frontend/.env.example | search for fetch |
| S6-R6 | README Stage 6 section + AI log | README.md, ai-log/etapa-06.md | read |
| S6-R7 | commit "Stage 6" pushed | link to the commit | commit history |

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [ ] Stage 7: form and validation
