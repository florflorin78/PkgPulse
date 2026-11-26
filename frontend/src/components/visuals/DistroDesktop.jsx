import Mascot from "./Mascot.jsx";
import styles from "./DistroDesktop.module.css";

// the look of the default desktop of every distro
const DESKTOP_STYLES = {
  mint: "cinnamon",
  lmde: "cinnamon",
  ubuntu: "ubuntu",
  fedora: "gnome",
  debian: "gnome",
  rocky: "gnome",
  alma: "gnome",
  opensuse: "kde",
  leap: "kde",
  kubuntu: "kde",
  manjaro: "kde",
  endeavouros: "kde",
  nobara: "kde",
  garuda: "kde",
  cachy: "kde",
  pop: "cosmic",
  elementary: "pantheon",
  zorin: "zorin",
  mx: "xfceSide",
  kali: "xfce",
  arch: "tty",
  omarchy: "hyprland",
};

function wallpaperFor(style, color) {
  if (style === "kde") return `conic-gradient(from 210deg at 30% 110%, ${color}, #0f172a, ${color})`;
  if (style === "cinnamon") return `radial-gradient(ellipse at 50% 120%, ${color} 0%, transparent 60%), linear-gradient(160deg, #1f2937, ${color})`;
  if (style === "pantheon") return `linear-gradient(180deg, #fde68a, ${color} 55%, #1e293b)`;
  if (style === "cosmic") return `radial-gradient(circle at 20% 80%, ${color}, transparent 40%), radial-gradient(circle at 80% 25%, #f472b6, transparent 35%), #0b1020`;
  if (style === "hyprland") return `radial-gradient(circle at 75% 30%, ${color}, transparent 45%), linear-gradient(135deg, #1e1e2e, #313244)`;
  if (style === "zorin") return `radial-gradient(ellipse at 50% 110%, ${color}, #0c4a6e 70%)`;
  if (style === "xfce" || style === "xfceSide") return `linear-gradient(180deg, #0f172a, ${color})`;
  if (style === "tty") return "#000";
  return `radial-gradient(circle at 70% 30%, ${color} 0%, transparent 55%), linear-gradient(160deg, #0f172a, ${color})`;
}

const FOLDERS = ["Documents", "Music", "Pictures", "Videos", "Downloads", "Code"];

function TopBar({ left, center }) {
  return (
    <div className={styles.topBar}>
      <span>{left}</span>
      <span>{center}</span>
      <span>📶 🔊 🔋</span>
    </div>
  );
}

function BottomPanel({ distro, label }) {
  return (
    <div className={styles.bottomPanel}>
      <span className={styles.start}>
        <Mascot id={distro.id} color={distro.color} size={14} still /> {label}
      </span>
      <span className={styles.tasks}>
        <span>📁</span>
        <span>🌐</span>
        <span>💻</span>
      </span>
      <span>🔊 📶 12:00</span>
    </div>
  );
}

function Dock() {
  return (
    <div className={styles.dock}>
      <span>🌐</span>
      <span>📁</span>
      <span>💻</span>
      <span>🎵</span>
      <span>⚙️</span>
    </div>
  );
}

function Windows({ distro, tiled }) {
  return (
    <div className={tiled ? `${styles.area} ${styles.tiled}` : styles.area}>
      <div className={`${styles.win} ${styles.files}`}>
        <div className={styles.titleBar}>Files</div>
        <div className={styles.folders}>
          {FOLDERS.map((f) => (
            <span key={f} className={styles.folder}>
              📁
              <small>{f}</small>
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.win} ${styles.term}`}>
        <div className={styles.titleBar}>Terminal</div>
        <div className={styles.fetch}>
          <Mascot id={distro.id} color={distro.color} size={40} still />
          <div>
            <p className={styles.user}>user@{distro.id}</p>
            <p>OS: {distro.name}</p>
            <p>DE: {distro.desktop}</p>
            <p>Pkg: {distro.manager}</p>
            <p className={styles.colors}>
              <span style={{ background: "#ef4444" }}></span>
              <span style={{ background: "#22c55e" }}></span>
              <span style={{ background: "#eab308" }}></span>
              <span style={{ background: "#3b82f6" }}></span>
              <span style={{ background: distro.color }}></span>
            </p>
          </div>
        </div>
      </div>
      <span className={styles.cursor}>➤</span>
    </div>
  );
}

function Tty({ distro }) {
  return (
    <div className={styles.tty}>
      <p>
        {distro.name} 6.17.9 (tty1)
      </p>
      <p className={styles.l1}>{distro.id} login: user</p>
      <p className={styles.l2}>Password:</p>
      <p className={styles.l3}>[user@{distro.id} ~]$ archinstall</p>
      <p className={styles.l4}>
        [user@{distro.id} ~]$ <span className={styles.blinker}>▋</span>
      </p>
    </div>
  );
}

// where the three bubbles appear on the screen
const CALLOUT_PLACES = [
  { left: "6%", top: "20%" },
  { right: "6%", top: "14%" },
  { left: "30%", bottom: "14%" },
];

export default function DistroDesktop({ distro, callouts }) {
  const style = DESKTOP_STYLES[distro.id] || "gnome";

  return (
    <div
      className={`${styles.screen} ${styles[style] || ""}`}
      style={{ background: wallpaperFor(style, distro.color), "--accent": distro.color }}
      aria-label={`How ${distro.name} looks`}
      role="img"
    >
      {style === "tty" && <Tty distro={distro} />}

      {callouts &&
        distro.features &&
        distro.features.map((feature, i) => (
          <span
            key={feature}
            className={styles.callout}
            style={{ ...CALLOUT_PLACES[i], animationDelay: `${1.6 + i * 0.6}s` }}
          >
            ✦ {feature}
          </span>
        ))}

      {(style === "gnome" || style === "ubuntu") && (
        <>
          <TopBar left="Activities" center="Thu 12:00" />
          <div className={styles.row}>
            {style === "ubuntu" && (
              <div className={styles.sideDock}>
                <span>🌐</span>
                <span>📁</span>
                <span>💻</span>
                <span>🛍️</span>
              </div>
            )}
            <Windows distro={distro} />
          </div>
        </>
      )}

      {(style === "kde" || style === "cinnamon" || style === "zorin") && (
        <>
          <Windows distro={distro} />
          <BottomPanel distro={distro} label={style === "cinnamon" ? "Menu" : ""} />
        </>
      )}

      {style === "xfce" && (
        <>
          <TopBar left="Applications" center="12:00" />
          <Windows distro={distro} />
          <Dock />
        </>
      )}

      {style === "xfceSide" && (
        <div className={styles.row}>
          <div className={styles.sidePanel}>
            <Mascot id={distro.id} color={distro.color} size={16} still />
            <span>📁</span>
            <span>🌐</span>
            <span>💻</span>
            <span className={styles.sideClock}>12:00</span>
          </div>
          <Windows distro={distro} />
        </div>
      )}

      {(style === "pantheon" || style === "cosmic") && (
        <>
          <TopBar left={style === "cosmic" ? "Workspaces  Apps" : "Applications"} center="Thu 12:00" />
          <Windows distro={distro} />
          <Dock />
        </>
      )}

      {style === "hyprland" && (
        <>
          <div className={styles.waybar}>
            <span>● ● ○ ○</span>
            <span>12:00</span>
            <span>🔊 60% 🔋 87%</span>
          </div>
          <Windows distro={distro} tiled />
        </>
      )}
    </div>
  );
}
