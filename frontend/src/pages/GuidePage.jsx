import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GUIDES } from "../data/learn.js";
import { youtubeSearch } from "../helpers.js";
import usePageTitle from "../usePageTitle.js";
import styles from "./GuidePage.module.css";
import CommandBox from "../components/CommandBox.jsx";

export default function GuidePage() {
  const { slug } = useParams();
  const guide = GUIDES.find((g) => g.slug === slug);
  const [done, setDone] = useState([]);

  usePageTitle(guide ? guide.title : "Guide not found");

  if (!guide) {
    return (
      <section className="card" data-testid="not-found">
        <h2>Guide not found</h2>
        <Link to="/learn">Back to the guides</Link>
      </section>
    );
  }

  function toggleStep(i) {
    if (done.includes(i)) {
      setDone(done.filter((d) => d !== i));
    } else {
      setDone([...done, i]);
    }
  }

  const percent = Math.round((done.length / guide.steps.length) * 100);

  return (
    <article className={styles.page}>
      <Link to="/learn" className={styles.back}>
        ← All guides
      </Link>
      <h2>
        {guide.emoji} {guide.title}
      </h2>
      <p className="muted">
        {guide.level} · about {guide.minutes} minutes
      </p>
      <p>{guide.intro}</p>

      <div className={styles.progress} aria-label={`${percent}% done`}>
        <div className={styles.fill} style={{ width: `${percent}%` }}></div>
      </div>
      <p className="muted">
        {done.length} of {guide.steps.length} steps done
      </p>

      <ol className={styles.steps}>
        {guide.steps.map((step, i) => (
          <li key={step.title} className={done.includes(i) ? `card ${styles.done}` : "card"}>
            <label className={styles.check}>
              <input type="checkbox" checked={done.includes(i)} onChange={() => toggleStep(i)} />
              <strong>
                {i + 1}. {step.title}
              </strong>
            </label>
            <p>{step.text}</p>
            {step.command && <CommandBox command={step.command} />}
          </li>
        ))}
      </ol>

      {percent === 100 && <p className="ok">🎉 Well done! You finished this guide.</p>}

      <p>
        <a href={youtubeSearch(guide.title)} target="_blank" rel="noreferrer">
          ▶ Watch videos about this on YouTube
        </a>
      </p>
    </article>
  );
}
