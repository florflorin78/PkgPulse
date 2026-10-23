// PackageCard — shows one package in the "My Packages" list with toggle and delete
export default function PackageCard({ pkg, onToggle, onDelete }) {
  return (
    <li className={`item-card${pkg.selected ? " selected" : ""}`}>
      <div className="item-card-left">
        <div className="item-card-title-row">
          <h3>{pkg.name}</h3>
          <span className={`badge badge-${pkg.type}`}>{pkg.type}</span>
        </div>
        <span className="item-card-category">{pkg.category}</span>
      </div>
      <div className="item-actions">
        <button
          className={`btn-toggle${pkg.selected ? " active" : ""}`}
          onClick={() => onToggle(pkg.id)}
          aria-label={pkg.selected ? `Deselect ${pkg.name}` : `Select ${pkg.name}`}
        >
          {pkg.selected ? "✓ Selected" : "Select"}
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(pkg.id)}
          aria-label={`Delete ${pkg.name}`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
