// PackageCard - shows one package with toggle and delete buttons
export default function PackageCard({ pkg, onToggle, onDelete }) {
  return (
    <li className={pkg.selected ? "item-card" : "item-card done"}>
      <div>
        <h3>{pkg.name}</h3>
        <span className={"badge badge-" + pkg.type}>{pkg.type}</span>
      </div>
      <div className="item-actions">
        <button
          className="btn-toggle"
          onClick={() => onToggle(pkg.id)}
        >
          {pkg.selected ? "Deselect" : "Select"}
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(pkg.id)}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
