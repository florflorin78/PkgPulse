# Stage 4: AI log

## Tools
- Claude

## Key requests

### 1. Splitting the page into components
- Asked: how to move the repeated card markup into separate components.
- Got: `DistroCard` and `PackageCard`, each receiving one item through props.
- Changed or rejected: kept the data in separate files (`packages.js`, `data/distros.js`).

### 2. Rendering lists
- Asked: how to render the cards from the arrays.
- Got: `map` with `key={item.id}` and a message when the list is empty.

## What I learned / what did not work
- A component is a function that receives props and returns JSX.
- `key` must be the id, not the position, so React knows which card is which.
- An empty list should show a message, not a blank page.
