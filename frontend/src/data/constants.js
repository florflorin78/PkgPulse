export const TYPES = ["package", "configuration", "script"];
export const CATEGORIES = [
  "Interface & Tiling",
  "Customization",
  "Terminal & Shell",
  "Development",
  "Internet",
  "Multimedia",
  "Office & Graphics",
  "Gaming",
  "Security & Network",
  "Apps",
  "System packages",
];
export const MANAGERS = ["apt", "dnf", "zypper", "pacman"];
export const NAME_MAX = 100;

// the look of each category: emoji and two colors for the gradient
export const CATEGORY_STYLES = {
  "Interface & Tiling": { emoji: "🪟", from: "#7c3aed", to: "#db2777" },
  Customization: { emoji: "🎨", from: "#db2777", to: "#f97316" },
  "Terminal & Shell": { emoji: "💻", from: "#111827", to: "#059669" },
  Development: { emoji: "🧑‍💻", from: "#2563eb", to: "#7c3aed" },
  Internet: { emoji: "🌐", from: "#0ea5e9", to: "#2563eb" },
  Multimedia: { emoji: "🎬", from: "#f97316", to: "#dc2626" },
  "Office & Graphics": { emoji: "📄", from: "#16a34a", to: "#0ea5e9" },
  Gaming: { emoji: "🎮", from: "#4f46e5", to: "#9333ea" },
  "Security & Network": { emoji: "🔒", from: "#475569", to: "#0f172a" },
  Apps: { emoji: "📦", from: "#0d9488", to: "#2563eb" },
  "System packages": { emoji: "⚙️", from: "#64748b", to: "#334155" },
};
