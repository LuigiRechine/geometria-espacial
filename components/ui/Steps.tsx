import Tex from "./Tex";
import { ReactNode } from "react";
/** Texto que entra no passo n do scroll */
export const S = ({ n, children }: { n: number; children: ReactNode }) => (
  <p data-step={n} className="text-lg md:text-xl text-ink/80 leading-snug">{children}</p>
);
/** Fórmula que entra no passo n do scroll (FormulaReveal) */
export const F = ({ n, tex, label }: { n: number; tex: string; label?: string }) => (
  <div data-step={n} className="flex items-baseline gap-4 border-l-2 border-hot pl-4">
    <span className="text-2xl md:text-3xl"><Tex t={tex} /></span>
    {label && <span className="font-display text-sm text-mut">{label}</span>}
  </div>
);
