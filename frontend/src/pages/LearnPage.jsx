import { Link } from "react-router-dom";
import { GUIDES } from "../data/learn.js";
import Playground from "../components/visuals/Playground.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./LearnPage.module.css";

export default function LearnPage({ packages }) {
  usePageTitle("Learn");

  return (
    <>
      <h2>Learn Linux</h2>
      <p className="tip">Short guides for your first days on Linux. Start from the top.</p>

      <Playground packages={packages} start="help" />

      <Link to="/quiz" className={styles.quiz}>
        <span className={styles.quizEmoji}>🧭</span>
        <span>
          <strong>Which distro fits you?</strong>
          <br />
          Answer 5 quick questions and get a recommendation.
        </span>
        <span className={styles.go}>Start →</span>
      </Link>

      <div className={styles.guides}>
        {GUIDES.map((g) => (
          <Link key={g.slug} to={`/learn/${g.slug}`} className={`card ${styles.guide}`}>
            <span className={styles.emoji}>{g.emoji}</span>
            <h3>{g.title}</h3>
            <p>{g.intro}</p>
            <p className="muted">
              {g.level} · {g.minutes} min · {g.steps.length} steps
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
