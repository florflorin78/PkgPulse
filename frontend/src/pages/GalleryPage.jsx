import { useNavigate } from "react-router-dom";
import { PRESETS, getPiece } from "../data/customize.js";
import usePageTitle from "../usePageTitle.js";
import styles from "./GalleryPage.module.css";

export default function GalleryPage() {
  usePageTitle("Gallery");
  const navigate = useNavigate();

  return (
    <>
      <h2>Rice gallery</h2>
      <p className="tip">
        Desktops made with the PkgPulse editor. Open one in Customize, change what you want
        and install all its packages in one click.
      </p>

      <div className={styles.gallery}>
        {PRESETS.map((preset) => (
          <figure key={preset.id} className={`card ${styles.item}`}>
            <img
              src={`/img/rices/${preset.id}.png`}
              alt={`${preset.name} desktop`}
              loading="lazy"
              className={styles.image}
            />
            <figcaption>
              <h3>
                {preset.emoji} {preset.name}
              </h3>
              <p className="muted">
                {getPiece(preset.rice.wm).name} · {getPiece(preset.rice.bar).name} ·{" "}
                {getPiece(preset.rice.terminal).name} · {getPiece(preset.rice.colors).name}
              </p>
              <button
                className="btn-primary"
                onClick={() => navigate("/customize", { state: { preset: preset.id } })}
              >
                Try it in Customize
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
