// Package data - same 3 items as in README
const packages = [
    { id: 1, name: "Hyprland", selected: true,  type: "configuration" },
    { id: 2, name: "Zsh",      selected: true,  type: "script" },
    { id: 3, name: "Alacritty", selected: false, type: "package" },
];

// Allowed type values
const TYPES = ["package", "configuration", "script"];

console.log("Packages loaded:", packages.length);

// List all package names
function listNames(list) {
    return list.map((pkg) => pkg.name);
}

// Count how many packages are selected
function countSelected(list) {
    return list.filter((pkg) => pkg.selected).length;
}

// Search packages by name (case insensitive)
function searchByName(list, text) {
    return list.filter((pkg) =>
        pkg.name.toLowerCase().includes(text.toLowerCase())
    );
}

// quick tests
console.log("Names:", listNames(packages).join(", "));
console.log("Selected:", countSelected(packages));
console.log("Search 'hypr':", listNames(searchByName(packages, "hypr")).join(", "));
