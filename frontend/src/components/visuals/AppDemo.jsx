import styles from "./AppDemo.module.css";

// the icon that the mouse clicks to open the app
const ICONS = {
  browser: "🌐",
  chat: "💬",
  editor: "🧑‍💻",
  video: "🎬",
  music: "🎵",
  paint: "🎨",
  office: "📝",
  game: "🎮",
  download: "⬇️",
  secure: "🔐",
  network: "📡",
  calc: "🧮",
  settings: "🎚️",
  screenshot: "📸",
  files: "📁",
};

// a small animated drawing of what the app looks like when it is open
function Body({ kind, name }) {
  if (kind === "browser") {
    return (
      <div className={styles.browser}>
        <div className={styles.url}>
          🔒 <span className={styles.typing}>pkgpulse.dev</span>
        </div>
        <div className={`${styles.block} ${styles.hero}`}></div>
        <div className={styles.cards}>
          <span className={styles.block}></span>
          <span className={styles.block}></span>
          <span className={styles.block}></span>
        </div>
      </div>
    );
  }

  if (kind === "chat") {
    return (
      <div className={styles.chat}>
        <p className={`${styles.bubble} ${styles.left}`}>Hi! 👋 Did you try Linux?</p>
        <p className={`${styles.bubble} ${styles.right}`}>Yes, Mint! 🍃 It is so fast</p>
        <p className={`${styles.bubble} ${styles.left}`}>Send me your PkgPulse setup 😄</p>
        <p className={styles.typingDots}>
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    );
  }

  if (kind === "editor") {
    return (
      <div className={styles.editor}>
        <div className={styles.tree}>
          <span>📁 src</span>
          <span>📄 App.jsx</span>
          <span>📄 api.js</span>
        </div>
        <div className={styles.code}>
          <p className={styles.codeLine}>
            <span className={styles.kw}>import</span> {"{ useState }"} <span className={styles.kw}>from</span>{" "}
            <span className={styles.str}>&quot;react&quot;</span>;
          </p>
          <p className={styles.codeLine}>
            <span className={styles.kw}>function</span> <span className={styles.fn}>App</span>() {"{"}
          </p>
          <p className={styles.codeLine}>
            {"  "}
            <span className={styles.kw}>return</span> &lt;h1&gt;Hello Linux&lt;/h1&gt;;
          </p>
          <p className={styles.codeLine}>{"}"}</p>
        </div>
      </div>
    );
  }

  if (kind === "video") {
    return (
      <div className={styles.video}>
        <div className={styles.scene}>
          <span className={styles.sun}></span>
          <span className={styles.hill}></span>
        </div>
        <div className={styles.controls}>
          ▶ <span className={styles.progress}><span></span></span> 1:24
        </div>
      </div>
    );
  }

  if (kind === "music") {
    return (
      <div className={styles.music}>
        <span className={styles.vinyl}></span>
        <div>
          <strong>Lofi beats</strong>
          <p className={styles.muted}>Playing in {name}</p>
          <div className={styles.eq}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <span key={n} style={{ animationDelay: `${n * 0.12}s` }}></span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "paint") {
    return (
      <div className={styles.paint}>
        <div className={styles.tools}>
          <span>✏️</span>
          <span>🖌️</span>
          <span>🪣</span>
          <span>⭕</span>
        </div>
        <svg viewBox="0 0 200 100" className={styles.canvas}>
          <circle className={styles.draw} cx="55" cy="50" r="30" fill="none" stroke="#f472b6" strokeWidth="5" />
          <path className={styles.draw} d="M110 80 l25 -55 25 55z" fill="none" stroke="#38bdf8" strokeWidth="5" />
          <path className={styles.draw} d="M20 90 q90 -40 170 0" fill="none" stroke="#fbbf24" strokeWidth="4" />
        </svg>
      </div>
    );
  }

  if (kind === "office") {
    return (
      <div className={styles.office}>
        <div className={styles.toolbar}>
          <b>B</b> <i>I</i> <u>U</u> ☰
        </div>
        <div className={styles.page}>
          <p className={styles.heading}>My notes</p>
          <span className={styles.text} style={{ animationDelay: "0.3s" }}></span>
          <span className={styles.text} style={{ animationDelay: "0.9s" }}></span>
          <span className={`${styles.text} ${styles.half}`} style={{ animationDelay: "1.5s" }}></span>
        </div>
      </div>
    );
  }

  if (kind === "game") {
    return (
      <div className={styles.game}>
        <div className={styles.covers}>
          <span style={{ background: "linear-gradient(135deg, #f97316, #dc2626)" }}>🏎️</span>
          <span style={{ background: "linear-gradient(135deg, #22c55e, #14532d)" }}>⛏️</span>
          <span style={{ background: "linear-gradient(135deg, #6366f1, #1e1b4b)" }}>🚀</span>
        </div>
        <button className={styles.play} tabIndex={-1}>
          ▶ PLAY
        </button>
      </div>
    );
  }

  if (kind === "download") {
    return (
      <div className={styles.download}>
        {["ubuntu-24.04.iso", "fedora-45.iso", "my-video.mkv"].map((file, i) => (
          <div key={file} className={styles.dl}>
            <span>{file}</span>
            <span className={styles.progress}>
              <span style={{ animationDelay: `${i * -0.7}s` }}></span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "secure") {
    return (
      <div className={styles.secure}>
        <span className={styles.lock}>🔐</span>
        <div>
          {["github.com", "university.ro", "steam"].map((site) => (
            <p key={site} className={styles.entry}>
              🔑 {site} <span className={styles.muted}>••••••••</span>
            </p>
          ))}
          <p className={styles.ok}>✓ Protected</p>
        </div>
      </div>
    );
  }

  if (kind === "network") {
    return (
      <div className={styles.network}>
        {["TCP 192.168.1.5 → 142.250.1.1 443", "DNS query pkgpulse.dev", "TCP 142.250.1.1 → 192.168.1.5 ACK", "UDP 192.168.1.5 → 1.1.1.1 53", "HTTP GET /packages 200"].map((row, i) => (
          <p key={row} className={styles.packet} style={{ animationDelay: `${i * 0.35}s` }}>
            {row}
          </p>
        ))}
      </div>
    );
  }

  if (kind === "calc") {
    return (
      <div className={styles.calc}>
        <p className={styles.display}>
          <span className={styles.typing}>2 + 2 = 4</span>
        </p>
        <div className={styles.keys}>
          {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "+"].map((k) => (
            <span key={k}>{k}</span>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "settings") {
    return (
      <div className={styles.settings}>
        {["🔊 Speakers", "🎧 Headphones", "🎤 Microphone"].map((row, i) => (
          <div key={row} className={styles.slider}>
            <span>{row}</span>
            <span className={styles.progress}>
              <span style={{ animationDelay: `${i * -0.8}s` }}></span>
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "screenshot") {
    return (
      <div className={styles.shot}>
        <span className={styles.select}></span>
        <span className={styles.flash}></span>
        <span className={styles.arrow}>➚ look here!</span>
      </div>
    );
  }

  // files
  return (
    <div className={styles.files}>
      {["📁 Documents", "📁 Music", "📁 Pictures", "📁 Videos", "🖼️ wall.png", "📄 cv.pdf"].map((f, i) => (
        <span key={f} className={styles.file} style={{ animationDelay: `${i * 0.12}s` }}>
          {f}
        </span>
      ))}
    </div>
  );
}

export default function AppDemo({ kind, name }) {
  return (
    <div className={styles.scene}>
      <span className={styles.dockIcon}>{ICONS[kind] || "📁"}</span>
      <span className={styles.ripple}></span>
      <svg className={styles.pointer} viewBox="0 0 16 22" width="16" height="22" aria-hidden="true">
        <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L14 12 Z" fill="#fff" stroke="#111827" strokeWidth="1.5" />
      </svg>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          {name}
        </div>
        <div className={styles.body}>
          <Body kind={kind} name={name} />
        </div>
      </div>
    </div>
  );
}
