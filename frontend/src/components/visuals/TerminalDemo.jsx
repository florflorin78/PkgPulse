import styles from "./TerminalDemo.module.css";

const MATRIX_COLUMNS = 18;
const CAVA_BARS = 24;

export default function TerminalDemo({ command, lines, effect }) {
  // a line can be plain text or { t: text, c: color }
  const rows = lines.map((line) => (typeof line === "string" ? { t: line } : line));
  const start = 0.2 + command.length * 0.04;

  return (
    <div className={styles.terminal}>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>
        <span className={styles.prompt}>user@linux:~$ </span>
        <span
          className={styles.typed}
          style={{ "--chars": command.length, animationDuration: `${command.length * 0.04}s` }}
        >
          {command}
        </span>
      </p>

      <kbd className={styles.enter} style={{ animationDelay: `${start - 0.1}s` }}>
        ⏎ Enter
      </kbd>

      {effect === "bars" && (
        <div className={styles.bars} style={{ animationDelay: `${start}s` }}>
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className={styles.bar} style={{ animationDelay: `${n * -0.4}s` }}></span>
          ))}
        </div>
      )}

      {effect === "matrix" && (
        <div className={styles.matrix}>
          {Array.from({ length: MATRIX_COLUMNS }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i * 0.37) % 2}s`, left: `${i * 5.5}%` }}>
              ｱ1ｶ0ｻ1ﾀ0ﾅ1ﾊ0ﾏ
            </span>
          ))}
        </div>
      )}

      {effect === "cava" && (
        <div className={styles.cava}>
          {Array.from({ length: CAVA_BARS }, (_, i) => (
            <span key={i} style={{ animationDelay: `${(i * 0.13) % 0.9}s` }}></span>
          ))}
        </div>
      )}

      {rows.map((row, i) => (
        <p
          key={i}
          className={styles.line}
          style={{ animationDelay: `${start + 0.1 + i * 0.18}s`, color: row.c }}
        >
          {row.t}
        </p>
      ))}
      <p className={styles.line} style={{ animationDelay: `${start + 0.2 + rows.length * 0.18}s` }}>
        <span className={styles.prompt}>user@linux:~$ </span>
        <span className={styles.cursor}>▋</span>
      </p>
    </div>
  );
}
