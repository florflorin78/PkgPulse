import styles from "./DistroCard.module.css";

export default function DistroCard({ distro, isChosen, onChoose }) {
  return (
    <button
      className={isChosen ? `card ${styles.distro} ${styles.chosen}` : `card ${styles.distro}`}
      onClick={() => onChoose(distro.id)}
      aria-pressed={isChosen}
    >
      <span className="big-icon">{distro.icon}</span>
      <h3 className={styles.name} style={{ color: distro.color }}>
        {distro.name}
      </h3>
      <span className={`badge ${styles["level" + distro.level]}`}>{distro.level}</span>
      <p className={styles.forWho}>For: {distro.forWho}</p>
      <p>{distro.description}</p>
      <p className="muted">Package manager: {distro.manager}</p>
      {isChosen && <p className={styles.chosenText}>✓ Your choice</p>}
    </button>
  );
}
