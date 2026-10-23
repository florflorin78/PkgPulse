// Package data with descriptions and distro compatibility
// this helps users understand what each package does and why they need it
export const initialPackages = [
  {
    id: 1,
    name: "Hyprland",
    selected: true,
    type: "configuration",
    category: "Interface & Tiling",
    description: "A dynamic tiling Wayland compositor that doesn't sacrifice on looks.",
    why: "Perfect for power users who want a beautiful, fast, and customizable desktop.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "nixos", "gentoo"],
  },
  {
    id: 2,
    name: "Zsh",
    selected: true,
    type: "script",
    category: "System packages",
    description: "An extended Bourne shell with many improvements and plugin support.",
    why: "Better autocompletion, themes (oh-my-zsh), and scripting than default bash.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "ubuntu", "debian", "mint", "pop", "fedora", "rhel", "nixos", "gentoo"],
  },
  {
    id: 3,
    name: "Alacritty",
    selected: false,
    type: "package",
    category: "Utilities",
    description: "A fast, cross-platform, OpenGL terminal emulator.",
    why: "GPU-accelerated rendering makes it one of the fastest terminal emulators.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "ubuntu", "debian", "mint", "pop", "fedora", "nixos", "gentoo"],
  },
  {
    id: 4,
    name: "Neovim",
    selected: false,
    type: "package",
    category: "Utilities",
    description: "Hyperextensible Vim-based text editor focused on extensibility.",
    why: "Modern Vim with Lua config, built-in LSP, and a huge plugin ecosystem.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "ubuntu", "debian", "mint", "pop", "fedora", "rhel", "nixos", "gentoo"],
  },
  {
    id: 5,
    name: "i3wm",
    selected: false,
    type: "configuration",
    category: "Interface & Tiling",
    description: "A tiling window manager for X11 that is lightweight and configurable.",
    why: "Great for beginners in tiling WMs. Simple config file and huge community.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "ubuntu", "debian", "mint", "pop", "fedora", "rhel", "nixos", "gentoo"],
  },
  {
    id: 6,
    name: "Firefox",
    selected: false,
    type: "package",
    category: "Utilities",
    description: "A free and open-source web browser developed by Mozilla.",
    why: "Privacy-focused, open source, and highly customizable with extensions.",
    distros: ["arch", "manjaro", "endeavouros", "garuda", "ubuntu", "debian", "mint", "pop", "fedora", "rhel", "nixos", "gentoo"],
  },
];

// Count selected packages
export function countSelected(list) {
  return list.filter((p) => p.selected).length;
}

// Filter packages that work on a specific distro
export function filterByDistro(list, distroId) {
  return list.filter((p) => p.distros && p.distros.includes(distroId));
}