import { installCommand, isAvailable } from "../helpers.js";

export default function PackageCard({ pkg, distro, onToggle, onDelete }) {
  let installInfo = <p className="muted">Choose a distro to see the install command.</p>;
  if (distro && isAvailable(pkg, distro)) {
    installInfo = <code className="command">{installCommand([pkg.install], distro.manager)}</code>;
  } else if (distro) {
    installInfo = <p className="warning">Not in the official {distro.name} repos.</p>;
  }

  return (
    <li className={pkg.selected ? "package-card selected" : "package-card"}>
      <label className="package-main">
        <input
          type="checkbox"
          checked={pkg.selected}
          onChange={() => onToggle(pkg.id)}
        />
        <div>
          <h3>{pkg.name}</h3>
          <span className={`badge badge-${pkg.type}`}>{pkg.type}</span>
          {pkg.recommended && <span className="badge badge-recommended">recommended</span>}
        </div>
      </label>

      <p>{pkg.description}</p>
      <p className="why">
        <strong>Why install it?</strong> {pkg.why}
      </p>
      {installInfo}

      <button
        className="btn-danger"
        onClick={() => onDelete(pkg.id)}
        aria-label={`Delete ${pkg.name}`}
      >
        Delete
      </button>
    </li>
  );
}
