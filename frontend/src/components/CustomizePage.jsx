import { useState } from "react";
import { isAvailable } from "../helpers.js";

const SLOTS = [
  { id: "wallpaper", label: "Wallpaper" },
  { id: "colors", label: "Color scheme" },
  { id: "wm", label: "Window manager" },
  { id: "bar", label: "Top bar" },
  { id: "terminal", label: "Terminal" },
  { id: "launcher", label: "App launcher" },
];

// display: wayland, x11 or both
const PIECES = [
  { id: "sunset", slot: "wallpaper", name: "Sunset", value: "linear-gradient(135deg, #f97316, #db2777)" },
  { id: "ocean", slot: "wallpaper", name: "Ocean", value: "linear-gradient(135deg, #0ea5e9, #1e3a8a)" },
  { id: "forest", slot: "wallpaper", name: "Forest", value: "linear-gradient(135deg, #4ade80, #14532d)" },
  { id: "night", slot: "wallpaper", name: "Night", value: "linear-gradient(135deg, #312e81, #020617)" },
  { id: "catppuccin", slot: "colors", name: "Catppuccin", value: "#f5c2e7" },
  { id: "nord", slot: "colors", name: "Nord", value: "#88c0d0" },
  { id: "gruvbox", slot: "colors", name: "Gruvbox", value: "#fe8019" },
  { id: "hyprland", slot: "wm", name: "Hyprland", display: "wayland" },
  { id: "sway", slot: "wm", name: "Sway", display: "wayland" },
  { id: "bspwm", slot: "wm", name: "BSPWM", display: "x11" },
  { id: "waybar", slot: "bar", name: "Waybar", display: "wayland" },
  { id: "polybar", slot: "bar", name: "Polybar", display: "x11" },
  { id: "kitty", slot: "terminal", name: "Kitty", display: "both" },
  { id: "alacritty", slot: "terminal", name: "Alacritty", display: "both" },
  { id: "foot", slot: "terminal", name: "Foot", display: "wayland" },
  { id: "rofi", slot: "launcher", name: "Rofi", display: "both" },
  { id: "wofi", slot: "launcher", name: "Wofi", display: "wayland" },
];

const START_RICE = {
  wallpaper: "ocean",
  colors: "catppuccin",
  wm: "hyprland",
  bar: "waybar",
  terminal: "kitty",
  launcher: "rofi",
};

function getPiece(id) {
  return PIECES.find((p) => p.id === id);
}

export default function CustomizePage({ packages, distro, onSelectNames }) {
  const [rice, setRice] = useState(START_RICE);
  const [isOver, setIsOver] = useState(false);

  function placePiece(id) {
    const piece = getPiece(id);
    if (!piece) return;
    setRice((prev) => ({ ...prev, [piece.slot]: piece.id }));
  }

  // drag and drop
  function handleDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
  }

  // without this the browser blocks the drop
  function handleDragOver(e) {
    e.preventDefault();
    setIsOver(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    placePiece(e.dataTransfer.getData("text/plain"));
  }

  const wallpaper = getPiece(rice.wallpaper);
  const colors = getPiece(rice.colors);
  const wm = getPiece(rice.wm);
  const bar = getPiece(rice.bar);
  const terminal = getPiece(rice.terminal);
  const launcher = getPiece(rice.launcher);

  // check if the pieces work together
  const warnings = [];
  for (const piece of [bar, terminal, launcher]) {
    if (piece.display !== "both" && piece.display !== wm.display) {
      warnings.push(`${piece.name} needs ${piece.display}, but ${wm.name} runs on ${wm.display}.`);
    }
  }
  const names = [wm.name, bar.name, terminal.name, launcher.name];
  if (distro) {
    for (const name of names) {
      const pkg = packages.find((p) => p.name === name);
      if (pkg && !isAvailable(pkg, distro)) {
        warnings.push(`${name} is not in the official ${distro.name} repos.`);
      }
    }
  }

  return (
    <>
      <h2>Customize your desktop</h2>
      <p className="tip">
        Drag a piece onto the desktop (or just click it). This is called{" "}
        <strong>ricing</strong>: making Linux look exactly how you want.
      </p>

      <div className="customize">
        <div className="pieces">
          {SLOTS.map((slot) => (
            <div key={slot.id}>
              <h3>{slot.label}</h3>
              <div className="piece-row">
                {PIECES.filter((p) => p.slot === slot.id).map((p) => (
                  <div
                    key={p.id}
                    className={rice[slot.id] === p.id ? "piece active" : "piece"}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, p.id)}
                    onClick={() => placePiece(p.id)}
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            className={isOver ? "desktop over" : "desktop"}
            style={{ background: wallpaper.value, "--rice": colors.value }}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
          >
            <div className="fake-bar">
              <span>{bar.name}</span>
              <span>1 2 3</span>
              <span>12:00</span>
            </div>
            <div className={`windows wm-${wm.id}`}>
              <div className="fake-window">
                <p className="window-title">{terminal.name}</p>
                <p>user@linux:~$ fastfetch</p>
                <p>🐧 {distro ? distro.name : "Linux"} · {wm.name}</p>
              </div>
              <div className="fake-window">
                <p className="window-title">{launcher.name}</p>
                <p>🔍 Type to search apps...</p>
              </div>
            </div>
          </div>

          {warnings.length === 0 ? (
            <p className="ok">✓ All pieces work together.</p>
          ) : (
            <ul className="warning-list">
              {warnings.map((w) => (
                <li key={w}>⚠ {w}</li>
              ))}
            </ul>
          )}

          <button className="btn-primary" onClick={() => onSelectNames(names)}>
            Add these packages to My Setup
          </button>
        </div>
      </div>
    </>
  );
}
