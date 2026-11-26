import { useState } from "react";
import { Link } from "react-router-dom";
import {
  canUseFlatpak,
  flatpakCommand,
  getCategoryStyle,
  youtubeSearch,
  installCommand,
  isAvailable,
} from "../../helpers.js";
import { MANAGERS } from "../../data/constants.js";
import CommandBox from "../CommandBox.jsx";
import PackageMedia from "../visuals/PackageMedia.jsx";
import styles from "./PackageCard.module.css";

const CONFETTI = ["🎉", "✨", "⭐", "💜", "🐧", "🎊", "💚", "🔥"];

export default function PackageCard({ pkg, distro, onToggle, onDelete }) {
  const look = getCategoryStyle(pkg.category);
  // a new number starts the confetti again
  const [burst, setBurst] = useState(0);

  function handleCheck() {
    if (!pkg.selected) {
      setBurst(burst + 1);
    }
    onToggle(pkg.id);
  }

  let installInfo = <p className="muted">Choose a distro to see the install command.</p>;
  if (distro && isAvailable(pkg, distro)) {
    installInfo = <CommandBox command={installCommand([pkg.install], distro.manager)} />;
  } else if (distro && canUseFlatpak(pkg, distro)) {
    installInfo = (
      <>
        <p className="muted">Not in the {distro.name} repos, so it comes from Flatpak.</p>
        <CommandBox command={flatpakCommand([pkg.flatpak])} />
      </>
    );
  } else if (distro) {
    installInfo = <p className="warning">Not in the official {distro.name} repos.</p>;
  }

  return (
    <li
      className={pkg.selected ? `${styles.card} ${styles.selected}` : styles.card}
      data-testid="item"
      data-id={pkg.id}
    >
      <div className={styles.head}>
        <span
          className={styles.avatar}
          style={{ background: `linear-gradient(135deg, ${look.from}, ${look.to})` }}
        >
          {look.emoji}
        </span>
        <div>
          <h3 className={styles.title}>
            <Link to={`/packages/${pkg.id}`} data-testid="item-link">
              {pkg.name}
            </Link>
          </h3>
          <p className={styles.meta}>
            {pkg.category} · {pkg.type}
          </p>
        </div>
        <div className={styles.badges}>
          {pkg.trending && <span className="badge badge-trending">🔥 trending</span>}
          {pkg.recommended && <span className="badge badge-recommended">recommended</span>}
        </div>
      </div>

      <PackageMedia pkg={pkg} />

      {pkg.highlight && (
        <p className={styles.highlight} style={{ borderColor: look.from }}>
          <span>★</span> {pkg.highlight}
        </p>
      )}

      <div className={styles.body}>
        <p>{pkg.description}</p>
        <p className={styles.why}>
          <strong>Why install it?</strong> {pkg.why}
        </p>
        {installInfo}
        <p className={styles.managers} title="Where you can install it">
          {MANAGERS.map((m) => (
            <span
              key={m}
              className={pkg.managers.includes(m) ? styles.yes : styles.no}
              title={pkg.managers.includes(m) ? `In the ${m} repos` : `Not in the ${m} repos`}
            >
              {pkg.managers.includes(m) ? "✓" : "✗"} {m}
            </span>
          ))}
          {pkg.flatpak && <span className={styles.yes}>✓ flathub</span>}
        </p>
        <a
          className={styles.watch}
          href={youtubeSearch(pkg.name)}
          target="_blank"
          rel="noreferrer"
        >
          ▶ Watch tutorials on YouTube
        </a>
      </div>

      <div className={styles.actions}>
        <label className={styles.action}>
          <input
            type="checkbox"
            checked={pkg.selected}
            onChange={handleCheck}
            aria-label={`Select ${pkg.name}`}
            data-testid="item-toggle"
          />
          {pkg.selected ? "In My Setup" : "Add to My Setup"}
          {burst > 0 && (
            <span key={burst} className={styles.burst} aria-hidden="true">
              {CONFETTI.map((c, i) => (
                <span key={i} style={{ "--angle": `${i * 45}deg` }}>
                  {c}
                </span>
              ))}
            </span>
          )}
        </label>
        <Link to={`/packages/${pkg.id}`} className={styles.action}>
          Details
        </Link>
        <button
          className={`${styles.action} ${styles.delete}`}
          onClick={() => onDelete(pkg.id)}
          aria-label={`Delete ${pkg.name}`}
          data-testid="item-delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
