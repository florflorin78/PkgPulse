// Linux distributions data
// each distro has a package manager family for later use in script generation
export const distros = [
  { id: "arch", name: "Arch Linux", info: "Pacman / AUR / Ricing", pkgManager: "pacman" },
  { id: "manjaro", name: "Manjaro", info: "Arch Family", pkgManager: "pacman" },
  { id: "endeavouros", name: "EndeavourOS", info: "Arch Family", pkgManager: "pacman" },
  { id: "garuda", name: "Garuda Linux", info: "Arch Family / Gaming", pkgManager: "pacman" },
  { id: "ubuntu", name: "Ubuntu", info: "APT / Debian", pkgManager: "apt" },
  { id: "debian", name: "Debian", info: "APT Family / Stable", pkgManager: "apt" },
  { id: "mint", name: "Linux Mint", info: "APT Family / Desktop", pkgManager: "apt" },
  { id: "pop", name: "Pop!_OS", info: "APT / Developer Focused", pkgManager: "apt" },
  { id: "fedora", name: "Fedora", info: "DNF / RPM / Modern", pkgManager: "dnf" },
  { id: "rhel", name: "RHEL", info: "Enterprise Linux", pkgManager: "dnf" },
  { id: "nixos", name: "NixOS", info: "Declarative Config", pkgManager: "nix" },
  { id: "gentoo", name: "Gentoo", info: "Source-based", pkgManager: "emerge" },
];
