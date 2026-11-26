# Extra: more packages, distros and customizations

## Tools
- Claude

## Key requests

### 1. More data
- Asked: to add the popular packages, distros and ricing pieces, in all categories.
- Got: a list of about 170 new packages in 11 categories (tiling, customization, terminal, development, internet, multimedia, office, gaming, security, apps, system) and 13 new distros, written in `db.json`.
- Changed or rejected: I removed my test package "dsdsa" from the data. I kept only 4 package managers (apt, dnf, zypper, pacman), because the install command is built from them. A package is listed for a manager only if it has the same name there.

### 2. Apps that are not in the repos
- Asked: what to do with apps like Spotify, Discord, Chrome and Steam.
- Got: an optional `flatpak` field with the Flathub id. If the chosen distro does not have the package, the card and My Setup use the Flatpak command. `helpers.js` has `canUseFlatpak`, `flatpakCommand` and the Flathub command.
- Changed or rejected: My Setup adds `flatpak` itself to the install list when it is needed, without using `push` on the array.

### 3. New filters
- Asked: how to browse so many items.
- Got: a checkbox on the Packages page that shows only what the chosen distro can install, a counter "Showing X of Y", and a level and package manager filter on the Distros page.

### 4. Customize page
- Asked: more ricing pieces.
- Got: 6 wallpapers, 8 color schemes, 6 window managers, a new bar, terminals and launchers, and 3 new slots: shell, file manager and notifications.
- Changed or rejected: every piece has `display` (wayland, x11 or both), so the warning check from stage 5 works for the new pieces too.

## What I learned / what did not work
- A controlled checkbox changes only after the server answers, so a test must wait a moment after the click.
- I must check every package name and every package manager myself, because one wrong name breaks the whole install command.

### 5. The Packages page as a feed
- Asked: make the page look like a social media feed, not a long list.
- Got: topics with counters on the left, the distros as round "stories" on top, big cards like posts (avatar, banner, text, and an action bar with Add to My Setup, Details and Delete), a sticky search and sort bar, and a right column with My Setup and popular packages.
- Changed or rejected: the feed shows 12 posts and loads 12 more when an empty element at the end enters the screen (`IntersectionObserver` in a `useEffect`). I kept the add form always visible, because the course check looks for it on the first page. A new post shows at the top, so the filters and the sort are reset after adding it.
- Note: the banner is only a gradient with an emoji of the category for now. Real screenshots and videos come in the next step.

### 6. Pictures and videos on the cards
- Asked: show how a package looks and works, not only text.
- Got: a `PackageMedia` component with three cases: a YouTube video (a thumbnail that becomes the player after a click), an image from `public/img`, or the colored banner. Every card also has a link to a YouTube search, because it always works.
- Changed or rejected: I could not check the video ids from here, so I put only 4 ids found with a search (Hyprland, Neovim, i3, Waybar) and I must check that they play. The screenshots must be added by me in `public/img`.

### 7. The desktop editor
- Asked: to choose what goes in the taskbar, where it is, and to customize everything.
- Got: the Customize page has tabs (Look, Bar, Windows, Apps) and a preview that changes live. The bar can be on any side, in three styles, and the widgets are dragged into its left, center or right part (or clicked). The window layout, the number of windows, the gaps, the corners, the border, the opacity and the font are set with buttons and sliders. There are 7 ready desktops, a random one and a reset.
- Changed or rejected: the data moved to `customizeData.js`, the drawing to `DesktopPreview.jsx`, and the page keeps only the state. Every change makes a new object with spread or `filter`, no `push`. "Add these packages" also adds the tools that the chosen widgets and the display server need (for example Playerctl for the music widget).

## What I learned / what did not work (extra)
- `dataTransfer` can hold only text, so I write `piece:` or `widget:` before the id to know what was dropped.
- A grid of 12 columns and 6 rows is enough to place windows for every layout, only with numbers in the data.

