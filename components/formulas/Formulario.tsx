"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tex from "@/components/ui/Tex";
const areas: [string, string][] = [["Cubo", "A_t = 6a^2"], ["Paralelepípedo", "A_t = 2(ab+ac+bc)"], ["Prisma", "A_t = 2A_b + A_l"],
  ["Pirâmide", "A_t = A_b + \\dfrac{P_b a_p}{2}"], ["Cilindro", "A_t = 2\\pi r(r+h)"], ["Cone", "A_t = \\pi r(r+g)"], ["Esfera", "A = 4\\pi r^2"]];
const vols: [string, string][] = [["Cubo", "V = a^3"], ["Paralelepípedo", "V = abc"], ["Prisma", "V = A_b h"],
  ["Pirâmide", "V = \\dfrac{A_b h}{3}"], ["Cilindro", "V = \\pi r^2 h"], ["Cone", "V = \\dfrac{\\pi r^2 h}{3}"], ["Esfera", "V = \\dfrac{4}{3}\\pi r^3"]];
export default function Formulario() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".fm", { opacity: 0, y: 30, stagger: 0.06, scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  const col = (title: string, rows: [string, string][]) => (
    <div>
      <h3 className="font-display text-lg font-semibold text-hot mb-4">{title}</h3>
      {rows.map(([n, t]) => (
        <div key={n} className="fm flex items-center justify-between border-b border-line py-4">
          <span className="text-mut">{n}</span><span className="text-xl"><Tex t={t} /></span>
        </div>))}
    </div>);
  return (
    <section ref={root} className="px-6 md:px-16 py-32 max-w-6xl mx-auto">
      <h2 className="font-display text-6xl md:text-8xl font-extrabold tracking-tighter mb-4">FORMULÁRIO</h2>
      <p className="text-xl text-mut mb-12">Não decore. Entenda — e depois revise aqui.</p>
      <div className="grid md:grid-cols-2 gap-12">{col("Áreas totais", areas)}{col("Volumes", vols)}</div>
    </section>
  );
}
