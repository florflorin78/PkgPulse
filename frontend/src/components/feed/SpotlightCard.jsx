import { Link } from "react-router-dom";
import DistroDesktop from "../visuals/DistroDesktop.jsx";
import Mascot from "../visuals/Mascot.jsx";
import styles from "./FeedExtras.module.css";

export default function SpotlightCard({ distro }) {
  return (
    <li className={styles.spotlight} data-testid="spotlight">
      <div className={styles.head}>
        <Mascot id={distro.id} color={distro.color} size={52} />
        <div>
          <span className={styles.tag}>🌟 Distro spotlight</span>
          <h3>{distro.name}</h3>
          <p className={styles.muted}>For: {distro.forWho}</p>
        </div>
      </div>
      <DistroDesktop distro={distro} callouts />
      <div className={styles.foot}>
        <span>
          <strong>★ {distro.highlight}.</strong> {distro.description}
        </span>
        <Link to={`/distros/${distro.id}`} className="btn-primary">
          Meet {distro.name}
        </Link>
      </div>
    </li>
  );
}
