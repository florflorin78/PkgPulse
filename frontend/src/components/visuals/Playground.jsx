import { useEffect, useRef, useState } from "react";
import { DEMOS } from "../../data/demos.js";
import styles from "./Playground.module.css";

const INSTALL_WORDS = ["install", "-S"];
const HELP = [
  "Try one of these:",
  { t: "  htop   fastfetch   git log --oneline -3   tree src -L 1", c: "#38bdf8" },
  { t: "  cmatrix   cava   tldr tar   curl -I https://pkgpulse.dev", c: "#38bdf8" },
  { t: "  sudo apt install firefox   ls   pwd   whoami   date   clear", c: "#38bdf8" },
];

// what the pretend terminal answers to a command
function answer(command, installNames) {
  const words = command.split(" ").filter((w) => w !== "");
  const first = words[0];

  if (command === "help") return { lines: HELP };
  if (command === "ls") return { lines: ["Desktop  Documents  Downloads  Music  Pictures  Projects"] };
  if (command === "pwd") return { lines: ["/home/user"] };
  if (command === "whoami") return { lines: ["user"] };
  if (command === "date") return { lines: [new Date().toString()] };
  if (command === "exit") return { lines: ["There is no exit. Only Linux. 🐧"] };
  if (first === "echo") return { lines: [words.slice(1).join(" ")] };
  if (command.startsWith("sudo rm -rf")) return { lines: [{ t: "Nice try 😅 This pretend computer is protected.", c: "#fbbf24" }] };

  // sudo apt install x, sudo dnf install x, sudo pacman -S x ...
  if (first === "sudo" && words.some((w) => INSTALL_WORDS.includes(w))) {
    const name = words[words.length - 1];
    if (installNames.includes(name)) {
      return {
        lines: [
          "Reading package lists... Done",
          `Downloading ${name}... ████████████ 100%`,
          `Setting up ${name} ...`,
          { t: `✓ ${name} is installed. Type ${name} to start it.`, c: "#34d399" },
        ],
      };
    }
    return { lines: [{ t: `E: Unable to locate package ${name}`, c: "#f87171" }] };
  }

  const exact = Object.values(DEMOS).find((d) => d.command === command);
  if (exact) return exact;
  if (DEMOS[first]) return DEMOS[first];

  return { lines: [{ t: `${first}: command not found. Type help to see what you can try.`, c: "#f87171" }] };
}

export default function Playground({ packages = [], start = "" }) {
  const [input, setInput] = useState(start);
  const [history, setHistory] = useState([
    { id: 0, command: null, lines: ["Welcome to the PkgPulse terminal! Type help and press Enter."] },
  ]);
  const nextId = useRef(1);
  const screen = useRef(null);
  const installNames = packages.map((p) => p.install);

  // keep the last line in view, like a real terminal
  useEffect(() => {
    screen.current.scrollTop = screen.current.scrollHeight;
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const command = input.trim();
    if (command === "") return;
    setInput("");
    if (command === "clear") {
      setHistory([]);
      return;
    }
    const result = answer(command, installNames);
    const entry = { id: nextId.current, command, lines: result.lines, effect: result.effect };
    nextId.current = nextId.current + 1;
    // only the last 6 commands stay on the screen
    setHistory((prev) => [...prev, entry].slice(-6));
  }

  return (
    <section className={styles.playground} data-testid="playground">
      <div className={styles.top}>
        <span className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </span>
        Try it yourself: a pretend terminal
      </div>
      <div className={styles.screen} ref={screen} onClick={() => screen.current.querySelector("input").focus()}>
        {history.map((entry) => (
          <div key={entry.id}>
            {entry.command && (
              <p>
                <span className={styles.prompt}>user@linux:~$</span> {entry.command}
              </p>
            )}
            {entry.effect === "cava" && (
              <div className={styles.cava}>
                {Array.from({ length: 20 }, (_, i) => (
                  <span key={i} style={{ animationDelay: `${(i * 0.13) % 0.9}s` }}></span>
                ))}
              </div>
            )}
            {entry.effect === "matrix" && <p className={styles.matrix}>ｱ1ｶ0ｻ1ﾀ0ﾅ1ﾊ0ﾏ ｱ1ｶ0ｻ1ﾀ0ﾅ1 ﾊ0ﾏｱ1ｶ0ｻ 1ﾀ0ﾅ1ﾊ0ﾏ</p>}
            {entry.effect === "bars" && <div className={styles.bar}></div>}
            {entry.lines.map((line, i) => {
              const row = typeof line === "string" ? { t: line } : line;
              return (
                <p key={i} className={styles.out} style={{ color: row.c, animationDelay: `${i * 0.08}s` }}>
                  {row.t}
                </p>
              );
            })}
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.prompt} htmlFor="playground-input">
            user@linux:~$
          </label>
          <input
            id="playground-input"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Type a command"
          />
        </form>
      </div>
    </section>
  );
}
