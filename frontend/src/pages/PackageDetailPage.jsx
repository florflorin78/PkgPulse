import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPackage } from "../api.js";
import { installCommand } from "../helpers.js";
import styles from "./PackageDetailPage.module.css";

export default function PackageDetailPage({ distros }) {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <code className="command">{installCommand([pkg.install], m)}</code>
            </li>
          );
        })}
      </ul>
      {notIn.length > 0 && (
        <p className="warning">
          Not in the official repos of: {notIn.map((d) => d.name).join(", ")}.
        </p>
      )}
    </section>
  );
}
