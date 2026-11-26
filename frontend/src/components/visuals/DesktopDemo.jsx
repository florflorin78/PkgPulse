import styles from "./DesktopDemo.module.css";

// the keys you press to start the tool
const KEYS = {
  wm: "Super + Enter",
  scroll: "Super + →",
  launcher: "Super + D",
  lock: "Super + L",
  screenshot: "Print Screen",
  osd: "🔊 Volume +",
  clipboard: "Ctrl + C",
  notify: "notify-send",
};

// an animated drawing of a desktop tool doing its job
function Extra({ kind, name }) {
  if (kind === "launcher") {
    return (
      <div className={styles.launcher}>
        <p className={styles.search}>
          🔍 <span className={styles.typing}>fire</span>
        </p>
        <p className={styles.result}>🦊 Firefox</p>
        <p>🔥 Firewall settings</p>
        <p className={styles.small}>{name}</p>
      </div>
    );
  }
  if (kind === "notify") {
    return (
      <div className={styles.toast}>
        <strong>🔔 {name}</strong>
        <p>Your packages are installed ✓</p>
      </div>
    );
  }
  if (kind === "lock") {
    return (
      <div className={styles.lock}>
        <p className={styles.clock}>12:00</p>
        <p>Thursday, 19 November</p>
        <p className={styles.password}>
          <span className={styles.typing}>● ● ● ● ●</span>
        </p>
      </div>
    );
  }
  if (kind === "osd") {
    return (
      <div className={styles.osd}>
        <span>{name === "Brightnessctl" ? "☀️" : "🔊"}</span>
        <span className={styles.level}>
          <span></span>
        </span>
      </div>
    );
  }
  if (kind === "clipboard") {
    return (
      <div className={styles.clip}>
        <span className={styles.chip}>📋 copied: npm run dev</span>
        <span className={`${styles.chip} ${styles.paste}`}>📥 pasted ✓</span>
      </div>
    );
  }
  if (kind === "screenshot") {
    return (
      <>
        <span className={styles.select}></span>
        <span className={styles.flash}></span>
      </>
    );
  }
  if (kind === "theme") {
    return (
      <div className={styles.icons}>
        {["📁", "🌐", "🎵", "📷", "⚙️", "💬", "🎮", "📝"].map((icon, i) => (
          <span key={icon} style={{ animationDelay: `${i * 0.1}s` }}>
            {icon}
          </span>
        ))}
      </div>
    );
  }
  if (kind === "monitors") {
    return (
      <div className={styles.monitors}>
        <span>1</span>
        <span className={styles.second}>2</span>
      </div>
    );
  }
  return null;
}

export default function DesktopDemo({ kind, name, from, to }) {
  const wallpaper =
    kind === "wallpaper"
      ? styles.wallpapers
      : kind === "lock"
        ? styles.blurred
        : "";

  return (
    <div
      className={`${styles.desktop} ${wallpaper} ${kind === "effects" ? styles.effects : ""}`}
      style={{ "--from": from, "--to": to }}
    >
      <div className={kind === "bar" ? `${styles.bar} ${styles.barNew}` : styles.bar}>
        <span>● ● ○</span>
        <span>{kind === "bar" ? name : "12:00"}</span>
        <span>🔊 📶 🔋</span>
      </div>

      {kind !== "lock" && kind !== "monitors" && (
        <div className={kind === "scroll" ? `${styles.tiles} ${styles.scroll}` : styles.tiles}>
          <span className={styles.tile}>💻 terminal</span>
          <span className={styles.tile}>🌐 browser</span>
          <span className={styles.tile}>📁 files</span>
          {kind === "scroll" && <span className={styles.tile}>🎵 music</span>}
        </div>
      )}

      <Extra kind={kind} name={name} />
      {KEYS[kind] && <kbd className={styles.key}>{KEYS[kind]}</kbd>}
    </div>
  );
}
