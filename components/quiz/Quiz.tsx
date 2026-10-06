"use client";
import { useState } from "react";
type Q = { q: string; o: string[]; a: number; why: string };
const qs: Q[] = [
  { q: "Duas bases triangulares congruentes e paralelas e faces laterais retangulares: qual sólido?", o: ["Pirâmide", "Prisma triangular", "Cone", "Cilindro"], a: 1, why: "Duas bases congruentes e paralelas caracterizam um prisma." },
  { q: "No cone, a geratriz g é…", o: ["a altura", "o raio", "a distância do vértice a um ponto da circunferência da base", "o diâmetro"], a: 2, why: "g é a hipotenusa do triângulo de catetos r e h: g² = r² + h²." },
  { q: "Qual é o volume do cone?", o: ["πr²h", "πr²h/3", "πrg", "4πr³/3"], a: 1, why: "O cone ocupa 1/3 do cilindro de mesma base e altura." },
  { q: "O apótema de uma pirâmide regular é…", o: ["a altura da pirâmide", "a altura de uma face lateral", "a aresta da base", "a aresta lateral"], a: 1, why: "É a altura do triângulo de uma face lateral." },
  { q: "Cubo de aresta 3 cm: área total?", o: ["27 cm²", "36 cm²", "54 cm²", "18 cm²"], a: 2, why: "6a² = 6 · 9 = 54 cm²." },
  { q: "Cilindro com r = 2 cm e h = 5 cm: volume?", o: ["10π cm³", "20π cm³", "40π cm³", "8π cm³"], a: 1, why: "V = π · 2² · 5 = 20π cm³." },
  { q: "Esfera de raio 3 cm: volume?", o: ["12π cm³", "27π cm³", "36π cm³", "108π cm³"], a: 2, why: "V = (4/3)π · 27 = 36π cm³." },
];
export default function Quiz() {
  const [i, setI] = useState(0); const [sel, setSel] = useState<number | null>(null); const [score, setScore] = useState(0);
  const done = i >= qs.length; const cur = qs[i];
  const pick = (k: number) => { if (sel !== null) return; setSel(k); if (k === cur.a) setScore((s) => s + 1); };
  return (
    <section className="px-6 py-32 max-w-2xl mx-auto min-h-screen">
      <h2 className="font-display text-6xl md:text-8xl font-extrabold tracking-tighter mb-10">QUIZ</h2>
      {done ? (
        <div>
          <p className="font-display text-4xl font-semibold">{score} de {qs.length} acertos</p>
          <button onClick={() => { setI(0); setSel(null); setScore(0); }} className="mt-6 rounded-full bg-hot text-onhot font-display font-semibold px-6 py-3 hover:brightness-110 transition">Refazer</button>
        </div>
      ) : (
        <div>
          <p className="font-display text-sm text-mut mb-2">Questão {i + 1} / {qs.length}</p>
          <p className="font-display text-2xl font-medium mb-6">{cur.q}</p>
          <div className="space-y-3">
            {cur.o.map((o, k) => {
              const state = sel === null ? "border-line hover:border-hot" : k === cur.a ? "border-emerald-500 bg-emerald-500/10" : k === sel ? "border-rose-500 bg-rose-500/10" : "border-line opacity-50";
              return <button key={o} onClick={() => pick(k)} className={`w-full text-left rounded-2xl border px-5 py-4 transition ${state}`}>{o}</button>;
            })}
          </div>
          {sel !== null && (
            <div className="mt-6">
              <p className={sel === cur.a ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>{sel === cur.a ? "Correto!" : "Quase — veja a explicação:"}</p>
              <p className="text-ink/80 mt-1">{cur.why}</p>
              <button onClick={() => { setI(i + 1); setSel(null); }} className="mt-4 rounded-full bg-hot text-onhot font-display font-semibold px-6 py-3 hover:brightness-110 transition">{i + 1 === qs.length ? "Ver resultado" : "Próxima"}</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
