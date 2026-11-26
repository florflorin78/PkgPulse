import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const LINKS = [
  { to: "/", label: "Feed" },
  { to: "/distros", label: "Distros" },
  { to: "/customize", label: "Customize" },
  { to: "/gallery", label: "Gallery" },
  { to: "/learn", label: "Learn" },
  { to: "/setup", label: "My Setup" },
  { to: "/about", label: "About" },
];

// start with the OS theme
function startTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout({ total, selected, error }) {
  const [theme, setTheme] = useState(startTheme);

  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          🐧 PkgPulse
        </Link>

        <nav className={styles.nav} data-testid="nav">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={navClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <p className={styles.count}>
          {total} packages, {selected} selected
        </p>

        <button className={styles.theme} onClick={handleTheme} aria-pressed={theme === "dark"}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <main className={styles.main}>
        {error && (
          <p className="error" data-testid="error">
            Something went wrong: {error}. Is the API running? (<code>npm run api</code>)
          </p>
        )}
        <Outlet />
      </main>

      <footer className={styles.footer}>PkgPulse · Web Technologies project · 2026</footer>
    </>
  );
}
