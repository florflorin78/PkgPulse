import { useEffect, useState } from "react";
import {
  createPackage,
  deletePackage,
  fetchDistros,
  fetchPackages,
  updatePackage,
} from "./api.js";
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
  const [packages, setPackages] = useState([]);
  const [distros, setDistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(startTheme);
  const [page, setPage] = useState("packages");
  const [distroId, setDistroId] = useState(null);

  // load the data once, on mount
  useEffect(() => {
    let ignore = false; // skip updates after unmount

    async function load() {
      try {
        const packageData = await fetchPackages();
        const distroData = await fetchDistros();
        if (!ignore) {
          setPackages(packageData);
          setDistros(distroData);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleAdd(data) {
    const newPackage = {
      ...data,
      selected: false,
      recommended: false,
      managers: ["apt", "dnf", "zypper", "pacman"],
      description: "A package you added yourself.",
      why: "You added it to your own list.",
    };
    const created = await createPackage(newPackage);
    setPackages((prev) => [...prev, created]);
  }

  async function handleToggle(id) {
    const pkg = packages.find((p) => p.id === id);
    try {
      const updated = await updatePackage(id, { selected: !pkg.selected });
      setPackages((prev) => prev.map((p) => (p.id === id ? updated : p)));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  // used by the Customize page
  async function handleSelectNames(names) {
    const toSelect = packages.filter((p) => names.includes(p.name) && !p.selected);
    try {
      for (const pkg of toSelect) {
        const updated = await updatePackage(pkg.id, { selected: true });
        setPackages((prev) => prev.map((p) => (p.id === pkg.id ? updated : p)));
      }
      setPage("setup");
    } catch (err) {
      setError(err.message);
    }
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
  const distro = distros.find((d) => d.id === distroId);

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
        {loading && (
          <p className="info" data-testid="loading">
            Loading packages...
          </p>
        )}
        {error && (
          <p className="error" data-testid="error">
            Something went wrong: {error}. Is the API running? (<code>npm run api</code>)
          </p>
        )}

        {!loading && (
          <>
            {page === "home" && <HomePage onGoTo={setPage} />}
            {page === "distros" && (
              <DistrosPage
                distros={distros}
                distroId={distroId}
                onChoose={handleChooseDistro}
              />
            )}
            {page === "packages" && (
              <PackagesPage
                packages={packages}
                distro={distro}
                onAdd={handleAdd}
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
                distros={distros}
                distro={distro}
                onChangeDistro={setDistroId}
                onToggle={handleToggle}
              />
            )}
          </>
        )}
      </main>

      <footer className="app-footer">PkgPulse · Web Technologies project · 2026</footer>
    </>
  );
}
