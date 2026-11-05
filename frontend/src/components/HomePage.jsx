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

export default function HomePage({ onGoTo }) {
  return (
    <>
      <section className="hero">
        <h1>Your computer. Your rules. Try Linux.</h1>
        <p>
          New to Linux? PkgPulse helps you pick a distro, tells you which apps to
          install and why, and gives you one command that installs everything.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => onGoTo("distros")}>
            Find my distro
          </button>
          <button className="btn-secondary" onClick={() => onGoTo("customize")}>
            Customize my desktop
          </button>
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
    </>
  );
}
