// DistroCard - shows one linux distribution in the grid
export default function DistroCard({ distro, onClick }) {
  return (
    <a
      href="#"
      className="panel distro-card"
      onClick={(e) => {
        e.preventDefault();
        onClick(distro);
      }}
    >
      <h2>{distro.name}</h2>
      <p>{distro.info}</p>
    </a>
  );
}
