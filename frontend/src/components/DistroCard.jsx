// DistroCard — shows one linux distribution in the grid
export default function DistroCard({ distro, onClick }) {
  return (
    <button
      className="panel distro-card"
      onClick={() => onClick(distro)}
      aria-label={`Open ${distro.name} portal`}
    >
      <span className="distro-icon">{distro.icon}</span>
      <h2 style={{ color: distro.color }}>{distro.name}</h2>
      <p className="distro-info">{distro.info}</p>
      <span className={`difficulty-badge difficulty-${distro.difficulty?.toLowerCase()}`}>
        {distro.difficulty}
      </span>
    </button>
  );
}
