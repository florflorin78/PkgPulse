import PackageCard from "./PackageCard.jsx";

export default function PackageList({ packages, distro, onToggle, onDelete }) {
  if (packages.length === 0) {
    return <p className="empty">No packages to show.</p>;
  }

  return (
    <ul className="package-list">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          pkg={pkg}
          distro={distro}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
