# Stage 7: AI log

## Tools
- Claude

## Key requests

### 1. Common request function
- Asked: how to send POST, PATCH and DELETE without repeating the same `fetch` code.
- Got: one `request(path, options)` function in `api.js` that sets the JSON header, checks `res.ok` and returns the JSON. `createPackage`, `updatePackage` and `deletePackage` call it.
- Changed or rejected: I kept the `fetch` calls only in `api.js`, like in stage 6.

### 2. The form
- Asked: how to build a form where React keeps the values.
- Got: `PackageForm` with one `useState` per field, `value` and `onChange` on every input, and `e.preventDefault()` in `handleSubmit` so the page does not reload.
- Asked: how to validate before sending.
- Got: a `validate()` function that returns the field and the message, or `null`. The error is shown in the page, not with `alert`.
- Changed or rejected: I added the fields `install`, `type` and `category` because a package needs them for the install command. The other fields (`recommended`, `managers`, `description`, `why`) get default values in `App`.

### 3. Server first, state after
- Asked: when to update the list.
- Got: `handleAdd`, `handleToggle` and `handleDelete` wait for the server and then update the state with what the server returned. `handleAdd` has no `try`, so the error goes back to the form and the text is kept.

### 4. Check files
- Got: `tw.json` in the root of the repository and `data-testid` attributes on the form, the cards and the messages.

## What I learned / what did not work
- Without `e.preventDefault()` the page reloads on submit and everything is lost.
- A `value` without `onChange` makes the input read-only.
- If the empty fields are cleared before the `await`, the text is lost when the server fails. They are cleared only after a successful save.
- The condition `!loading && !error` hid the whole list when one toggle failed; it is now `!loading`.
