import { useState } from "react";
import { CATEGORIES, NAME_MAX, TYPES } from "../constants.js";
import styles from "./PackageForm.module.css";

export default function PackageForm({ onAdd }) {
  const [name, setName] = useState("");
  const [install, setInstall] = useState("");
  const [type, setType] = useState("package");
  const [category, setCategory] = useState("Apps");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  function validate() {
    const cleanName = name.trim();
    const cleanInstall = install.trim();
    if (cleanName === "") {
      return { field: "name", message: "The name is required." };
    }
    if (cleanName.length > NAME_MAX) {
      return { field: "name", message: `The name can have at most ${NAME_MAX} characters.` };
    }
    if (cleanInstall === "") {
      return { field: "install", message: "The install name is required." };
    }
    if (cleanInstall.includes(" ")) {
      return { field: "install", message: "The install name cannot contain spaces." };
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSending(true);
    try {
      await onAdd({ name: name.trim(), install: install.trim(), type, category });
      setName("");
      setInstall("");
      setType("package");
      setCategory("Apps");
    } catch (err) {
      setError({ field: "server", message: err.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Neovim"
          maxLength={NAME_MAX}
          aria-invalid={error !== null && error.field === "name"}
          data-testid="form-title"
        />
      </label>

      <label>
        Install name
        <input
          type="text"
          value={install}
          onChange={(e) => setInstall(e.target.value)}
          placeholder="e.g. neovim"
          aria-invalid={error !== null && error.field === "install"}
          data-testid="form-install"
        />
      </label>

      <label>
        Type
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          data-testid="form-type"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="form-category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" className="btn-primary" disabled={sending} data-testid="form-submit">
        {sending ? "Saving..." : "Add package"}
      </button>

      {error && (
        <p className={`error ${styles.formError}`} data-testid="form-error">
          {error.message}
        </p>
      )}
    </form>
  );
}
