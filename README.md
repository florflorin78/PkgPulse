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
| category | relation | 11 categories, listed in `frontend/src/data/constants.js` |
| user | relation | the owner of the item (from week 11) |

Extra fields used by the site: `install` (the name used in the install
command), `recommended`, `managers` (package managers that have it),
`description`, `why`, and `flatpak` (the Flathub id, only for apps that are not in
the official repos, like Spotify or Steam).

Optional fields: `video` (a YouTube id), `image` (a file in `frontend/public/img`),
`flatpak` (the Flathub id, for apps that are not in the repos) and `highlight` (one line
that says what makes the package different). A package that is not in the repos of the
chosen distro but has a `flatpak` id is installed with Flatpak in My Setup.

The data has 204 packages and 22 distros. Distros also have `website`, `basedOn`,
`desktop`, `release`, `pros`, `cons`, `highlight`, `features`, `trending` and an
optional `video`.

## Project structure

    frontend/
      db.json              data for json-server
      public/img/rices/    screenshots of the Customize editor (Gallery)
      src/
        main.jsx, App.jsx  start of the app, routes and shared state
        api.js             every request to the server
        helpers.js         small functions (commands, sorting, saved distro)
        usePageTitle.js    the title of the browser tab
        index.css          colors, themes and shared classes
        data/              fixed data: categories, Customize pieces, demos, guides, jokes, mascots
        components/        Layout, DistroCard, CommandBox, DesktopPreview
          feed/            the posts of the feed and the add form
          visuals/         mascots, animated desktops, demos, video player, practice terminal
        pages/             one file for every route

## Pictures and animations

Every picture is made by the site, nothing is copied from other sites:
- every distro has its own mascot and a drawing of its default desktop, with bubbles
  for the three things that make it different (`features`);
- every package shows what it does: a terminal that types the command and prints the
  result, an app window that opens after a click, or a desktop tool at work;
- the Gallery images are screenshots of the Customize editor.

