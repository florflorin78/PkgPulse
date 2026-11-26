import styles from "./FeedExtras.module.css";

export default function TipCard({ tip }) {
  return (
    <li className={styles.tip} data-testid="tip">
      <span className={styles.tipEmoji}>{tip.emoji}</span>
      <div>
        <span className={styles.tag}>💡 Did you know?</span>
        <h3>{tip.title}</h3>
        <p>{tip.text}</p>
      </div>
    </li>
  );
}
