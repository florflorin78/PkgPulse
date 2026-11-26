import { useState } from "react";
import styles from "./CommandBox.module.css";

// a command with a Copy button next to it
export default function CommandBox({ command }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // the browser did not allow the clipboard, the user can still select the text
    }
  }

  return (
    <div className={styles.box}>
      <code className={styles.code}>{command}</code>
      <button className={styles.copy} onClick={handleCopy} aria-label={`Copy: ${command}`}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}
