import { ReactNode } from "react";
type C = "ink" | "acc" | "hot" | "mut";
const stroke: Record<C, string> = { ink: "stroke-ink", acc: "stroke-acc", hot: "stroke-hot", mut: "stroke-mut" };
const fill: Record<C, string> = { ink: "fill-ink", acc: "fill-acc", hot: "fill-hot", mut: "fill-mut" };
const op: Record<number, number> = { 3: 0.05, 15: 0.16, 25: 0.3 };

/** Linha de medida/aresta: com n, é desenhada no passo n (tracejada: aparece com fade) */
export const P = ({ d, n, c = "ink", dash, w = 1.5 }: { d: string; n?: number; c?: C; dash?: boolean; w?: number }) => {
  const extra = n === undefined ? {} : dash ? { "data-step": n, strokeDasharray: "4 4" } : { "data-step": n, "data-draw": "" };
  return <path d={d} pathLength={dash ? undefined : 1} fill="none" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={stroke[c]} {...extra} />;
};
/** Face/região preenchida (estática, ou com fade se tiver n) */
export const Fc = ({ d, n, c = "ink", o = 3 }: { d: string; n?: number; c?: C; o?: 3 | 15 | 25 }) => (
  <path d={d} className={fill[c]} fillOpacity={op[o]} stroke="none" {...(n === undefined ? {} : { "data-step": n })} />
);

const hash = (t: string) => { let h = 0; for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0; return Math.abs(h).toString(36); };

/**
 * Preenchimento animado pelo scroll, recortado no formato do sólido.
 *  dir="right": varre a região da esquerda para a direita (use em ÁREAS)
 *  dir="up":    sobe de baixo para cima, como enchendo o sólido (use em VOLUMES)
 * A animação em si fica no ScrollSection (data-fill).
 */
export const Fill = ({ d, n, c = "acc", o = 25, dir = "right" }: { d: string; n: number; c?: C; o?: 3 | 15 | 25; dir?: "right" | "up" }) => {
  const id = "cp" + hash(d);
  return (
    <g data-fill={n} data-dir={dir}>
      <clipPath id={id}><path d={d} /></clipPath>
      <path className="bb" d={d} fill="none" stroke="none" />
      <g clipPath={`url(#${id})`}>
        <rect className={`fr ${fill[c]}`} fillOpacity={op[o]} />
        <line className={`fe ${stroke[c]}`} strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </g>
  );
};
/** Rótulo de medida (SolidMeasurement) */
export const T = ({ x, y, n, c = "acc", children }: { x: number; y: number; n: number; c?: C; children: ReactNode }) => (
  <text x={x} y={y} data-step={n} textAnchor="middle" className={`${fill[c]} text-[17px] italic font-medium`}>{children}</text>
);
const Svg = ({ children }: { children: ReactNode }) => <svg viewBox="0 0 400 400" className="w-full h-full" role="img">{children}</svg>;
const el = (cx: number, cy: number, rx: number, ry: number) => `M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z`;
const CUBE = "M90 160H220V290H90Z M90 160L150 110H280L220 160Z M220 160L280 110V240L220 290Z";

export const HeroScene = () => (
  <Svg><g data-spin>
    <Fc d={CUBE} />
    <P d={CUBE} w={1} c="mut" />
    <P d={CUBE} n={1} />
    <P d="M150 110V240H280 M150 240L90 290" n={1} dash c="mut" />
    <P d="M90 320H220" n={2} c="acc" /><T x={155} y={345} n={2}>a</T>
  </g></Svg>
);

export const Cube = () => (
  <Svg>
    <Fc d={CUBE} />
    <P d={CUBE} w={1} c="mut" />
    <P d={CUBE} n={1} c="acc" w={2.2} />
    <P d="M150 110V240H280 M150 240L90 290" n={1} dash c="acc" />
    <T x={155} y={316} n={2}>a</T><T x={272} y={278} n={2}>a</T><T x={70} y={230} n={2}>a</T>
    <Fill d="M90 290H220L280 240H150Z" n={3} />
    <Fill d="M90 160L150 110H280V240L220 290H90Z" n={4} o={15} dir="up" />
  </Svg>
);

export const Prism = () => (
  <Svg>
    <Fc d="M100 300H240V150H100Z M240 300L170 255V105L240 150Z M100 150L170 105L240 150Z" />
    <P d="M100 300H240V150H100Z M240 300L170 255V105L240 150Z M100 150L170 105L240 150" />
    <P d="M100 300L170 255 M170 255V105" dash c="mut" n={0.01} />
    <Fill d="M100 150L170 105L240 150Z M100 300H240L170 255Z" n={1} />
    <T x={170} y={135} n={1}>base</T><T x={170} y={325} n={1}>base</T>
    <P d="M290 300V150 M280 300H300 M280 150H300" n={2} c="hot" /><T x={312} y={232} n={2} c="hot">h</T>
    <Fill d="M100 300H240V150H100Z M240 300L170 255V105L240 150Z" n={3} c="hot" o={15} />
  </Svg>
);

