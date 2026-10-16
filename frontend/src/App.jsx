  import { packages, countSelected } from "./packages.js";

const distros = [
  { id: "arch", name: "Arch Linux", info: "Pacman / AUR / Ricing" },
  { id: "manjaro", name: "Manjaro", info: "Arch Family" },
  { id: "endeavouros", name: "EndeavourOS", info: "Arch Family" },
  { id: "garuda", name: "Garuda Linux", info: "Arch Family / Gaming" },
  { id: "ubuntu", name: "Ubuntu", info: "APT / Debian" },
  { id: "debian", name: "Debian", info: "APT Family / Stable" },
  { id: "mint", name: "Linux Mint", info: "APT Family / Desktop" },
  { id: "pop", name: "Pop!_OS", info: "APT / Developer Focused" },
  { id: "fedora", name: "Fedora", info: "DNF / RPM / Modern" },
  { id: "rhel", name: "RHEL", info: "Enterprise Linux" },
  { id: "nixos", name: "NixOS", info: "Declarative Config" },
  { id: "gentoo", name: "Gentoo", info: "Source-based" },
];

export default function App() {
  // Count selected packages with import func
  const selected = countSelected(packages);

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

      {/* Search bar (Later) */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search distributions (e.g., Arch, Ubuntu, Fedora)..."
        />
      </div>

      {/* Distributions grid */}
      <main className="distro-main">
        <div className="grid-view">
          {distros.map((d) => (
            <a href="#" className="panel distro-card" key={d.id}>
              <h2>{d.name}</h2>
              <p>{d.info}</p>
            </a>
          ))}
        </div>
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
            <form className="item-form">
              <label>
                Package name
                <input type="text" name="name" placeholder="e.g. Neovim, Firefox, Kitty..." />
              </label>
              <label>
                Type
                <select name="type">
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
            <ul className="item-list">
              {packages.map((p) => (
                <li className={p.selected ? "item-card" : "item-card done"} key={p.id}>
                  <div>
                    <h3>{p.name}</h3>
                    <span className={"badge badge-" + p.type}>{p.type}</span>
                  </div>
                  <span className="status">{p.selected ? "Selected" : "Not selected"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        PkgPulse &copy; 2026 &middot; Proiect Tehnologii Web
      </footer>
    </>
  );
}