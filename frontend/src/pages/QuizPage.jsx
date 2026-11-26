import { useState } from "react";
import { Link } from "react-router-dom";
import { QUESTIONS } from "../data/learn.js";
import Mascot from "../components/visuals/Mascot.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./QuizPage.module.css";

// the most points a distro can get: the best answer of every question
const MAX_POINTS = QUESTIONS.reduce((sum, q) => {
  const best = Math.max(...q.answers.map((a) => Math.max(...Object.values(a.points))));
  return sum + best;
}, 0);

export default function QuizPage({ distros, onChoose }) {
  usePageTitle("Distro quiz");
  // the index of the chosen answer, one for each question
  const [answers, setAnswers] = useState([]);
  const step = answers.length;

  if (step < QUESTIONS.length) {
    const question = QUESTIONS[step];
    return (
      <section className={styles.quiz}>
        <p className="muted">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <div className={styles.progress}>
          <div
            className={styles.fill}
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
        <h2>{question.text}</h2>
        <div className={styles.answers}>
          {question.answers.map((a, i) => (
            <button
              key={a.text}
              className={styles.answer}
              onClick={() => setAnswers([...answers, i])}
            >
              {a.text}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button className="btn-secondary" onClick={() => setAnswers(answers.slice(0, -1))}>
            ← Back
          </button>
        )}
      </section>
    );
  }

  const ranked = distros
    .map((d) => ({
      distro: d,
      score: answers.reduce((sum, a, q) => sum + (QUESTIONS[q].answers[a].points[d.id] || 0), 0),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) {
    return <p className="info">Loading the distros...</p>;
  }

  const best = ranked[0];
  const others = ranked.slice(1, 3);

  return (
    <section className={styles.quiz} data-testid="quiz-result">
      <p className="muted">Your result</p>
      <div
        className={styles.winner}
        style={{ background: `linear-gradient(135deg, ${best.distro.color}, #111827)` }}
      >
        <Mascot id={best.distro.id} color={best.distro.color} size={110} />
        <div>
          <h2>{best.distro.name}</h2>
          <p>{best.distro.description}</p>
          <p>
            <strong>{Math.round((best.score / MAX_POINTS) * 100)}% match</strong>
          </p>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className="btn-primary" onClick={() => onChoose(best.distro.id)}>
          Choose {best.distro.name}
        </button>
        <Link to={`/distros/${best.distro.id}`} className="btn-secondary">
          Read more
        </Link>
        <button className="btn-secondary" onClick={() => setAnswers([])}>
          Try again
        </button>
      </div>

      {others.length > 0 && (
        <>
          <h3>Also a good fit</h3>
          <ul className={styles.others}>
            {others.map((r) => (
              <li key={r.distro.id} className="card">
                <Link to={`/distros/${r.distro.id}`}>
                  <Mascot id={r.distro.id} color={r.distro.color} size={28} still /> {r.distro.name}
                </Link>{" "}
                <span className="muted">{Math.round((r.score / MAX_POINTS) * 100)}% match</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
