"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [t, setT] = useState<"dark" | "light">("dark");
  useEffect(() => { setT(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);
  const flip = () => {
    const n = t === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = n;
    try { localStorage.setItem("theme", n); } catch {}
    setT(n);
  };
  return (
    <button onClick={flip} aria-label="Alternar entre tema claro e escuro"
      className="fixed top-4 right-4 z-50 rounded-full border border-line bg-paper/70 backdrop-blur px-4 py-1.5 font-display text-sm text-mut hover:text-ink hover:border-hot transition-colors">
      {t === "dark" ? "Tema claro" : "Tema escuro"}
    </button>
  );
}
