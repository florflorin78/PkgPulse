export default function DistroCard({ distro, isChosen, onChoose }) {
  return (
    <button
      className={isChosen ? "card distro-card chosen" : "card distro-card"}
      onClick={() => onChoose(distro.id)}
      aria-pressed={isChosen}
    >
      <span className="big-icon">{distro.icon}</span>
      <h3 style={{ color: distro.color }}>{distro.name}</h3>
      <span className={`badge level-${distro.level.toLowerCase()}`}>{distro.level}</span>
      <p className="for-who">For: {distro.forWho}</p>
      <p>{distro.description}</p>
      <p className="muted">Package manager: {distro.manager}</p>
      {isChosen && <p className="chosen-text">✓ Your choice</p>}
    </button>
  );
}
