// Package data - same 3 items as in README
const packages = [
    { id: 1, name: "Hyprland", selected: true,  type: "configuration" },
    { id: 2, name: "Zsh",      selected: true,  type: "script" },
    { id: 3, name: "Alacritty", selected: false, type: "package" },
];

// Allowed type values
const TYPES = ["package", "configuration", "script"];

console.log("Packages loaded:", packages.length);
