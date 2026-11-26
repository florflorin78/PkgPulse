import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchDistro } from "../api.js";
import { installCommand, isAvailable, updateCommand, youtubeSearch } from "../helpers.js";
import DistroDesktop from "../components/visuals/DistroDesktop.jsx";
import Mascot from "../components/visuals/Mascot.jsx";
import VideoPlayer from "../components/visuals/VideoPlayer.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./DistroDetailPage.module.css";
import CommandBox from "../components/CommandBox.jsx";

export default function DistroDetailPage({ packages, distroId, onChoose }) {
  const { id } = useParams();
  const [distro, setDistro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageTitle(distro ? distro.name : "Distro");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchDistro(id);
        if (!ignore) {
          setDistro(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <section className="card">
        <p className="error" data-testid="error">
          The distro could not be loaded: {error}
        </p>
        <Link to="/distros">Back to the distros</Link>
      </section>
    );
  }

  const inRepos = packages.filter((p) => isAvailable(p, distro)).length;
  const isChosen = distroId === distro.id;

  return (
    <article className={styles.page} data-testid="distro-detail">
      <Link to="/distros" className={styles.back}>
        ← All distros
      </Link>

      <header
        className={styles.cover}
        style={{ background: `linear-gradient(135deg, ${distro.color}, #111827)` }}
      >
        <Mascot id={distro.id} color={distro.color} size={120} />
        <div>
          <h2>{distro.name}</h2>
          <p className={styles.highlight}>★ {distro.highlight}</p>
          <p>{distro.description}</p>
          <div>
            <span className="badge">{distro.level}</span>
            {distro.trending && <span className="badge badge-trending">🔥 trending</span>}
          </div>
        </div>
      </header>

      <section className={`card ${styles.looks}`}>
        <h3>How {distro.name} looks</h3>
        <DistroDesktop distro={distro} callouts />
        <p className="muted">
          A drawing of the default desktop ({distro.desktop}). The real one can look a bit
          different, and you can change everything.
        </p>
      </section>

      <div className={styles.columns}>
        <section className="card">
          <h3>Facts</h3>
          <dl className={styles.facts}>
            <dt>Good for</dt>
            <dd>{distro.forWho}</dd>
            <dt>Based on</dt>
            <dd>{distro.basedOn}</dd>
            <dt>Desktop</dt>
            <dd>{distro.desktop}</dd>
            <dt>Updates</dt>
            <dd>{distro.release}</dd>
            <dt>Package manager</dt>
            <dd>{distro.manager}</dd>
            <dt>In the repos</dt>
            <dd>
              {inRepos} of {packages.length} PkgPulse packages
            </dd>
            <dt>Website</dt>
            <dd>
              <a href={distro.website} target="_blank" rel="noreferrer">
                {distro.website.replace("https://", "")}
              </a>
            </dd>
          </dl>

          <button
            className={isChosen ? "btn-secondary" : "btn-primary"}
            onClick={() => onChoose(distro.id)}
          >
            {isChosen ? "✓ This is your distro" : `Choose ${distro.name}`}
          </button>
        </section>

        <section className="card">
          <h3>How to install it</h3>
          {distro.video ? (
            <VideoPlayer id={distro.video} title={`Install ${distro.name}`} />
          ) : (
            <p className="muted">No video picked yet for this distro.</p>
          )}
          <p>
            <a href={youtubeSearch(distro.name + " install")} target="_blank" rel="noreferrer">
              ▶ More videos on YouTube
            </a>{" "}
            · <Link to="/learn/install-linux">Read the 7 step guide</Link>
          </p>
        </section>
      </div>

      <div className={styles.columns}>
        <section className={`card ${styles.pros}`}>
          <h3>👍 Good</h3>
          <ul>
            {distro.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section className={`card ${styles.cons}`}>
          <h3>👎 Not so good</h3>
          <ul>
            {distro.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card">
        <h3>Your first commands on {distro.name}</h3>
        <CommandBox command={updateCommand(distro.manager)} />
        <CommandBox command={installCommand(["git", "curl", "htop"], distro.manager)} />
        <Link to="/setup">Build the full command in My Setup →</Link>
      </section>
    </article>
  );
}
