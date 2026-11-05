import { useState } from "react";
import { installCommand, isAvailable, updateCommand } from "../helpers.js";

export default function SetupPage({ packages, distros, distro, onChangeDistro, onToggle }) {
  const [copied, setCopied] = useState(false);

  const selected = packages.filter((p) => p.selected);

  let script = "";
  let missing = [];
  if (distro) {
    const available = selected.filter((p) => isAvailable(p, distro));
    missing = selected.filter((p) => !isAvailable(p, distro));
    const names = available.map((p) => p.install);
    script = updateCommand(distro.manager) + "\n" + installCommand(names, distro.manager);
  }

  function handleCopy() {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <h2>My Setup</h2>

      <label className="distro-select">
        My distro:{" "}
        <select value={distro ? distro.id : ""} onChange={(e) => onChangeDistro(e.target.value)}>
          <option value="" disabled>
            Choose a distro
          </option>
          {distros.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      <div className="setup">
        <section className="card">
          <h3>Selected packages ({selected.length})</h3>
          {selected.length === 0 ? (
            <p className="empty">Nothing selected yet. Go to Packages or Customize.</p>
          ) : (
            <ul className="selected-list">
              {selected.map((p) => (
                <li key={p.id}>
                  {p.name}
                  <button
                    className="btn-small"
                    onClick={() => onToggle(p.id)}
                    aria-label={`Remove ${p.name} from setup`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h3>Your install command</h3>
          {distro ? (
            <>
              <pre className="script">{script}</pre>
              <button className="btn-primary" onClick={handleCopy}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              {missing.length > 0 && (
                <p className="warning">
                  Not in the {distro.name} repos: {missing.map((p) => p.name).join(", ")}.
                  Try Flatpak or skip them.
                </p>
              )}
            </>
          ) : (
            <p className="empty">Choose your distro above to get the command.</p>
          )}

          <h3>How to run it</h3>
          <ol className="steps">
            <li>After installing Linux, open the Terminal (Ctrl + Alt + T).</li>
            <li>Paste the command with Ctrl + Shift + V and press Enter.</li>
            <li>Type your password. You will not see it while typing, that is normal.</li>
            <li>When it asks, press Y and Enter. Done!</li>
          </ol>
        </section>
      </div>
    </>
  );
}
