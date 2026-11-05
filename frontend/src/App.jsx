import { useState } from "react";
import { INITIAL_DISTROS, INITIAL_PACKAGES } from "./data.js";
import HomePage from "./components/HomePage.jsx";
import DistrosPage from "./components/DistrosPage.jsx";
import PackagesPage from "./components/PackagesPage.jsx";
import CustomizePage from "./components/CustomizePage.jsx";
import SetupPage from "./components/SetupPage.jsx";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "distros", label: "Distros" },
  { id: "packages", label: "Packages" },
  { id: "customize", label: "Customize" },
  { id: "setup", label: "My Setup" },
];

// start with the OS theme
function startTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [theme, setTheme] = useState(startTheme);
  const [page, setPage] = useState("home");
  const [distroId, setDistroId] = useState(null);

  function handleToggle(id) {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    );
  }

  function handleDelete(id) {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  }

  // used by the Customize page
  function handleSelectNames(names) {
    setPackages((prev) =>
      prev.map((p) => (names.includes(p.name) ? { ...p, selected: true } : p))
    );
    setPage("setup");
  }

  function handleChooseDistro(id) {
    setDistroId(id);
    setPage("packages");
  }

  function handleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  // derived values, not state
  const selectedCount = packages.filter((p) => p.selected).length;
  const distro = INITIAL_DISTROS.find((d) => d.id === distroId);

  return (
    <>
      <header className="app-header">
        <button className="brand" onClick={() => setPage("home")}>
          🐧 PkgPulse
        </button>

        <nav>
          {PAGES.map((p) => (
            <button
              key={p.id}
              className={page === p.id ? "nav-btn active" : "nav-btn"}
              onClick={() => setPage(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>

        <p className="app-count">
          {packages.length} packages, {selectedCount} selected
        </p>

        <button
          className="theme-toggle"
          onClick={handleTheme}
          aria-pressed={theme === "dark"}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <main className="container">
        {page === "home" && <HomePage onGoTo={setPage} />}
        {page === "distros" && (
          <DistrosPage
            distros={INITIAL_DISTROS}
            distroId={distroId}
            onChoose={handleChooseDistro}
          />
        )}
        {page === "packages" && (
          <PackagesPage
            packages={packages}
            distro={distro}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
        {page === "customize" && (
          <CustomizePage
            packages={packages}
            distro={distro}
            onSelectNames={handleSelectNames}
          />
        )}
        {page === "setup" && (
          <SetupPage
            packages={packages}
            distros={INITIAL_DISTROS}
            distro={distro}
            onChangeDistro={setDistroId}
            onToggle={handleToggle}
          />
        )}
      </main>

      <footer className="app-footer">PkgPulse · Web Technologies project · 2026</footer>
    </>
  );
}
