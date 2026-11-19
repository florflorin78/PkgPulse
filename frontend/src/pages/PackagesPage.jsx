import { useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, searchByName } from "../helpers.js";
import PackageForm from "../components/PackageForm.jsx";
import PackageList from "../components/PackageList.jsx";
import styles from "./PackagesPage.module.css";

export default function PackagesPage({ packages, distro, loading, onAdd, onToggle, onDelete }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyRecommended, setOnlyRecommended] = useState(false);

  const categories = ["All", ...getCategories(packages)];

  let shown = searchByName(packages, search);
  if (category !== "All") {
    shown = shown.filter((p) => p.category === category);
  }
  if (onlyRecommended) {
    shown = shown.filter((p) => p.recommended);
  }

  return (
    <>
      <h2>Packages</h2>
      {distro ? (
        <p className="tip">
          Showing install commands for <strong>{distro.name}</strong>.{" "}
          <Link to="/distros">Change distro</Link>
        </p>
      ) : (
        <p className="tip">
          New to Linux? <Link to="/distros">Choose your distro</Link> first, then tick the
          packages you want. Your install command will be waiting in{" "}
          <Link to="/setup">My Setup</Link>.
        </p>
      )}

      {loading && (
        <p className="info" data-testid="loading">
          Loading packages...
        </p>
      )}

      {!loading && (
        <>
          <section className={`card ${styles.add}`}>
            <h3>Add your own package</h3>
            <PackageForm onAdd={onAdd} />
          </section>

          <div className={styles.filters}>
            <input
              type="text"
              className="search"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search packages"
            />
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={onlyRecommended}
                onChange={() => setOnlyRecommended(!onlyRecommended)}
              />
              Only recommended for beginners
            </label>
          </div>

          <div className={styles.tabs}>
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? `${styles.tab} ${styles.active}` : styles.tab}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <PackageList
            packages={shown}
            distro={distro}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  );
}
