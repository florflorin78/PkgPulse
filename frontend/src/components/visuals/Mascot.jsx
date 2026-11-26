import { DEFAULT_MASCOT, MASCOTS } from "../../data/mascots.js";
import styles from "./Mascot.module.css";

function Eyes({ type }) {
  if (type === "happy") {
    return (
      <g className={styles.line}>
        <path d="M40 64 q7 -8 14 0" />
        <path d="M66 64 q7 -8 14 0" />
      </g>
    );
  }
  if (type === "sleepy") {
    return (
      <g className={styles.line}>
        <path d="M40 63 q7 6 14 0" />
        <path d="M66 63 q7 6 14 0" />
      </g>
    );
  }
  if (type === "cool") {
    return (
      <g>
        <rect x="36" y="56" width="22" height="12" rx="4" fill="#111827" />
        <rect x="62" y="56" width="22" height="12" rx="4" fill="#111827" />
        <path d="M58 60 h4" stroke="#111827" strokeWidth="3" />
        <path d="M40 59 l6 0" stroke="#fff" strokeWidth="2" opacity="0.6" />
      </g>
    );
  }
  if (type === "glasses") {
    return (
      <g>
        <circle cx="47" cy="62" r="9" fill="#fff" stroke="#111827" strokeWidth="3" />
        <circle cx="73" cy="62" r="9" fill="#fff" stroke="#111827" strokeWidth="3" />
        <path d="M56 62 h8" stroke="#111827" strokeWidth="3" />
        <circle className={styles.pupil} cx="47" cy="63" r="3.5" fill="#111827" />
        <circle className={styles.pupil} cx="73" cy="63" r="3.5" fill="#111827" />
      </g>
    );
  }
  if (type === "star") {
    return (
      <g fill="#fde047" stroke="#111827" strokeWidth="1.5">
        <path d="M47 53 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" />
        <path d="M73 53 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" />
      </g>
    );
  }
  return (
    <g className={styles.blink}>
      <ellipse cx="47" cy="62" rx="7" ry="8" fill="#fff" />
      <ellipse cx="73" cy="62" rx="7" ry="8" fill="#fff" />
      <circle className={styles.pupil} cx="48" cy="63" r="4" fill="#111827" />
      <circle className={styles.pupil} cx="74" cy="63" r="4" fill="#111827" />
      <circle cx="50" cy="60" r="1.5" fill="#fff" />
      <circle cx="76" cy="60" r="1.5" fill="#fff" />
    </g>
  );
}

function Mouth({ type }) {
  if (type === "open") {
    return <path d="M52 78 q8 12 16 0 z" fill="#7f1d1d" stroke="#111827" strokeWidth="2" />;
  }
  if (type === "cat") {
    return <path className={styles.line} d="M50 78 q5 5 10 0 q5 5 10 0" />;
  }
  if (type === "flat") {
    return <path className={styles.line} d="M53 80 h14" />;
  }
  return <path className={styles.line} d="M50 77 q10 9 20 0" />;
}