export const Pyramid = () => (
  <Svg>
    <Fc d="M200 90L100 300H240Z" />
    <P d="M200 90L100 300H240Z" />
    <P d="M200 90L300 260L240 300 M100 300H240L300 260" n={1} />
    <P d="M200 90L160 260 M100 300L160 260H300" n={1} dash c="mut" />
    <P d="M200 90V280" n={2} c="acc" w={2.2} /><T x={214} y={200} n={2}>h</T>
    <P d="M200 90L170 300" n={3} c="hot" w={2.2} /><T x={150} y={190} n={3} c="hot">apótema</T>
    <P d="M300 260L200 90" n={3} w={2.2} /><T x={290} y={170} n={3} c="ink">aresta</T>
    <Fill d="M200 90L100 300H240Z" n={4} c="hot" o={15} />
    <Fill d="M200 90L100 300H240L300 260Z" n={5} o={15} dir="up" />
  </Svg>
);

export const Cylinder = () => (
  <Svg>
    <circle cx={200} cy={200} r={100} data-out={1} fill="none" strokeWidth={1.5} className="stroke-ink" />
    <P d="M100 110V290 M300 110V290 M100 290A100 28 0 0 0 300 290" n={1} />
    <P d="M100 290A100 28 0 0 1 300 290" n={1} dash c="mut" />
    <P d={el(200, 110, 100, 28)} n={1} />
    <P d="M200 110H300" n={2} c="acc" w={2.2} /><T x={250} y={102} n={2}>r</T>
    <P d="M100 290H300" n={2} c="hot" dash /><T x={200} y={335} n={2} c="hot">d = 2r</T>
    <P d="M345 110V290 M335 110H355 M335 290H355" n={3} c="acc" /><T x={372} y={205} n={3}>h</T>
    <Fill d={el(200, 110, 100, 28)} n={4} />
    <Fill d="M100 110V290A100 28 0 0 0 300 290V110A100 28 0 0 1 100 110Z" n={5} c="hot" o={15} />
    <Fill d="M100 110V290A100 28 0 0 0 300 290V110A100 28 0 0 0 100 110Z" n={7} o={15} dir="up" />
  </Svg>
);

export const Cone = () => (
  <Svg>
    <circle cx={200} cy={200} r={100} data-out={1} fill="none" strokeWidth={1.5} className="stroke-ink" />
    <P d="M200 90L100 290 M200 90L300 290 M100 290A100 26 0 0 0 300 290" n={1} />
    <P d="M100 290A100 26 0 0 1 300 290" n={1} dash c="mut" />
    <Fill d="M200 90V290H300Z" n={3} o={15} />
    <Fill d="M200 90L100 290A100 26 0 0 0 300 290Z" n={8} o={15} dir="up" />
    <P d="M200 90V290" n={2} c="acc" w={2.2} /><T x={186} y={200} n={2}>h</T>
    <P d="M200 290H300" n={2} c="hot" w={2.2} /><T x={250} y={316} n={2} c="hot">r</T>
    <P d="M200 90L300 290" n={3} w={2.6} /><T x={272} y={180} n={3} c="ink">g</T>
  </Svg>
);

export const Sphere = () => (
  <Svg>
    <circle cx={200} cy={200} r={110} strokeWidth={1.5} className="stroke-ink fill-ink/[0.05]" />
    <P d="M90 200A110 30 0 0 0 310 200" n={1} />
    <P d="M90 200A110 30 0 0 1 310 200" n={1} dash c="mut" />
    <P d="M200 90V310" n={2} c="hot" dash />
    <circle cx={200} cy={200} r={4} data-step={2} className="fill-acc" />
    <P d="M200 200H310" n={2} c="acc" w={2.2} /><T x={256} y={190} n={2}>r</T><T x={216} y={160} n={2} c="hot">d</T><T x={178} y={224} n={2} c="mut">centro</T>
    <P d={el(200, 165, 140, 36)} n={5} dash c="hot" />
    <P d={el(200, 165, 104, 26)} n={5} c="acc" w={2.2} />
    <Fill d={el(200, 165, 104, 26)} n={5} />
    <Fill d="M90 200A110 110 0 1 1 310 200A110 110 0 1 1 90 200Z" n={4} o={15} dir="up" />
  </Svg>
);
