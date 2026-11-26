import { useState } from "react";
import { LAYOUTS, WIDGETS, getPiece } from "../data/customize.js";
import styles from "./DesktopPreview.module.css";

const ZONES = ["left", "center", "right"];

function getWidget(id) {
  return WIDGETS.find((w) => w.id === id);
}

export default function DesktopPreview({
  rice,
  distroName,
  onDropPiece,
  onDropWidget,
  onRemoveWidget,
}) {
  const [isOver, setIsOver] = useState(false);

  const wallpaper = getPiece(rice.wallpaper);
  const colors = getPiece(rice.colors);
  const wm = getPiece(rice.wm);
  const bar = getPiece(rice.bar);
  const terminal = getPiece(rice.terminal);
  const launcher = getPiece(rice.launcher);
  const shell = getPiece(rice.shell);
  const files = getPiece(rice.files);
  const notifier = getPiece(rice.notifier);

  const vertical = rice.barPosition === "left" || rice.barPosition === "right";
  const layout = LAYOUTS.find((l) => l.id === rice.layout);
  const count = rice.layout === "monocle" ? 1 : rice.windowCount;
  const places = layout.places[count];

  const windows = [
    {
      title: terminal.name,
      lines: [`[${shell.name}] user@linux:~$ fastfetch`, `🐧 ${distroName} · ${wm.name}`],
    },
    { title: launcher.name, lines: ["🔍 Type to search apps..."] },
    { title: files.name, lines: ["📁 Documents", "📁 Downloads", "📁 Pictures"] },
    { title: "Browser", lines: ["🌐 pkgpulse.dev"] },
  ];

  // without this the browser blocks the drop
  function handleDragOver(e) {
    e.preventDefault();
    setIsOver(true);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsOver(false);
    const data = e.dataTransfer.getData("text/plain");
    if (data.startsWith("piece:")) {
      onDropPiece(data.replace("piece:", ""));
    }
  }

  function handleZoneDrop(e, zone) {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
    const data = e.dataTransfer.getData("text/plain");
    if (data.startsWith("widget:")) {
      onDropWidget(zone, data.replace("widget:", ""));
    }
  }

  function handleWidgetDragStart(e, id) {
    e.dataTransfer.setData("text/plain", "widget:" + id);
  }

  let barClass = vertical ? `${styles.bar} ${styles.barV}` : `${styles.bar} ${styles.barH}`;
  if (rice.barStyle === "floating") barClass += ` ${styles.floating}`;
  if (rice.barStyle === "islands") barClass += ` ${styles.islands}`;

  const barSize = vertical ? { width: rice.barSize + 40 } : { height: rice.barSize };

  const desktopStyle = {
    background: wallpaper.value,
    fontFamily: rice.font,
    "--rice": colors.value,
    "--gap": `${rice.gap}px`,
    "--radius": `${rice.radius}px`,
    "--border": `${rice.border}px`,
    "--opacity": rice.opacity / 100,
  };

  const toastOnTop = rice.barPosition === "bottom";
  const toastStyle = rice.barPosition === "right" ? { right: rice.barSize + 60 } : undefined;

  return (
    <div
      className={`${styles.desktop} ${styles[rice.barPosition]} ${isOver ? styles.over : ""}`}
      style={desktopStyle}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      data-testid="desktop"
    >
      <div className={barClass} style={barSize} title={`${bar.name} bar`}>
        {ZONES.map((zone) => (
          <div
            key={zone}
            className={styles.zone}
            onDragOver={handleDragOver}
            onDrop={(e) => handleZoneDrop(e, zone)}
            data-testid={`zone-${zone}`}
          >
            {rice.zones[zone].map((id) => {
              const widget = getWidget(id);
              return (
                <button
                  key={id}
                  className={styles.widget}
                  draggable="true"
                  onDragStart={(e) => handleWidgetDragStart(e, id)}
                  onClick={() => onRemoveWidget(id)}
                  title={`${widget.label} (click to remove)`}
                  data-testid="bar-widget"
                >
                  {widget.icon}
                  {!vertical && widget.text !== "" && ` ${widget.text}`}
                </button>
              );
            })}
            {rice.zones[zone].length === 0 && <span className={styles.hint}>{zone}</span>}
          </div>
        ))}
      </div>

      <div className={styles.windows}>
        {places.map((place, i) => (
          <div
            key={i}
            className={styles.window}
            style={{
              gridColumn: `${place[0]} / ${place[1]}`,
              gridRow: `${place[2]} / ${place[3]}`,
              zIndex: i,
            }}
          >
            <p className={styles.title}>{windows[i].title}</p>
            {windows[i].lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {rice.layout === "monocle" && (
              <p className={styles.title}>1 of {rice.windowCount}</p>
            )}
          </div>
        ))}
      </div>

      <p
        className={toastOnTop ? `${styles.toast} ${styles.toastTop}` : styles.toast}
        style={toastStyle}
      >
        🔔 {notifier.name}: Welcome to {distroName}
      </p>
    </div>
  );
}
