export const packages = [
  { id: 1, name: "Hyprland", selected: true, type: "configuration", category: "Interface & Tiling" },
  { id: 2, name: "Zsh", selected: true, type: "script", category: "System packages" },
  { id: 3, name: "Alacritty", selected: false, type: "package", category: "Utilities" },
];

// Count selected packages
export function countSelected(list) {
  return list.filter((p) => p.selected).length;
}