All animations stop when the system asks for reduced motion.

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
| Claude | Components (stage 4), state, theme and API loading (stages 5-6), form and validation (stage 7), routing and CSS Modules (stage 8) |

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
| S4-R4 | message for empty list | [PackageList.jsx L4-L6](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/components/PackageList.jsx#L4-L6) | search for "xyz" |
| S4-R5 | state changes the card look | [PackageCard.jsx L12](https://github.com/florflorin78/PkgPulse/blob/823a4b2/frontend/src/components/PackageCard.jsx#L12) | check a package |
| S4-R6 | README Stage 4 section + AI log | [README.md](https://github.com/florflorin78/PkgPulse/blob/823a4b2/README.md), [etapa-04.md](https://github.com/florflorin78/PkgPulse/blob/823a4b2/ai-log/etapa-04.md) | read |
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
| S5-R1 | list kept in useState, in App | [App.jsx L23](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.jsx#L23) | read |
| S5-R2 | toggling changes state and card look | [App.jsx L56-L60](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.jsx#L56-L60), [PackageCard.jsx L12-L18](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/components/PackageCard.jsx#L12-L18) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx L62-L64](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.jsx#L62-L64), [PackageCard.jsx L32-L38](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/components/PackageCard.jsx#L32-L38) | click Delete |
| S5-R4 | header counter derived, not in state | [App.jsx L86](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.jsx#L86) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx L72-L102](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/App.jsx#L72-L102), [CustomizePage.jsx L81-L96](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/CustomizePage.jsx#L81-L96) (fixed in Stage 7: no more push) | read, search for push |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx L79-L83](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.jsx#L79-L83), [App.css L17-L43](https://github.com/florflorin78/PkgPulse/blob/e214ffa/frontend/src/App.css#L17-L43) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md](https://github.com/florflorin78/PkgPulse/blob/e214ffa/README.md), [etapa-05.md](https://github.com/florflorin78/PkgPulse/blob/e214ffa/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [Stage 5: local state and events](https://github.com/florflorin78/PkgPulse/commit/e214ffabd8487cb04d7bc4afccc83f73826a8cb5) | commit history |

## Stage 6: data from a mock API
The packages and the distros are served by json-server from `db.json`.
The app fetches them on load and shows a loading state and an error state.

    npm run api    # terminal 1, http://localhost:3001
    npm run dev    # terminal 2, http://localhost:5173

### Stage 6 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S6-R1 | npm run api starts, route shows JSON | [package.json L11](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/package.json#L11), [db.json](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/db.json) | open localhost:3001/packages |
| S6-R2 | data no longer in React code | [App.jsx L23-L24](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/src/App.jsx#L23-L24) (useState([])) | read |
| S6-R3 | loading message while waiting | [App.jsx L122](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/src/App.jsx#L122) | --delay 4000 |
| S6-R4 | error message when API is down | [App.jsx L123-L127](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/src/App.jsx#L123-L127) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [api.js L1-L19](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/src/api.js#L1-L19), [.env.example](https://github.com/florflorin78/PkgPulse/blob/3c28121/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | [README.md](https://github.com/florflorin78/PkgPulse/blob/3c28121/README.md), [etapa-06.md](https://github.com/florflorin78/PkgPulse/blob/3c28121/ai-log/etapa-06.md) | read |
| S6-R7 | commit "Stage 6" pushed | [Stage 6: data from a mock API](https://github.com/florflorin78/PkgPulse/commit/3c281217030252fe16e232c61397180ddd8964ef) | commit history |

## Stage 7: form and validation
Packages can be added from the page. The form is controlled and validated,
and every change (add, toggle, delete) goes to the API before it shows up
in the list, so it is still there after a refresh. `tw.json` and the
`data-testid` attributes are used by the automatic check of the course.

### Stage 7 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S7-R1 | controlled form: value + onChange on every field | [PackageForm.jsx L56-L112](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/PackageForm.jsx#L56-L112) | read |
| S7-R2 | empty name shows an error, nothing is sent | [PackageForm.jsx L15-L31](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/PackageForm.jsx#L15-L31) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [App.jsx L62-L73](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/App.jsx#L62-L73), [api.js L3-L25](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/api.js#L3-L25) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [App.jsx L75-L94](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/App.jsx#L75-L94) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [PackageForm.jsx L33-L53](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/PackageForm.jsx#L33-L53), [PackageForm.jsx L112](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/PackageForm.jsx#L112) | --delay 3000, stop the API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [tw.json](https://github.com/florflorin78/PkgPulse/blob/f240c88/tw.json), [PackageCard.jsx L14-L41](https://github.com/florflorin78/PkgPulse/blob/f240c88/frontend/src/components/PackageCard.jsx#L14-L41) | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | [README.md](https://github.com/florflorin78/PkgPulse/blob/f240c88/README.md), [etapa-07.md](https://github.com/florflorin78/PkgPulse/blob/f240c88/ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [Stage 7: form and validation](https://github.com/florflorin78/PkgPulse/commit/f240c8879e1ba182396a04484c82302b0c696cef) | commit history |

## Stage 8: routing and detail page
Three pages behind React Router: the package list, a detail page at
`/packages/:id` and an about page, plus a 404 page for unknown addresses.
The header and the footer are written once in `Layout`. The styles moved
from one big `App.css` to CSS Modules, one file next to each component;
`index.css` keeps only the colors and the shared classes.

| Address | Page |
| ------------- | ------------------------------------------- |
| / | the feed: package posts, search, filters, the add form and memes |
| /packages/:id | detail of one package, with the command for every package manager |
| /distros | choose a distro |
| /customize | drag and drop desktop |
| /setup | selected packages and the install command |
| /distros/:id | detail of one distro: facts, pros and cons, install video |
| /gallery | ready desktops, each opens in Customize |
| /learn | beginner guides |
| /learn/:slug | one guide, with steps you can tick |
| /quiz | 5 questions that recommend a distro |
| /about | why Linux and how the site works |
| * | page not found |

### Stage 8 checklist
| ID | Requirement | Where (permalink) | How to check |
| ----- | ---------------------------------- | ------------------------------------------- | ---------------------- |
| S8-R1 | header navigation changes the page without reload | [App.jsx L111-L155](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/App.jsx#L111-L155), [Layout.jsx L38-L46](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/components/Layout.jsx#L38-L46) | click the links, watch Network |
| S8-R2 | click on an item opens its detail page | [PackageCard.jsx L29-L31](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/components/PackageCard.jsx#L29-L31), [PackageDetailPage.jsx](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/pages/PackageDetailPage.jsx) | click a title |
| S8-R3 | refresh on the detail address works; a missing id shows an error | [PackageDetailPage.jsx L8-L35](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/pages/PackageDetailPage.jsx#L8-L35), [PackageDetailPage.jsx L45-L54](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/pages/PackageDetailPage.jsx#L45-L54) | refresh /packages/1, open /packages/999 |
| S8-R4 | unknown address shows the 404 page of the app | [App.jsx L154](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/App.jsx#L154), [NotFoundPage.jsx](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/pages/NotFoundPage.jsx) | open /ceva |
| S8-R5 | each component has its .module.css; index.css only shared styles | [components](https://github.com/florflorin78/PkgPulse/tree/f53113a/frontend/src/components), [pages](https://github.com/florflorin78/PkgPulse/tree/f53113a/frontend/src/pages), [index.css](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/index.css) | read |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route /packages/:id | [Layout.jsx L38](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/components/Layout.jsx#L38), [PackageCard.jsx L16-L48](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/components/PackageCard.jsx#L16-L48), [PackageDetailPage.jsx L59-L63](https://github.com/florflorin78/PkgPulse/blob/f53113a/frontend/src/pages/PackageDetailPage.jsx#L59-L63) | querySelector in the console |
| S8-R7 | README Stage 8 section + AI log | [README.md](https://github.com/florflorin78/PkgPulse/blob/f53113a/README.md), [etapa-08.md](https://github.com/florflorin78/PkgPulse/blob/f53113a/ai-log/etapa-08.md) | read |
| S8-R8 | commit "Stage 8" pushed | [Stage 8: routing and detail page](https://github.com/florflorin78/PkgPulse/commit/f53113a7e9f0ca1a92a520b88f75fe52523b69e6) | commit history |

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express
