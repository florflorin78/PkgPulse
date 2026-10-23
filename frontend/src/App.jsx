import { useState } from "react";
import { initialPackages, countSelected, filterByDistro } from "./packages.js";
import DistroCard from "./components/DistroCard.jsx";
import PackageCard from "./components/PackageCard.jsx";
import { distros } from "./data/distros.js";



export default function App() {
  // keep packages in state so changes re-render the page
  const [packages, setPackages] = useState(initialPackages);

  // Count selected packages
  const selected = countSelected(packages);

  // form fields state
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("package");

  // handle adding a new package
  function handleAddPackage(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed === "") return; // dont add empty names

    const nextId = packages.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const newPkg = {
      id: nextId,
      name: trimmed,
      selected: false,
      type: newType,
      category: "Utilities", // default for now
    };
    setPackages([...packages, newPkg]);
    setNewName(""); // reset the input
    setNewType("package");
  }

  // toggle the selected status of a package
  function handleToggle(id) {
    setPackages(packages.map((p) =>
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  }

  // delete a package from the list
  function handleDelete(id) {
    setPackages(packages.filter((p) => p.id !== id));
  }

  // search bar state
  const [searchTerm, setSearchTerm] = useState("");

  // filter distros based on search
  const filteredDistros = distros.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // which distro portal is open (null = show grid)
  const [selectedDistro, setSelectedDistro] = useState(null);

  // generate a simple install script based on distro
  function generateScript(distro) {
    const selectedPkgs = packages.filter((p) => p.selected);
    if (selectedPkgs.length === 0) return "# No packages selected yet";

    const names = selectedPkgs.map((p) => p.name.toLowerCase()).join(" ");
    switch (distro.pkgManager) {
      case "pacman":
        return `sudo pacman -S ${names}`;
      case "apt":
        return `sudo apt install ${names}`;
      case "dnf":
        return `sudo dnf install ${names}`;
      case "nix":
        return `nix-env -iA nixpkgs.${selectedPkgs.map((p) => p.name.toLowerCase()).join(" nixpkgs.")}`;
      case "emerge":
        return `sudo emerge ${names}`;
      default:
        return `# Install: ${names}`;
    }
  }

  return (
    <>
      {/* Navigation bar */}
      <nav className="navbar">
        <a href="#" className="nav-brand">PkgPulse</a>
        <ul className="nav-links">
          <li><a href="#">Distributions</a></li>
          <li><a href="#">Applications</a></li>
          <li><a href="#">Ricing Dots</a></li>
        </ul>
      </nav>

      {/* Header */}
      <header>
        <h1>PkgPulse</h1>
        <p>Select your Linux distribution to configure installation, packages, and ricing:</p>
      </header>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search distributions (e.g., Arch, Ubuntu, Fedora)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Distributions grid OR portal */}
      <main className="distro-main">
        {selectedDistro === null ? (
          // Grid view
          <div className="grid-view">
            {filteredDistros.length === 0 ? (
              <p className="empty">No distributions match your search.</p>
            ) : (
              filteredDistros.map((d) => (
                <DistroCard key={d.id} distro={d} onClick={setSelectedDistro} />
              ))
            )}
          </div>
        ) : (
          // Portal view for one distro
          <div className="portal-view panel">
            <button className="back-btn" onClick={() => setSelectedDistro(null)}>
              ← Back to Distributions
            </button>
            <h2>{selectedDistro.name}</h2>
            <p>Configuration portal for {selectedDistro.name} ({selectedDistro.info})</p>

            {/* Compatible packages for this distro */}
            <div className="portal-packages">
              <h3>Available packages for {selectedDistro.name}:</h3>
              {filterByDistro(packages, selectedDistro.id).length === 0 ? (
                <p className="empty">No compatible packages for this distro yet.</p>
              ) : (
                <div className="portal-pkg-list">
                  {filterByDistro(packages, selectedDistro.id).map((p) => (
                    <div className={"portal-pkg-card" + (p.selected ? " pkg-active" : "")} key={p.id}>
                      <div className="portal-pkg-header">
                        <h4>{p.name}</h4>
                        <span className={"badge badge-" + p.type}>{p.type}</span>
                      </div>
                      <p className="pkg-desc">{p.description}</p>
                      <p className="pkg-why"><strong>Why?</strong> {p.why}</p>
                      <button
                        className="btn-toggle"
                        onClick={() => handleToggle(p.id)}
                      >
                        {p.selected ? "✓ Selected" : "Add to setup"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="portal-options">
              <h3>Generated install command:</h3>
              <pre className="code-preview">
                <code>{generateScript(selectedDistro)}</code>
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* My packages section */}
      <section className="packages-section">
        <h2>My Packages</h2>
        <p className="app-count">
          {packages.length} packages, {selected} selected
        </p>

        <div className="packages-grid">
          {/* Add package form */}
          <div className="panel add-form-panel">
            <h3>Add a new package</h3>
            <form className="item-form" onSubmit={handleAddPackage}>
              <label>
                Package name
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Neovim, Firefox, Kitty..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </label>
              <label>
                Type
                <select
                  name="type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="package">package</option>
                  <option value="configuration">configuration</option>
                  <option value="script">script</option>
                </select>
              </label>
              <button type="submit">Add Package</button>
            </form>
          </div>

          {/* Package list */}
          <div className="panel">
            <h3>Package list</h3>
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
      </section>

      <footer className="app-footer">
        PkgPulse &copy; 2026 &middot; Proiect Tehnologii Web
      </footer>
    </>
  );
}