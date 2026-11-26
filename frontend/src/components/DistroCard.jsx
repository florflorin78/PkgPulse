import { Link } from "react-router-dom";
import DistroDesktop from "./visuals/DistroDesktop.jsx";
import Mascot from "./visuals/Mascot.jsx";
import styles from "./DistroCard.module.css";

const LEVEL_CLASS = {
  Beginner: styles.levelBeginner,
  Intermediate: styles.levelIntermediate,
  Advanced: styles.levelAdvanced,
};

export default function DistroCard({ distro, isChosen, onChoose }) {
  return (
    <div className={isChosen ? `card ${styles.distro} ${styles.chosen}` : `card ${styles.distro}`}>
      <div className={styles.cover}>
        <DistroDesktop distro={distro} />
        <span className={styles.mascot}>
          <Mascot id={distro.id} color={distro.color} size={54} />
        </span>
        {distro.trending && <span className={styles.hot}>🔥 Trending</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name} style={{ color: distro.color }}>
          {distro.name}
        </h3>
        <span className={`badge ${LEVEL_CLASS[distro.level]}`}>{distro.level}</span>
        <p className={styles.highlight}>★ {distro.highlight}</p>
        <p className={styles.forWho}>For: {distro.forWho}</p>
        <p>{distro.description}</p>
        <p className="muted">Package manager: {distro.manager}</p>

        <div className={styles.buttons}>
          <button
            className={isChosen ? "btn-secondary" : "btn-primary"}
            onClick={() => onChoose(distro.id)}
            aria-pressed={isChosen}
          >
            {isChosen ? "✓ Your choice" : "Choose"}
          </button>
          <Link to={`/distros/${distro.id}`} className="btn-secondary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
