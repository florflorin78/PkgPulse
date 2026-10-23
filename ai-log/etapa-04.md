# Stage 4: Components rendered from data

## Tools Used
- Gemini

## Conversations and Solutions
- Extracted the distro card markup into a `DistroCard` component (`src/components/DistroCard.jsx`) that receives `distro` and `onClick` through props.
- Extracted the package item markup into a `PackageCard` component (`src/components/PackageCard.jsx`) that receives `pkg`, `onToggle`, and `onDelete` through props.
- Used `map` with `key={id}` to render the lists dynamically from data arrays, without console warnings.
- Added empty list handling: when no packages exist or no search results match, a descriptive message is shown.
- Moved the package data into a separate `packages.js` module and the distro data into `data/distros.js` for better file organization.

## What I Learned / What Worked
- Destructuring props (`{ distro, onClick }`) keeps component code clean and makes the expected interface clear.
- Using `key={item.id}` instead of array index prevents React re-rendering bugs when items are reordered or deleted.
- Early return for empty lists (`if (length === 0) return <p>...`) improves UX by informing the user instead of showing a blank space.
- Separating data files from components makes it easier to update the data without touching UI code.
