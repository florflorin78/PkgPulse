import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/constants.js";
import { TRENDS } from "../data/fun.js";
import {
  canUseFlatpak,
  getCategoryStyle,
  isAvailable,
  searchByName,
  sortPackages,
} from "../helpers.js";
import Mascot from "../components/visuals/Mascot.jsx";
import PackageForm from "../components/feed/PackageForm.jsx";
import PackageList from "../components/feed/PackageList.jsx";
import usePageTitle from "../usePageTitle.js";
import styles from "./PackagesPage.module.css";

const PAGE_SIZE = 12;

function newSeed() {
  return Math.floor(Math.random() * 1000000);
}

export default function PackagesPage({
  packages,
  distros,
  distro,
  loading,
  onChooseDistro,
  onAdd,
  onToggle,
  onDelete,
}) {
  usePageTitle("Feed");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState("random");
  // a new seed gives a new random order of the feed
  const [seed, setSeed] = useState(newSeed);
  const [toast, setToast] = useState(null);
  const [count, setCount] = useState(PAGE_SIZE);
  const sentinel = useRef(null);

  let shown = searchByName(packages, search);
  if (category !== "All") {
    shown = shown.filter((p) => p.category === category);
  }
  if (onlyRecommended) {
    shown = shown.filter((p) => p.recommended);
  }
  if (onlyAvailable && distro) {
    shown = shown.filter((p) => isAvailable(p, distro) || canUseFlatpak(p, distro));
  }
  shown = sortPackages(shown, sort, seed);

  // the feed shows a few posts and loads more while you scroll
  const visible = shown.slice(0, count);
  const hasMore = visible.length < shown.length;

  const selectedList = packages.filter((p) => p.selected);
  const hot = packages.filter((p) => p.trending).slice(0, 6);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((prev) => prev + PAGE_SIZE);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [hasMore, count]);

  // every change of the filters starts the feed again from the top
  function handleSearch(e) {
    setSearch(e.target.value);
    setCount(PAGE_SIZE);
  }

  function handleCategory(name) {
    setCategory(name);
    setCount(PAGE_SIZE);
  }

  function handleRecommended() {
    setOnlyRecommended(!onlyRecommended);
    setCount(PAGE_SIZE);
  }

  function handleAvailable() {
    setOnlyAvailable(!onlyAvailable);
    setCount(PAGE_SIZE);
  }

  function handleSort(e) {
    setSort(e.target.value);
    setCount(PAGE_SIZE);
  }

  function handleShuffle() {
    setSeed(newSeed());
    setSort("random");
    setCount(PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // a small message at the bottom of the screen after a click
  async function handleToggle(id) {
    const pkg = packages.find((p) => p.id === id);
    await onToggle(id);
    setToast(pkg.selected ? `Removed ${pkg.name} from My Setup` : `✓ ${pkg.name} added to My Setup`);
  }

  // like a new post: it shows at the top of the feed
  async function handleAddPost(data) {
    await onAdd(data);
    setSearch("");
    setCategory("All");
    setOnlyRecommended(false);
    setOnlyAvailable(false);
    setSort("newest");
    setCount(PAGE_SIZE);
  }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Loading packages...
      </p>
    );
  }

  return (
    <div className={styles.page}>
      <aside className={styles.left}>
        <h2>Topics</h2>
        <button
          className={category === "All" ? `${styles.topic} ${styles.active}` : styles.topic}
          onClick={() => handleCategory("All")}
        >
          <span>✨ All</span>
          <span className={styles.number}>{packages.length}</span>
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={category === c ? `${styles.topic} ${styles.active}` : styles.topic}
            onClick={() => handleCategory(c)}
          >
            <span>
              {getCategoryStyle(c).emoji} {c}
            </span>
            <span className={styles.number}>
              {packages.filter((p) => p.category === c).length}
            </span>
          </button>
        ))}

        <div className={styles.filters}>
          <label className={styles.checkLabel}>
            <input type="checkbox" checked={onlyRecommended} onChange={handleRecommended} />
            Only recommended for beginners
          </label>
          {distro && (
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={onlyAvailable} onChange={handleAvailable} />
              Only what I can install on {distro.name}
            </label>
          )}
        </div>
      </aside>

      <section className={styles.feed}>
        <div className={styles.stories}>
          {distros.map((d) => (
            <button
              key={d.id}
              className={distro && distro.id === d.id ? `${styles.story} ${styles.chosen}` : styles.story}
              onClick={() => onChooseDistro(d.id)}
              aria-pressed={distro !== undefined && distro.id === d.id}
              title={d.name}
            >
              <span className={styles.ring} style={{ borderColor: d.color }}>
                <Mascot id={d.id} color={d.color} size={46} still />
              </span>
              <span className={styles.storyName}>{d.name}</span>
            </button>
          ))}
        </div>

        {distro ? (
          <p className="tip">
            Showing install commands for <strong>{distro.name}</strong>.{" "}
            <Link to="/distros">More about distros</Link>
          </p>
        ) : (
          <section className={styles.hero}>
            <h2>Set up Linux in 3 steps</h2>
            <ol className={styles.heroSteps}>
              <li>
                <strong>1.</strong> Pick your distro in the circles above, or{" "}
                <Link to="/quiz">take the quiz</Link>
              </li>
              <li>
                <strong>2.</strong> Tick &quot;Add to My Setup&quot; on the apps you want
              </li>
              <li>
                <strong>3.</strong> Copy one command in <Link to="/setup">My Setup</Link>
              </li>
            </ol>
          </section>
        )}

        <section className={`card ${styles.add}`}>
          <h3>Add your own package</h3>
          <PackageForm onAdd={handleAddPost} />
        </section>

        <div className={styles.toolbar}>
          <input
            type="text"
            className={styles.searchBox}
            placeholder="Search packages..."
            value={search}
            onChange={handleSearch}
            aria-label="Search packages"
          />
          <select value={sort} onChange={handleSort} aria-label="Sort packages">
            <option value="random">✨ For you (mixed)</option>
            <option value="popular">Popular first</option>
            <option value="trending">Trending first</option>
            <option value="newest">Newest first</option>
            <option value="name">A to Z</option>
          </select>
          <button className={styles.shuffle} onClick={handleShuffle} title="Mix the feed again">
            🔀 Shuffle
          </button>
        </div>
        <p className="muted">
          Showing {visible.length} of {shown.length} packages
        </p>

        <PackageList
          packages={visible}
          distro={distro}
          onToggle={handleToggle}
          onDelete={onDelete}
          distros={distros}
          seed={seed}
          withMemes={search === ""}
        />

        {hasMore ? (
          <p ref={sentinel} className={styles.more}>
            Loading more...
          </p>
        ) : (
          shown.length > 0 && (
            <p className={styles.more}>
              You reached the end 🎉{" "}
              <button className={styles.shuffle} onClick={handleShuffle}>
                🔀 Mix it again
              </button>
            </p>
          )
        )}
      </section>

      {toast && (
        <p key={toast} className={styles.toast} role="status">
          {toast}
        </p>
      )}

      <aside className={styles.right}>
        <section className="card">
          <h3>My Setup</h3>
          {selectedList.length === 0 ? (
            <p className="empty">Nothing yet. Tick "Add to My Setup" on a post.</p>
          ) : (
            <ul className={styles.mini}>
              {selectedList.slice(0, 6).map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
              {selectedList.length > 6 && <li>and {selectedList.length - 6} more</li>}
            </ul>
          )}
          <Link to="/setup" className="btn-primary">
            Get the install command
          </Link>
        </section>

        <section className="card">
          <h3>🔥 Trending in Linux</h3>
          <ul className={styles.trends}>
            {TRENDS.map((t) => (
              <li key={t.id}>
                <span className={styles.trendEmoji}>{t.emoji}</span>
                <div>
                  {t.link.startsWith("/") ? (
                    <Link to={t.link}>{t.title}</Link>
                  ) : (
                    <a href={t.link} target="_blank" rel="noreferrer">
                      {t.title}
                    </a>
                  )}
                  <p className="muted">{t.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h3>Hot packages</h3>
          <div className={styles.hot}>
            {hot.map((p) => (
              <Link key={p.id} to={`/packages/${p.id}`} className={styles.hotItem}>
                {getCategoryStyle(p.category).emoji} {p.name}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
