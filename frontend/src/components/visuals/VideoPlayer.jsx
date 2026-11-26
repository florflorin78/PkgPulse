import { useState } from "react";
import styles from "./VideoPlayer.module.css";

// the YouTube player loads only after a click, so the page stays fast
export default function VideoPlayer({ id, title, big }) {
  const [playing, setPlaying] = useState(false);
  const size = big ? `${styles.box} ${styles.big}` : styles.box;

  if (playing) {
    return (
      <iframe
        className={size}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className={`${size} ${styles.thumb}`}
      style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` }}
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
    >
      <span className={styles.play}>▶</span>
    </button>
  );
}
