import PackageCard from "./PackageCard.jsx";
import styles from "./PackageList.module.css";

export default function PackageList({ packages, distro, onToggle, onDelete }) {
  if (packages.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        No packages to show.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
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
