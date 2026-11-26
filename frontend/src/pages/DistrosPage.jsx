import { useState } from "react";
import { Link } from "react-router-dom";
import { MANAGERS } from "../data/constants.js";
import { searchByName } from "../helpers.js";
import DistroCard from "../components/DistroCard.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./DistrosPage.module.css";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function DistrosPage({ distros, distroId, onChoose }) {
  usePageTitle("Distros");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [manager, setManager] = useState("All");

  let shown = searchByName(distros, search);
  if (level !== "All") {
    shown = shown.filter((d) => d.level === level);
  }
  if (manager !== "All") {
    shown = shown.filter((d) => d.manager === manager);
  }

  return (
    <>
      <h2>Choose your distro</h2>
      <p className="tip">
        Not sure? <Link to="/quiz">Take the 1 minute quiz</Link>, or start with{" "}
        <strong>Linux Mint</strong> if you come from Windows.
      </p>

      <input
        type="text"
        className="search"
        placeholder="Search distros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search distros"
      />

      <div className={styles.filters}>
        <label>
          Level:{" "}
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="All">All</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          Package manager:{" "}
          <select value={manager} onChange={(e) => setManager(e.target.value)}>
            <option value="All">All</option>
            {MANAGERS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <span className="muted">
          {shown.length} of {distros.length} distros
        </span>
      </div>

      {shown.length === 0 ? (
        <p className="empty">No distro matches your search.</p>
      ) : (
        <div className="grid">
          {shown.map((d) => (
            <DistroCard
              key={d.id}
              distro={d}
              isChosen={d.id === distroId}
              onChoose={onChoose}
            />
          ))}
        </div>
      )}
    </>
  );
}
