# PkgPulse
Web interface to build, package-shop, and customize a fresh Linux system setup with distribution and tiling window manager presets.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| name | text | required, max 100 chars |
| selected | boolean | toggled from the list, default false |
| type | fixed values | package, configuration, script |
| category | relation | System packages, Interface & Tiling, Utilities |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Hyprland, selected, configuration
2. Zsh, selected, script
3. Alacritty, selected, package

## How to run
```
cd frontend
npm install
npm run dev
```
Then open the address printed in the terminal (http://localhost:5173).

## AI usage
| Tool | Used for |
| -------------- | ----------------------------------------- |
| Gemini | Structuring the project template |

Details per stage: see the ai-log/ folder.

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the distro grid and search are rendered via JSX.

### Stage 3 checklist

| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S3-R1 | npm run dev starts without errors | frontend/package.json | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | frontend/src/App.jsx#L9-L14 | edit data, save |
| S3-R3 | data from README, not from the example | frontend/src/packages.js#L3-L64 | compare with README |
| S3-R4 | stage 1 styles reused | frontend/src/App.css | look at the page |
| S3-R5 | node_modules ignored, build passes | frontend/.gitignore | npm run build |
| S3-R6 | README Stage 3 section + AI log | README.md, ai-log/etapa-03.md | read |
| S3-R7 | commit "Stage 3" pushed | link to the commit | commit history |

## Stage 4: components
The list is rendered from the data, through two components:
- `DistroCard` receives a single distro through props and displays it as a clickable card
- `PackageCard` receives a single package through props and displays it with toggle/delete actions

### Stage 4 checklist

| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S4-R1 | 2+ components in src/components/ | frontend/src/components/ | open folder |
| S4-R2 | card receives data through props | PackageCard.jsx#L2 | read |
| S4-R3 | map + key={id}, no console warnings | App.jsx#L119-L123 | F12, Console |
| S4-R4 | message for empty list | App.jsx#L207-L208 | set array to [] |
| S4-R5 | state changes the card look | PackageCard.jsx#L4 | toggle a selected flag |
| S4-R6 | README Stage 4 section + AI log | README.md, ai-log/etapa-04.md | read |
| S4-R7 | commit "Stage 4" pushed | link to the commit | commit history |

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [ ] Stage 5: local state and events
