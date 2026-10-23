import { useState } from "react";
import {
  initialPackages,
  countSelected,
  filterByDistro,
  filterByCategory,
  getCategories,
} from "./packages.js";
import DistroCard from "./components/DistroCard.jsx";
import PackageCard from "./components/PackageCard.jsx";
import { distros } from "./data/distros.js";

// ── Top-level sections controlled by the nav ──────────────────────────────────
const SECTIONS = ["Distributions", "Browse Packages", "My Setup"];

export default function App() {
  // ── Active nav section ────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState("Distributions");

  // ── Package state ─────────────────────────────────────────────────────────
  const [packages, setPackages] = useState(initialPackages);
  const selected = countSelected(packages);

  // ── Add-package form ──────────────────────────────────────────────────────
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("package");

  function handleAddPackage(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed === "") return;
    const nextId = packages.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    setPackages([
      ...packages,
      {
        id: nextId,
        name: trimmed,
        selected: false,
        type: newType,
        category: "Utilities",
        description: "Custom package added by user.",
        why: "Added manually.",
        distros: [],
      },
    ]);
    setNewName("");
    setNewType("package");
  }

  function handleToggle(id) {
    setPackages(packages.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  }

  function handleDelete(id) {
    setPackages(packages.filter((p) => p.id !== id));
  }

  // ── Distro search & selection ──────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const filteredDistros = distros.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Distro portal ─────────────────────────────────────────────────────────
  const [selectedDistro, setSelectedDistro] = useState(null);

  // ── Category filter inside portal ─────────────────────────────────────────
  const [portalCategory, setPortalCategory] = useState("All");

  function handleOpenDistro(distro) {
    setSelectedDistro(distro);
    setPortalCategory("All");
    setActiveSection("Distributions");
  }

  // ── Browse packages search + category ─────────────────────────────────────
  const [browseSearch, setBrowseSearch] = useState("");
  const [browseCategory, setBrowseCategory] = useState("All");
  const allCategories = ["All", ...getCategories(initialPackages)];

  const browsedPackages = packages.filter((p) => {
    const matchName = p.name.toLowerCase().includes(browseSearch.toLowerCase());
    const matchCat = browseCategory === "All" || p.category === browseCategory;
    return matchName && matchCat;
  });

  // ── Script generation ─────────────────────────────────────────────────────
  const [scriptCopied, setScriptCopied] = useState(false);

  function generateScript(distro) {
    const sel = packages.filter((p) => p.selected);
    if (sel.length === 0) return "# No packages selected yet";
    const names = sel.map((p) => p.name.toLowerCase()).join(" ");
    switch (distro.pkgManager) {
      case "pacman":
        return `sudo pacman -S ${names}`;
      case "apt":
        return `sudo apt install ${names}`;
      case "dnf":
        return `sudo dnf install ${names}`;
      case "nix":
        return `nix-env -iA ${sel.map((p) => "nixpkgs." + p.name.toLowerCase()).join(" ")}`;
      case "emerge":
        return `sudo emerge ${names}`;
      case "zypper":
        return `sudo zypper install ${names}`;
      case "xbps":
        return `sudo xbps-install ${names}`;
      default:
        return `# Install: ${names}`;
    }
  }

  function handleCopyScript(distro) {
    navigator.clipboard.writeText(generateScript(distro)).then(() => {
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    });
  }

  // ── Portal packages with category filter ──────────────────────────────────
  function getPortalPackages() {
    if (!selectedDistro) return [];
    const compatible = filterByDistro(packages, selectedDistro.id);
    return filterByCategory(compatible, portalCategory);
  }

  const portalPackages = selectedDistro ? getPortalPackages() : [];
  const portalCategories = selectedDistro
    ? ["All", ...getCategories(filterByDistro(packages, selectedDistro.id))]
    : [];

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a
          href="#"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            setSelectedDistro(null);
            setActiveSection("Distributions");
          }}
        >
          <span className="brand-icon">⚡</span> PkgPulse
        </a>

        <ul className="nav-links" role="list">
          {SECTIONS.map((sec) => (
            <li key={sec}>
              <button
                className={`nav-btn${activeSection === sec && !selectedDistro ? " nav-btn-active" : ""}`}
                onClick={() => {
                  setSelectedDistro(null);
                  setActiveSection(sec);
                }}
              >
                {sec}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-badge-area">
          <span className="nav-selected-badge" title="Packages selected for installation">
            {selected} selected
          </span>
        </div>
      </nav>

      {/* ── HERO HEADER (only on Distributions home) ────────────────────────── */}
      {activeSection === "Distributions" && !selectedDistro && (
        <header className="hero">
          <div className="hero-content">
            <h1>Build Your Perfect Linux Setup</h1>
            <p>
              Choose a distribution, pick your packages, and get a ready-to-run install command.
            </p>
          </div>
        </header>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: DISTRIBUTIONS
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeSection === "Distributions" && (
        <main className="distro-main">
          {selectedDistro === null ? (
            /* Grid of distros */
            <>
              <div className="section-header">
                <h2 className="section-title">Linux Distributions</h2>
                <p className="section-sub">Select a distro to explore compatible packages.</p>
              </div>

              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  id="distro-search"
                  type="text"
                  className="search-input"
                  placeholder="Search distributions…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search distributions"
                />
              </div>

              {filteredDistros.length === 0 ? (
                <p className="empty">No distributions match your search.</p>
              ) : (
                <div className="grid-view">
                  {filteredDistros.map((d) => (
                    <DistroCard key={d.id} distro={d} onClick={handleOpenDistro} />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* ── DISTRO PORTAL ────────────────────────────────────────────── */
            <div className="portal-view">
              <button className="back-btn" onClick={() => setSelectedDistro(null)}>
                ← Back to Distributions
              </button>

              {/* Portal header */}
              <div className="portal-hero" style={{ "--distro-color": selectedDistro.color }}>
                <span className="portal-icon">{selectedDistro.icon}</span>
                <div>
                  <h2 style={{ color: selectedDistro.color }}>{selectedDistro.name}</h2>
                  <p className="portal-desc">{selectedDistro.description}</p>
                  <div className="portal-meta">
                    <span className="portal-meta-pill">📦 {selectedDistro.info}</span>
                    <span className="portal-meta-pill">⚡ {selectedDistro.pkgManager}</span>
                    <span className={`difficulty-badge difficulty-${selectedDistro.difficulty?.toLowerCase()}`}>
                      {selectedDistro.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category filter tabs */}
              <div className="category-tabs" role="tablist" aria-label="Package categories">
                {portalCategories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={portalCategory === cat}
                    className={`category-tab${portalCategory === cat ? " active" : ""}`}
                    onClick={() => setPortalCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Package grid */}
              <div className="portal-packages">
                {portalPackages.length === 0 ? (
                  <p className="empty">No compatible packages in this category.</p>
                ) : (
                  <div className="portal-pkg-list">
                    {portalPackages.map((p) => (
                      <div
                        key={p.id}
                        className={`portal-pkg-card${p.selected ? " pkg-active" : ""}`}
                      >
                        <div className="portal-pkg-header">
                          <h4>{p.name}</h4>
                          <span className={`badge badge-${p.type}`}>{p.type}</span>
                        </div>
                        <p className="pkg-cat-label">{p.category}</p>
                        <p className="pkg-desc">{p.description}</p>
                        <p className="pkg-why">
                          <strong>Why?</strong> {p.why}
                        </p>
                        <button
                          className={`btn-toggle${p.selected ? " active" : ""}`}
                          onClick={() => handleToggle(p.id)}
                        >
                          {p.selected ? "✓ Selected" : "+ Add to setup"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Generated install script */}
              <div className="portal-script panel">
                <div className="script-header">
                  <h3>Generated install command</h3>
                  <button
                    className="btn-copy"
                    onClick={() => handleCopyScript(selectedDistro)}
                    aria-label="Copy install command to clipboard"
                  >
                    {scriptCopied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="code-preview">
                  <code>{generateScript(selectedDistro)}</code>
                </pre>
                <p className="script-note">
                  {selected} package{selected !== 1 ? "s" : ""} selected ·{" "}
                  Package manager: <strong>{selectedDistro.pkgManager}</strong>
                </p>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: BROWSE PACKAGES
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeSection === "Browse Packages" && (
        <main className="distro-main">
          <div className="section-header">
            <h2 className="section-title">Browse All Packages</h2>
            <p className="section-sub">
              {packages.length} packages across {allCategories.length - 1} categories
            </p>
          </div>

          {/* Search + category filter */}
          <div className="browse-controls">
            <div className="search-container browse-search">
              <span className="search-icon">🔍</span>
              <input
                id="package-search"
                type="text"
                className="search-input"
                placeholder="Search packages…"
                value={browseSearch}
                onChange={(e) => setBrowseSearch(e.target.value)}
                aria-label="Search packages"
              />
            </div>
            <div className="category-tabs">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  className={`category-tab${browseCategory === cat ? " active" : ""}`}
                  onClick={() => setBrowseCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {browsedPackages.length === 0 ? (
            <p className="empty">No packages match your search.</p>
          ) : (
            <div className="portal-pkg-list">
              {browsedPackages.map((p) => (
                <div
                  key={p.id}
                  className={`portal-pkg-card${p.selected ? " pkg-active" : ""}`}
                >
                  <div className="portal-pkg-header">
                    <h4>{p.name}</h4>
                    <span className={`badge badge-${p.type}`}>{p.type}</span>
                  </div>
                  <p className="pkg-cat-label">{p.category}</p>
                  <p className="pkg-desc">{p.description}</p>
                  <p className="pkg-why">
                    <strong>Why?</strong> {p.why}
                  </p>
                  <button
                    className={`btn-toggle${p.selected ? " active" : ""}`}
                    onClick={() => handleToggle(p.id)}
                  >
                    {p.selected ? "✓ Selected" : "+ Add to setup"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION: MY SETUP
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeSection === "My Setup" && (
        <main className="distro-main">
          <div className="section-header">
            <h2 className="section-title">My Setup</h2>
            <p className="section-sub">
              {packages.length} packages total · {selected} selected for install
            </p>
          </div>

          <div className="setup-grid">
            {/* Add package form */}
            <div className="panel add-form-panel">
              <h3>Add a Custom Package</h3>
              <form className="item-form" onSubmit={handleAddPackage}>
                <label htmlFor="pkg-name-input">
                  Package name
                  <input
                    id="pkg-name-input"
                    type="text"
                    name="name"
                    placeholder="e.g. Neovim, Kitty, Rofi…"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </label>
                <label htmlFor="pkg-type-select">
                  Type
                  <select
                    id="pkg-type-select"
                    name="type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                  >
                    <option value="package">package</option>
                    <option value="configuration">configuration</option>
                    <option value="script">script</option>
                  </select>
                </label>
                <button type="submit">+ Add Package</button>
              </form>
            </div>

            {/* Package list */}
            <div className="panel">
              <h3>Package List</h3>
              {packages.length === 0 ? (
                <p className="empty">No packages yet. Add one using the form.</p>
              ) : (
                <ul className="item-list">
                  {packages.map((p) => (
                    <PackageCard
                      key={p.id}
                      pkg={p}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-icon">⚡</span> <strong>PkgPulse</strong>
          </div>
          <p className="footer-tagline">
            Build your perfect Linux setup — pick packages, generate install scripts instantly.
          </p>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("Distributions"); setSelectedDistro(null); }}>Distributions</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("Browse Packages"); }}>Browse Packages</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection("My Setup"); }}>My Setup</a>
          </div>
          <p className="footer-copy">
            © 2026 PkgPulse · Proiect Tehnologii Web · Made with React + Vite
          </p>
        </div>
      </footer>
    </>
  );
}