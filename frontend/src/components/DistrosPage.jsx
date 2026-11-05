import { useState } from "react";
import { searchByName } from "../helpers.js";
import DistroCard from "./DistroCard.jsx";

export default function DistrosPage({ distros, distroId, onChoose }) {
  const [search, setSearch] = useState("");

  const shown = searchByName(distros, search);

  return (
    <>
      <h2>Choose your distro</h2>
      <p className="tip">
        Not sure? Start with <strong>Linux Mint</strong> if you come from Windows,
        or <strong>Fedora</strong> if you study programming.
      </p>

      <input
        type="text"
        className="search"
        placeholder="Search distros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search distros"
      />

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
