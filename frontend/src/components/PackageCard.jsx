import { Link } from "react-router-dom";
import { installCommand, isAvailable } from "../helpers.js";
import styles from "./PackageCard.module.css";

export default function PackageCard({ pkg, distro, onToggle, onDelete }) {
  let installInfo = <p className="muted">Choose a distro to see the install command.</p>;
  if (distro && isAvailable(pkg, distro)) {
    installInfo = <code className="command">{installCommand([pkg.install], distro.manager)}</code>;
  } else if (distro) {
    installInfo = <p className="warning">Not in the official {distro.name} repos.</p>;
  }

  return (
    <li
      className={pkg.selected ? `${styles.card} ${styles.selected}` : styles.card}
      data-testid="item"
      data-id={pkg.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={pkg.selected}
          onChange={() => onToggle(pkg.id)}
          aria-label={`Select ${pkg.name}`}
          data-testid="item-toggle"
        />
        <div>
          <h3 className={styles.title}>
            <Link to={`/packages/${pkg.id}`} data-testid="item-link">
              {pkg.name}
            </Link>
          </h3>
          <span className={`badge badge-${pkg.type}`}>{pkg.type}</span>
          {pkg.recommended && <span className="badge badge-recommended">recommended</span>}
        </div>
      </div>

      <p>{pkg.description}</p>
      <p className={styles.why}>
        <strong>Why install it?</strong> {pkg.why}
      </p>
      {installInfo}

      <button
        className="btn-danger"
        onClick={() => onDelete(pkg.id)}
        aria-label={`Delete ${pkg.name}`}
        data-testid="item-delete"
      >
        Delete
      </button>
    </li>
  );
}
