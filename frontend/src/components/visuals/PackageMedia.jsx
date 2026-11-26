import { useState } from "react";
import {
  APP_KINDS,
  CATEGORY_KINDS,
  DEMOS,
  DESKTOP_KINDS,
  PATTERNS,
  TERMINAL_EMULATORS,
} from "../../data/demos.js";
import { getCategoryStyle } from "../../helpers.js";
import AppDemo from "./AppDemo.jsx";
import DesktopDemo from "./DesktopDemo.jsx";
import TerminalDemo from "./TerminalDemo.jsx";
import VideoPlayer from "./VideoPlayer.jsx";
import styles from "./PackageMedia.module.css";

const TERMINAL_CATEGORIES = ["Terminal & Shell", "Development", "System packages", "Security & Network"];
const DESKTOP_CATEGORIES = ["Interface & Tiling", "Customization"];

// picks the animation that shows what the package does
function getDemo(pkg, look) {
  const terminal = DEMOS[pkg.install] || (TERMINAL_EMULATORS.includes(pkg.install) ? DEMOS.fastfetch : null);
  if (terminal) {
    return <TerminalDemo command={terminal.command} lines={terminal.lines} effect={terminal.effect} />;
  }

  if (DESKTOP_KINDS[pkg.install] || DESKTOP_CATEGORIES.includes(pkg.category)) {
    const kind = DESKTOP_KINDS[pkg.install] || "wm";
    return <DesktopDemo kind={kind} name={pkg.name} from={look.from} to={look.to} />;
  }

  if (APP_KINDS[pkg.name] || pkg.flatpak || !TERMINAL_CATEGORIES.includes(pkg.category)) {
    const kind = APP_KINDS[pkg.name] || CATEGORY_KINDS[pkg.category] || "files";
    return <AppDemo kind={kind} name={pkg.name} />;
  }

  const help = [
    `Usage: ${pkg.install} [OPTIONS]`,
    { t: pkg.description, c: "#9ca3af" },
    "  -h, --help       show this help",
    "  -V, --version    print the version",
  ];
  return <TerminalDemo command={`${pkg.install} --help`} lines={help} />;
}

export default function PackageMedia({ pkg, big }) {
  // a new key starts the animation again
  const [run, setRun] = useState(0);
  const look = getCategoryStyle(pkg.category);
  const size = big ? `${styles.box} ${styles.big}` : styles.box;

  if (pkg.video) {
    return <VideoPlayer id={pkg.video} title={`${pkg.name} video`} big={big} />;
  }

  if (pkg.image) {
    return <img className={size} src={`/img/${pkg.image}`} alt={`${pkg.name} screenshot`} loading="lazy" />;
  }

  const background = {
    background: `${PATTERNS[pkg.category] || PATTERNS.Apps}, linear-gradient(135deg, ${look.from}, ${look.to})`,
  };

  return (
    <div className={size} style={background}>
      <div key={run} className={styles.stage}>
        {getDemo(pkg, look)}
      </div>
      <button className={styles.replay} onClick={() => setRun(run + 1)} aria-label={`Replay the ${pkg.name} animation`}>
        ↻ Replay
      </button>
    </div>
  );
}
