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

// Get the next available id (max existing + 1)
function nextId(list) {
    return list.reduce((max, pkg) => Math.max(max, pkg.id), 0) + 1;
}

// Add a new package with validation
function addPackage(list, name, type = "package") {
    const cleanName = name.trim();
    if (cleanName === "") {
        console.log("Eroare: numele pachetului nu poate fi gol.");
        return list;
    }
    if (!TYPES.includes(type)) {
        console.log("Eroare: tipul '" + type + "' nu este valid. Tipuri permise:", TYPES.join(", "));
        return list;
    }
    const newPkg = {
        id: nextId(list),
        name: cleanName,
        selected: false,
        type: type,
    };
    return [...list, newPkg];
}

// Toggle the selected state of a package
function toggleSelected(list, id) {
    return list.map((pkg) =>
        pkg.id === id ? { ...pkg, selected: !pkg.selected } : pkg
    );
}

// Delete a package by id
function deletePackage(list, id) {
    return list.filter((pkg) => pkg.id !== id);
}

// ============================
//  Console tests
// ============================

console.log("--- Citire ---");
console.log("Nume:", listNames(packages).join(", "));
console.log("Selectate:", countSelected(packages));
console.log("Căutare 'hypr':", listNames(searchByName(packages, "hypr")).join(", "));

console.log("--- Adăugare ---");
let lista = addPackage(packages, "Neovim", "package");
console.log("Lista nouă:", lista.length, "pachete");
console.log("Originalul a rămas cu:", packages.length, "pachete");

console.log("--- Modificare și ștergere ---");
lista = toggleSelected(lista, 1);
console.log("După toggle id 1, selectate:", countSelected(lista));
lista = deletePackage(lista, 3);
console.log("După ștergerea id 3:", listNames(lista).join(", "));

console.log("--- Validare ---");
addPackage(lista, "   ");
addPackage(lista, "Test", "invalid-type");
