import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPackage } from "../api.js";
import { flatpakCommand, installCommand, youtubeSearch } from "../helpers.js";
import PackageMedia from "../components/visuals/PackageMedia.jsx";
import Playground from "../components/visuals/Playground.jsx";
import { DEMOS } from "../data/demos.js";
import usePageTitle from "../usePageTitle.js";
import styles from "./PackageDetailPage.module.css";
import CommandBox from "../components/CommandBox.jsx";

export default function PackageDetailPage({ distros, packages }) {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageTitle(pkg ? pkg.name : "Package");

  // runs again when the id in the address changes
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchPackage(id);
        if (!ignore) {
          setPkg(data);
          setError(null);
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
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <section className="card">
        <p className="error" data-testid="error">
          The package could not be loaded: {error}
        </p>
        <Link to="/">Back to the list</Link>
      </section>
    );
  }

  const notIn = distros.filter((d) => !pkg.managers.includes(d.manager));

  return (
    <section className={`card ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Back to the list
      </Link>
      <h2 data-testid="detail-title">{pkg.name}</h2>
      <div>
        <span className="badge">{pkg.type}</span>
        <span className="badge">{pkg.category}</span>
        {pkg.recommended && <span className="badge badge-recommended">recommended</span>}
      </div>

      <PackageMedia pkg={pkg} big />

      {pkg.highlight && <p className={styles.highlight}>★ {pkg.highlight}</p>}

      <p>{pkg.description}</p>
      <p>
        <strong>Why install it?</strong> {pkg.why}
      </p>

      <dl className={styles.fields}>
        <dt>Status</dt>
        <dd>{pkg.selected ? "Selected" : "Not selected"}</dd>
        <dt>Install name</dt>
        <dd>{pkg.install}</dd>
        <dt>ID</dt>
        <dd>{pkg.id}</dd>
      </dl>

      <p>
        <a href={youtubeSearch(pkg.name)} target="_blank" rel="noreferrer">
          ▶ Watch tutorials on YouTube
        </a>
      </p>

      <h3>Try it</h3>
      <p className="muted">Press Enter to run the command in a pretend terminal, then try your own.</p>
      <Playground
        key={pkg.id}
        packages={packages}
        start={DEMOS[pkg.install] ? DEMOS[pkg.install].command : `sudo apt install ${pkg.install}`}
      />

      <h3>How to install it</h3>
      <ul className={styles.commands}>
        {pkg.managers.map((m) => {
          const names = distros
            .filter((d) => d.manager === m)
            .map((d) => d.name)
            .join(", ");
          return (
            <li key={m}>
              <strong>{m}</strong> {names && <span className="muted">({names})</span>}
              <CommandBox command={installCommand([pkg.install], m)} />
            </li>
          );
        })}
        {pkg.flatpak && (
          <li>
            <strong>flatpak</strong> <span className="muted">(any distro)</span>
            <CommandBox command={flatpakCommand([pkg.flatpak])} />
          </li>
        )}
      </ul>
      {pkg.managers.length === 0 && (
        <p className="warning">It is not in the official repos of any distro.</p>
      )}
      {pkg.managers.length > 0 && notIn.length > 0 && (
        <p className="warning">
          Not in the official repos of: {notIn.map((d) => d.name).join(", ")}.
        </p>
      )}
    </section>
  );
}
