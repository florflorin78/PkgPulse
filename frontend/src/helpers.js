import { CATEGORY_STYLES } from "./data/constants.js";

const INSTALL_COMMANDS = {
  apt: "sudo apt install",
  dnf: "sudo dnf install",
  zypper: "sudo zypper install",
  pacman: "sudo pacman -S",
};

const UPDATE_COMMANDS = {
  apt: "sudo apt update",
  dnf: "sudo dnf upgrade",
  zypper: "sudo zypper refresh",
  pacman: "sudo pacman -Syu",
};

export function searchByName(list, text) {
  return list.filter((p) => p.name.toLowerCase().includes(text.toLowerCase()));
}

export function isAvailable(pkg, distro) {
  return pkg.managers.includes(distro.manager);
}

// e.g. "sudo pacman -S zsh kitty"
export function installCommand(names, manager) {
  if (names.length === 0) {
    return "# No packages selected yet";
  }
  return INSTALL_COMMANDS[manager] + " " + names.join(" ");
}

export function updateCommand(manager) {
  return UPDATE_COMMANDS[manager];
}

// apps that are not in the repos can come from Flathub
export function canUseFlatpak(pkg, distro) {
  return !isAvailable(pkg, distro) && pkg.flatpak !== undefined;
}

export const FLATHUB_COMMAND =
  "flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo";

// e.g. "flatpak install -y flathub com.spotify.Client"
export function flatpakCommand(ids) {
  return "flatpak install -y flathub " + ids.join(" ");
}

// every category has a look, other values get the Apps one
export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Apps;
}

// a number that looks random, but is always the same for the same key and seed,
// so the feed does not jump around while you scroll
export function randomRank(key, seed) {
  let hash = seed;
  const text = String(key);
  for (let i = 0; i < text.length; i++) {
    hash = Math.imul(hash ^ text.charCodeAt(i), 2654435761);
  }
  hash = Math.imul(hash ^ (hash >>> 15), 2246822507);
  return (hash ^ (hash >>> 13)) >>> 0;
}

// sort is "random", "popular", "trending", "newest" or "name"; the original list is not changed
export function sortPackages(list, sort, seed) {
  const copy = [...list];
  if (sort === "random") {
    return copy.sort((a, b) => randomRank(a.id, seed) - randomRank(b.id, seed));
  }
  if (sort === "newest") {
    return copy.sort((a, b) => Number(b.id) - Number(a.id));
  }
  if (sort === "trending") {
    return copy.sort((a, b) => Number(Boolean(b.trending)) - Number(Boolean(a.trending)));
  }
  if (sort === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy.sort((a, b) => Number(b.recommended) - Number(a.recommended));
}

// a search on YouTube always works, even when a package has no video of its own
export function youtubeSearch(name) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " linux tutorial");
}

// the chosen distro is remembered in the browser
export function readSavedDistro() {
  try {
    return localStorage.getItem("distro");
  } catch {
    return null;
  }
}

export function saveDistro(id) {
  try {
    localStorage.setItem("distro", id);
  } catch {
    // private mode: the choice is only kept until refresh
  }
}
