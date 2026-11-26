import { Link } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import styles from "./AboutPage.module.css";

const REASONS = [
  { icon: "💸", title: "Free forever", text: "No license, no subscription. You own your computer again." },
  { icon: "💻", title: "Revives old laptops", text: "Light distros run fast on hardware that Windows gave up on." },
  { icon: "🔒", title: "Private and safe", text: "No ads in the start menu, no forced restarts, almost no viruses." },
  { icon: "🎨", title: "Make it yours", text: "Change everything: the bar, the windows, the colors. This is called ricing." },
];

const STEPS = [
  "Pick a distro that fits you",
  "Choose the packages you need (we explain each one)",
  "Design your desktop with drag and drop",
  "Copy one command and run it after install",
];

export default function AboutPage() {
  usePageTitle("About");

  return (
    <>
      <section className={styles.hero}>
        <h1>Your computer. Your rules. Try Linux.</h1>
        <p>
          New to Linux? PkgPulse helps you pick a distro, tells you which apps to
          install and why, and gives you one command that installs everything.
        </p>
        <div className={styles.buttons}>
          <Link to="/distros" className="btn-primary">
            Find my distro
          </Link>
          <Link to="/customize" className="btn-secondary">
            Customize my desktop
          </Link>
        </div>
      </section>

      <h2>Why switch to Linux?</h2>
      <div className="grid">
        {REASONS.map((r) => (
          <div key={r.title} className="card">
            <span className="big-icon">{r.icon}</span>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>

      <h2>How it works</h2>
      <ol className="steps">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2>Credits</h2>
      <ul className={styles.credits}>
        <li>All the pictures on this site are drawn by the site itself, with CSS and the desktop editor.</li>
        <li>The videos belong to their creators and are played from YouTube.</li>
        <li>Distro names and package names belong to their projects. PkgPulse is not part of any of them.</li>
        <li>The trending list uses the DistroWatch page hit ranking and Linux news from November 2026.</li>
      </ul>

      <p className="muted">Built with React, Vite, React Router and json-server.</p>
    </>
  );
}