function Accessory({ type, color }) {
  switch (type) {
    case "leaf":
      return (
        <g>
          <path d="M60 36 v-10" stroke="#166534" strokeWidth="3" />
          <path d="M60 28 q-16 -14 -22 -2 q12 8 22 2z" fill="#4ade80" stroke="#166534" strokeWidth="2" />
        </g>
      );
    case "sprout":
      return (
        <g fill="#86efac" stroke="#166534" strokeWidth="2">
          <path d="M60 37 v-12" fill="none" strokeWidth="3" />
          <path d="M60 27 q-12 -10 -16 0 q8 5 16 0z" />
          <path d="M60 27 q12 -10 16 0 q-8 5 -16 0z" />
        </g>
      );
    case "cap":
      return (
        <g>
          <path d="M32 46 q28 -30 56 0z" fill="#ef4444" stroke="#111827" strokeWidth="2" />
          <path d="M80 44 q18 0 22 6 q-12 2 -24 -1z" fill="#ef4444" stroke="#111827" strokeWidth="2" />
          <circle cx="60" cy="20" r="3" fill="#111827" />
        </g>
      );
    case "beanie":
      return (
        <g>
          <path d="M30 48 q30 -38 60 0z" fill="#3b82f6" stroke="#111827" strokeWidth="2" />
          <rect x="28" y="43" width="64" height="8" rx="4" fill="#1d4ed8" stroke="#111827" strokeWidth="2" />
          <circle cx="60" cy="16" r="6" fill="#fff" stroke="#111827" strokeWidth="2" />
        </g>
      );
    case "propeller":
      return (
        <g>
          <path d="M34 46 q26 -26 52 0z" fill="#facc15" stroke="#111827" strokeWidth="2" />
          <path d="M60 26 v-8" stroke="#111827" strokeWidth="3" />
          <g className={styles.spin}>
            <ellipse cx="50" cy="16" rx="11" ry="3.5" fill="#ef4444" />
            <ellipse cx="70" cy="16" rx="11" ry="3.5" fill="#3b82f6" />
          </g>
        </g>
      );
    case "wizard":
      return (
        <g>
          <path d="M34 44 l26 -40 26 40z" fill="#6d28d9" stroke="#111827" strokeWidth="2" />
          <path d="M26 44 h68" stroke="#4c1d95" strokeWidth="6" strokeLinecap="round" />
          <circle cx="56" cy="26" r="2.5" fill="#fde047" />
          <circle cx="66" cy="34" r="2" fill="#fde047" />
        </g>
      );
    case "antenna":
      return (
        <g>
          <path d="M60 37 q4 -14 -2 -24" fill="none" stroke="#111827" strokeWidth="3" />
          <circle className={styles.glow} cx="58" cy="12" r="6" fill="#38bdf8" stroke="#111827" strokeWidth="2" />
        </g>
      );
    case "flower":
      return (
        <g stroke="#111827" strokeWidth="1.5">
          <circle cx="76" cy="34" r="6" fill="#f472b6" />
          <circle cx="86" cy="30" r="6" fill="#f472b6" />
          <circle cx="84" cy="41" r="6" fill="#f472b6" />
          <circle cx="74" cy="44" r="6" fill="#f472b6" />
          <circle cx="80" cy="37" r="5" fill="#fde047" />
        </g>
      );
    case "bow":
      return (
        <g fill="#f43f5e" stroke="#111827" strokeWidth="2">
          <path d="M60 34 l-16 -10 v20z" />
          <path d="M60 34 l16 -10 v20z" />
          <circle cx="60" cy="34" r="5" />
        </g>
      );
    case "star":
      return (
        <path
          className={styles.glow}
          d="M60 6 l6 13 14 2 -10 10 2 14 -12 -7 -12 7 2 -14 -10 -10 14 -2z"
          fill="#fde047"
          stroke="#111827"
          strokeWidth="2"
        />
      );
    case "crown":
      return (
        <g>
          <path d="M38 42 l2 -24 12 12 8 -16 8 16 12 -12 2 24z" fill="#facc15" stroke="#111827" strokeWidth="2" />
          <circle cx="60" cy="34" r="3.5" fill="#ef4444" />
          <circle cx="47" cy="36" r="2.5" fill="#3b82f6" />
          <circle cx="73" cy="36" r="2.5" fill="#22c55e" />
        </g>
      );
    case "halo":
      return <ellipse className={styles.glow} cx="60" cy="18" rx="22" ry="6" fill="none" stroke="#fde047" strokeWidth="5" />;
    case "gem":
      return (
        <g className={styles.glow}>
          <path d="M48 26 l6 -10 h12 l6 10 -12 14z" fill="#a5f3fc" stroke="#111827" strokeWidth="2" />
          <path d="M48 26 h24" stroke="#111827" strokeWidth="1.5" />
        </g>
      );
    case "tophat":
      return (
        <g>
          <rect x="44" y="8" width="32" height="30" rx="3" fill="#1f2937" stroke="#111827" strokeWidth="2" />
          <rect x="44" y="28" width="32" height="5" fill={color} />
          <path d="M32 40 h56" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
    case "hood":
      return (
        <path
          d="M22 74 q-4 -56 38 -56 q42 0 38 56 q-6 -38 -38 -38 q-32 0 -38 38z"
          fill="#1f2937"
          stroke="#111827"
          strokeWidth="2"
        />
      );
    case "headphones":
      return (
        <g>
          <path d="M26 62 q0 -44 34 -44 q34 0 34 44" fill="none" stroke="#111827" strokeWidth="6" />
          <rect x="18" y="56" width="14" height="22" rx="6" fill="#ef4444" stroke="#111827" strokeWidth="2" />
          <rect x="88" y="56" width="14" height="22" rx="6" fill="#ef4444" stroke="#111827" strokeWidth="2" />
        </g>
      );
    case "hardhat":
      return (
        <g>
          <path d="M30 46 q30 -40 60 0z" fill="#facc15" stroke="#111827" strokeWidth="2" />
          <path d="M24 46 h72" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />
          <path d="M60 18 v26" stroke="#ca8a04" strokeWidth="4" />
        </g>
      );
    case "party":
      return (
        <g>
          <path d="M44 42 l16 -36 16 36z" fill="#22d3ee" stroke="#111827" strokeWidth="2" />
          <path d="M50 30 l12 4 M47 37 l18 2" stroke="#f472b6" strokeWidth="3" />
          <circle className={styles.glow} cx="60" cy="6" r="5" fill="#f472b6" />
        </g>
      );
    case "horn":
      return (
        <g>
          <path d="M54 38 l6 -32 6 32z" fill="#f0abfc" stroke="#111827" strokeWidth="2" />
          <path d="M56 28 l8 -3 M57 20 l6 -2" stroke="#a21caf" strokeWidth="2" />
        </g>
      );
    case "bolt":
      return (
        <path
          className={styles.glow}
          d="M64 4 l-14 22 h10 l-6 18 18 -26 h-10 l6 -14z"
          fill="#fde047"
          stroke="#111827"
          strokeWidth="2"
        />
      );
    case "bandana":
      return (
        <g>
          <path d="M26 50 q34 -18 68 0 v8 q-34 -16 -68 0z" fill="#111827" />
          <path d="M92 52 l12 -6 -4 12z" fill="#111827" />
        </g>
      );
    default:
      return null;
  }
}

export default function Mascot({ id, color, size = 64, still }) {
  const look = MASCOTS[id] || DEFAULT_MASCOT;
  const body = color || "#7c3aed";

  return (
    <svg
      className={still ? styles.mascot : `${styles.mascot} ${styles.float}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={`${id} mascot`}
    >
      <ellipse cx="60" cy="112" rx="28" ry="5" fill="rgba(0, 0, 0, 0.2)" />
      <ellipse cx="46" cy="104" rx="9" ry="6" fill={body} stroke="#111827" strokeWidth="2" />
      <ellipse cx="74" cy="104" rx="9" ry="6" fill={body} stroke="#111827" strokeWidth="2" />
      <path
        d="M22 72 q0 -38 38 -38 q38 0 38 38 q0 30 -38 30 q-38 0 -38 -30z"
        fill={body}
        stroke="#111827"
        strokeWidth="2.5"
      />
      <ellipse cx="60" cy="88" rx="22" ry="12" fill="#fff" opacity="0.25" />
      <ellipse cx="38" cy="74" rx="5" ry="3" fill="#fb7185" opacity="0.6" />
      <ellipse cx="82" cy="74" rx="5" ry="3" fill="#fb7185" opacity="0.6" />
      <Eyes type={look.eyes} />
      <Mouth type={look.mouth} />
      <Accessory type={look.accessory} color={body} />
    </svg>
  );
}
