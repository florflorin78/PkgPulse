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

// unique categories
export function getCategories(list) {
  return [...new Set(list.map((p) => p.category))];
}

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
