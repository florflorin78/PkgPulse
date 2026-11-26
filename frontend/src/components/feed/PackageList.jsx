import { Fragment } from "react";
import { MEMES, TIPS } from "../../data/fun.js";
import { randomRank } from "../../helpers.js";
import MemeCard from "./MemeCard.jsx";
import PackageCard from "./PackageCard.jsx";
import SpotlightCard from "./SpotlightCard.jsx";
import TipCard from "./TipCard.jsx";
import styles from "./PackageList.module.css";

// after every 5 posts the feed shows something else: a meme, a distro or a tip
const EXTRA_EVERY = 5;

// all the extras in a mixed order; every one is shown only once
function buildExtras(distros, seed) {
  const all = [
    ...MEMES.map((m) => ({ key: "meme-" + m.id, type: "meme", item: m })),
    ...distros.map((d) => ({ key: "distro-" + d.id, type: "spotlight", item: d })),
    ...TIPS.map((t) => ({ key: "tip-" + t.title, type: "tip", item: t })),
  ];
  return all.sort((a, b) => randomRank(a.key, seed) - randomRank(b.key, seed));
}

function renderExtra(extra) {
  if (extra.type === "spotlight") return <SpotlightCard distro={extra.item} />;
  if (extra.type === "tip") return <TipCard tip={extra.item} />;
  return <MemeCard meme={extra.item} />;
}

export default function PackageList({
  packages,
  distro,
  distros = [],
  seed = 1,
  onToggle,
  onDelete,
  withMemes,
}) {
  if (packages.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        No packages to show.
      </p>
    );
  }

  const extras = buildExtras(distros, seed);

  return (
    <ul className={styles.list}>
      {packages.map((pkg, i) => {
        const extra = (i + 1) % EXTRA_EVERY === 0 ? extras[(i + 1) / EXTRA_EVERY - 1] : undefined;
        return (
          <Fragment key={pkg.id}>
            <PackageCard pkg={pkg} distro={distro} onToggle={onToggle} onDelete={onDelete} />
            {withMemes && extra && renderExtra(extra)}
          </Fragment>
        );
      })}
    </ul>
  );
}
