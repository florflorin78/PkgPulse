import styles from "./MemeCard.module.css";

export default function MemeCard({ meme }) {
  return (
    <li
      className={styles.meme}
      style={{ background: `linear-gradient(135deg, ${meme.from}, ${meme.to})` }}
      data-testid="meme"
    >
      <span className={styles.tag}>😂 Linux humor</span>
      <p className={styles.top}>{meme.top}</p>
      <span className={styles.emoji}>{meme.emoji}</span>
      <p className={styles.bottom}>{meme.bottom}</p>
    </li>
  );
}