### 8. More content and new pages
- Asked: to make the site look professional and not boring, with pictures, videos, tutorials, memes and trending things.
- Got:
  - distro details in `db.json` (website, base, desktop, updates, pros and cons, a video) and a page `/distros/:id` that loads one distro from the server;
  - a trending list from the DistroWatch ranking and Linux news (CachyOS, Niri, Omarchy), with a "trending" badge and sort;
  - the cards draw a terminal, a desktop or an app window when there is no picture;
  - a Gallery with 12 desktops, the pictures are screenshots of my own editor;
  - a Learn section with 8 guides and a quiz that counts points for every distro;
  - my own Linux jokes between the posts, a download button for the script, the chosen distro saved in `localStorage`, and a title for every page.
- Changed or rejected: I did not copy logos, photos or memes from other sites, because they belong to other people. I removed ArcoLinux, because the project stopped in 2025, and added Omarchy. The YouTube ids come from a search and I must check that they play.

## What I learned (extra 2)
- `useLocation().state` passes data to a page without putting it in the address (Gallery → Customize).
- `localStorage` can throw an error in private mode, so it needs `try` and `catch`.
- A file can be made in the browser with `Blob` and `URL.createObjectURL`, then saved with a link that has `download`.

### 9. Less monotone, more animation
- Asked: real pictures of every distro, animations, and to show what every command and package really does, with my own icons.
- Got:
  - a mascot for every distro, drawn in SVG from a few parts (hat, eyes, mouth), that floats and blinks;
  - a drawing of the default desktop of every distro (GNOME, KDE, Cinnamon, Xfce, Pantheon, COSMIC, Hyprland, or the text console for Arch) where the windows open and a mouse moves;
  - 60 commands with an animated terminal that types the command and prints an output like the real one (htop, git, fastfetch, cava, cmatrix...);
  - app windows that show the app working (a browser loading, a chat, code being typed, music playing, a drawing) and desktop tools doing their job (a launcher, a notification, a lock screen);
  - a pattern for every category, soft lights in the page background, distro spotlights and "did you know" facts in the feed.
- Changed or rejected: real screenshots from the distro sites belong to them, so the site draws its own. The outputs in `demoData.js` are examples, not copied from a real computer. Sizes in `DistroDesktop` use `cqw` (container units), so the same drawing works on a small card and on the big page.

## What I learned (extra 3)
- `stroke-dasharray` and `stroke-dashoffset` make an SVG line look like it is being drawn.
- A new `key` on an element makes React build it again, so the CSS animation starts again (the Replay button).
- `animation-delay` on every line is enough to make text appear one line after the other, no timers needed.

### 10. A mixed feed and things that react to clicks
- Asked: the posts should come in a random order, without repeats, and the site should show clicks and what happens after them.
- Got:
  - a "For you (mixed)" order: every post gets a number from a small hash of its id and a random seed, so the order is new on every visit but does not change while scrolling, and no post repeats; the Shuffle button makes a new seed;
  - the memes, distro spotlights and tips are mixed the same way and each one is shown only once;
  - in the app demos a mouse moves to an icon, clicks it and the app opens; the desktop demos show the keys you press (Super + D, Print Screen...), the terminal demos show Enter;
  - confetti and a small message at the bottom when you add a package to My Setup, and the cards slide in while you scroll;
  - a pretend terminal on the Learn page and on every package page, where you type real commands (htop, git log, sudo apt install firefox...) and see an answer.
- Changed or rejected: `Math.random()` is called only when the page starts or when Shuffle is pressed, never during render, so React does not mix the feed again on every click.

### 11. What makes each one different, and a clean project
- Asked: pictures and themes from the internet, the important differences shown in the animations, the site really useful, and everything not needed removed.
- Got:
  - a `highlight` for all 204 packages (one line about what makes it different), shown under the animation of every post and on the detail page;
  - a `highlight` and three `features` for every distro; the features pop up as bubbles on the animated desktop;
  - a Copy button next to every command, and on every card the package managers that have the package (✓ apt ✗ zypper ...);
  - the project cleaned: unused function (`getCategories`), unused export (`API_URL`), unused CSS (`btn-danger`), unused data (the emoji `icon` of the distros, replaced by the mascots) and temporary files removed;
  - the files sorted: `src/data/` for the fixed data, `components/feed/` for the posts, `components/visuals/` for pictures and animations;
  - the checklists in the README now link to the exact file of every stage commit.
- Changed or rejected: I did not copy pictures or themes from other sites, even changed, because a changed copy still belongs to its author. I kept the `mockup/` folder, because it is the Stage 1 work.
