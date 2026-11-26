import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BAR_POSITIONS,
  BAR_STYLES,
  DISPLAY_PACKAGES,
  FONTS,
  LAYOUTS,
  PIECES,
  PRESETS,
  START_RICE,
  WIDGETS,
  WIDGET_PACKAGES,
  getPiece,
} from "../data/customize.js";
import { isAvailable } from "../helpers.js";
import DesktopPreview from "../components/DesktopPreview.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./CustomizePage.module.css";

const TABS = [
  { id: "look", label: "🎨 Look" },
  { id: "bar", label: "📊 Bar" },
  { id: "windows", label: "🪟 Windows" },
  { id: "apps", label: "🧰 Apps" },
];

// the groups of pieces shown in each tab
const SLOTS = {
  look: [
    { id: "wallpaper", label: "Wallpaper" },
    { id: "colors", label: "Color scheme" },
  ],
  bar: [{ id: "bar", label: "Bar program" }],
  windows: [
    { id: "wm", label: "Window manager" },
    { id: "terminal", label: "Terminal" },
    { id: "launcher", label: "App launcher" },
  ],
  apps: [
    { id: "shell", label: "Shell" },
    { id: "files", label: "File manager" },
    { id: "notifier", label: "Notifications" },
  ],
};

function removeFromZones(zones, id) {
  return {
    left: zones.left.filter((w) => w !== id),
    center: zones.center.filter((w) => w !== id),
    right: zones.right.filter((w) => w !== id),
  };
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// the Gallery can open this page with a preset
function startRice(state) {
  const preset = PRESETS.find((p) => state && p.id === state.preset);
  return preset ? preset.rice : START_RICE;
}

export default function CustomizePage({ packages, distro, onSelectNames }) {
  usePageTitle("Customize");
  const location = useLocation();
  const [rice, setRice] = useState(() => startRice(location.state));
  const [tab, setTab] = useState("look");
  const [zone, setZone] = useState("right");

  function setOption(key, value) {
    setRice((prev) => ({ ...prev, [key]: value }));
  }

  function placePiece(id) {
    const piece = getPiece(id);
    if (!piece) return;
    setOption(piece.slot, piece.id);
  }

  function addWidget(toZone, id) {
    setRice((prev) => {
      const zones = removeFromZones(prev.zones, id);
      return { ...prev, zones: { ...zones, [toZone]: [...zones[toZone], id] } };
    });
  }

  function removeWidget(id) {
    setRice((prev) => ({ ...prev, zones: removeFromZones(prev.zones, id) }));
  }

  // click on a widget of the list: add it to the chosen zone, or remove it
  function handleWidgetClick(id) {
    const inBar = [...rice.zones.left, ...rice.zones.center, ...rice.zones.right].includes(id);
    if (inBar) {
      removeWidget(id);
    } else {
      addWidget(zone, id);
    }
  }

  function handlePieceDragStart(e, id) {
    e.dataTransfer.setData("text/plain", "piece:" + id);
  }

  function handleWidgetDragStart(e, id) {
    e.dataTransfer.setData("text/plain", "widget:" + id);
  }

  function handleRandom() {
    const wmPiece = pickRandom(PIECES.filter((p) => p.slot === "wm"));
    // only pieces that run on the display server of the window manager
    function pickFor(slot) {
      const fits = PIECES.filter(
        (p) => p.slot === slot && (p.display === "both" || p.display === wmPiece.display)
      );
      return pickRandom(fits).id;
    }
    const allWidgets = WIDGETS.map((w) => w.id);
    const chosen = allWidgets.filter(() => Math.random() < 0.4);
    setRice({
      wallpaper: pickRandom(PIECES.filter((p) => p.slot === "wallpaper")).id,
      colors: pickRandom(PIECES.filter((p) => p.slot === "colors")).id,
      wm: wmPiece.id,
      bar: pickFor("bar"),
      terminal: pickFor("terminal"),
      launcher: pickFor("launcher"),
      shell: pickRandom(PIECES.filter((p) => p.slot === "shell")).id,
      files: pickRandom(PIECES.filter((p) => p.slot === "files")).id,
      notifier: pickFor("notifier"),
      barPosition: pickRandom(BAR_POSITIONS).id,
      barStyle: pickRandom(BAR_STYLES).id,
      barSize: randomNumber(22, 44),
      zones: {
        left: chosen.slice(0, 2),
        center: chosen.slice(2, 3),
        right: chosen.slice(3, 7),
      },
      layout: pickRandom(LAYOUTS).id,
      windowCount: randomNumber(1, 4),
      gap: randomNumber(0, 20),
      radius: randomNumber(0, 20),
      border: randomNumber(0, 5),
      opacity: randomNumber(50, 100),
      font: pickRandom(FONTS).id,
    });
  }

  const wm = getPiece(rice.wm);
  const bar = getPiece(rice.bar);
  const terminal = getPiece(rice.terminal);
  const launcher = getPiece(rice.launcher);
  const shell = getPiece(rice.shell);
  const files = getPiece(rice.files);
  const notifier = getPiece(rice.notifier);

  const barWidgets = [...rice.zones.left, ...rice.zones.center, ...rice.zones.right];

  // the packages this desktop needs: the pieces, the tools of the widgets and the extras
  const widgetNames = barWidgets
    .filter((id) => WIDGET_PACKAGES[id] !== undefined)
    .map((id) => WIDGET_PACKAGES[id]);
  const names = [
    ...new Set([
      wm.name,
      bar.name,
      terminal.name,
      launcher.name,
      shell.name,
      files.name,
      notifier.name,
      ...widgetNames,
      ...DISPLAY_PACKAGES[wm.display],
    ]),
  ];

  // check if the pieces work together
  const displayWarnings = [bar, terminal, launcher, notifier]
    .filter((piece) => piece.display !== "both" && piece.display !== wm.display)
    .map((piece) => `${piece.name} needs ${piece.display}, but ${wm.name} runs on ${wm.display}.`);

  const missingNames = names.filter((name) => {
    const pkg = packages.find((p) => p.name === name);
    return distro && pkg && !isAvailable(pkg, distro);
  });
  const repoWarnings = missingNames.map(
    (name) => `${name} is not in the official ${distro.name} repos.`
  );

  const warnings = [...displayWarnings, ...repoWarnings];

  function renderPieces(slot) {
    return (
      <div key={slot.id}>
        <h3>{slot.label}</h3>
        <div className={styles.chips}>
          {PIECES.filter((p) => p.slot === slot.id).map((p) => (
            <div
              key={p.id}
              className={rice[slot.id] === p.id ? `${styles.chip} ${styles.active}` : styles.chip}
              draggable="true"
              onDragStart={(e) => handlePieceDragStart(e, p.id)}
              onClick={() => placePiece(p.id)}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderSlider(label, key, min, max, unit) {
    return (
      <label className={styles.slider}>
        <span>
          {label}: <strong>{rice[key]}{unit}</strong>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={rice[key]}
          onChange={(e) => setOption(key, Number(e.target.value))}
        />
      </label>
    );
  }

  return (
    <>
      <h2>Customize your desktop</h2>
      <p className="tip">
        Build your own desktop. Click a piece, or drag it onto the desktop. Drag the bar
        widgets into the left, center or right part of the bar.
      </p>

      <div className={styles.presets}>
        {PRESETS.map((preset) => (
          <button key={preset.id} className={styles.preset} onClick={() => setRice(preset.rice)}>
            <span className={styles.presetEmoji}>{preset.emoji}</span>
            {preset.name}
          </button>
        ))}
        <button className={styles.preset} onClick={handleRandom}>
          <span className={styles.presetEmoji}>🎲</span>
          Surprise me
        </button>
        <button className={styles.preset} onClick={() => setRice(START_RICE)}>
          <span className={styles.presetEmoji}>↩️</span>
          Reset
        </button>
      </div>

      <div className={styles.customize}>
        <section className={`card ${styles.controls}`}>
          <div className={styles.tabs}>
            {TABS.map((t) => (
              <button
                key={t.id}
                className={tab === t.id ? `${styles.tab} ${styles.activeTab}` : styles.tab}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {SLOTS[tab].map((slot) => renderPieces(slot))}

          {tab === "look" && (
            <>
              <h3>Style</h3>
              {renderSlider("Gaps between windows", "gap", 0, 30, "px")}
              {renderSlider("Rounded corners", "radius", 0, 24, "px")}
              {renderSlider("Border width", "border", 0, 6, "px")}
              {renderSlider("Window opacity", "opacity", 30, 100, "%")}
              <h3>Font</h3>
              <div className={styles.chips}>
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    className={rice.font === f.id ? `${styles.chip} ${styles.active}` : styles.chip}
                    onClick={() => setOption("font", f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "bar" && (
            <>
              <h3>Position</h3>
              <div className={styles.chips}>
                {BAR_POSITIONS.map((b) => (
                  <button
                    key={b.id}
                    className={
                      rice.barPosition === b.id ? `${styles.chip} ${styles.active}` : styles.chip
                    }
                    onClick={() => setOption("barPosition", b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <h3>Style</h3>
              <div className={styles.chips}>
                {BAR_STYLES.map((b) => (
                  <button
                    key={b.id}
                    className={
                      rice.barStyle === b.id ? `${styles.chip} ${styles.active}` : styles.chip
                    }
                    onClick={() => setOption("barStyle", b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              {renderSlider("Bar size", "barSize", 20, 56, "px")}

              <h3>Widgets</h3>
              <p className="muted">
                Add to:{" "}
                {["left", "center", "right"].map((z) => (
                  <label key={z} className={styles.radio}>
                    <input
                      type="radio"
                      name="zone"
                      checked={zone === z}
                      onChange={() => setZone(z)}
                    />
                    {z}
                  </label>
                ))}
              </p>
              <div className={styles.chips}>
                {WIDGETS.map((w) => (
                  <button
                    key={w.id}
                    className={
                      barWidgets.includes(w.id) ? `${styles.chip} ${styles.active}` : styles.chip
                    }
                    draggable="true"
                    onDragStart={(e) => handleWidgetDragStart(e, w.id)}
                    onClick={() => handleWidgetClick(w.id)}
                    data-testid="widget-chip"
                  >
                    {w.icon} {w.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {tab === "windows" && (
            <>
              <h3>Layout</h3>
              <div className={styles.chips}>
                {LAYOUTS.map((l) => (
                  <button
                    key={l.id}
                    className={rice.layout === l.id ? `${styles.chip} ${styles.active}` : styles.chip}
                    onClick={() => setOption("layout", l.id)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              {renderSlider("Open windows", "windowCount", 1, 4, "")}
            </>
          )}
        </section>

        <div className={styles.preview}>
          <DesktopPreview
            rice={rice}
            distroName={distro ? distro.name : "Linux"}
            onDropPiece={placePiece}
            onDropWidget={addWidget}
            onRemoveWidget={removeWidget}
          />

          {warnings.length === 0 ? (
            <p className="ok">✓ All pieces work together.</p>
          ) : (
            <ul className={styles.warningList}>
              {warnings.map((w) => (
                <li key={w}>⚠ {w}</li>
              ))}
            </ul>
          )}

          <p className="muted">Packages for this desktop: {names.join(", ")}</p>

          <button className="btn-primary" onClick={() => onSelectNames(names)}>
            Add these packages to My Setup
          </button>
        </div>
      </div>
    </>
  );
}
