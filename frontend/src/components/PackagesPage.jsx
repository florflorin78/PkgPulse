import { useState } from "react";
import { getCategories, searchByName } from "../helpers.js";
import PackageList from "./PackageList.jsx";

export default function PackagesPage({ packages, distro, onToggle, onDelete }) {
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
          Showing install commands for <strong>{distro.name}</strong>.
        </p>
      ) : (
        <p className="tip">Choose a distro first to see how to install each package.</p>
      )}

      <div className="filters">
        <input
          type="text"
          className="search"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search packages"
        />
        <label className="check-label">
          <input
            type="checkbox"
            checked={onlyRecommended}
            onChange={() => setOnlyRecommended(!onlyRecommended)}
          />
          Only recommended for beginners
        </label>
      </div>

      <div className="tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? "tab active" : "tab"}
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
  );
}
