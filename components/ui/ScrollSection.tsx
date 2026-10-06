"use client";
import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Seção fixada (pin) cuja timeline é controlada pelo scroll (scrub).
 * Atributos dos filhos:
 *  data-step="n"  aparece no passo n (com data-draw: a linha é "desenhada")
 *  data-out="n"   some no passo n
 *  data-spin      gira/aumenta durante toda a seção
 *  data-fill="n"  preenchimento animado (componente Fill): data-dir="right" varre a área,
 *                 data-dir="up" enche o sólido de baixo para cima (volume)
 */
export default function ScrollSection({ kicker, title, scene, steps, children }:
  { kicker?: string; title: ReactNode; scene?: ReactNode; steps: number; children?: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;
      const tl = gsap.timeline({ defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${steps * (mobile ? 45 : 75)}%`, pin: true, scrub: 0.5 } });
      gsap.utils.toArray<Element>("[data-step]", root.current).forEach((el) => {
        const n = Number(el.getAttribute("data-step"));
        if (el.hasAttribute("data-draw")) tl.fromTo(el, { opacity: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8 }, n);
        else tl.fromTo(el, { opacity: 0, y: el instanceof HTMLElement ? 16 : 0 }, { opacity: 1, y: 0, duration: 0.6 }, n);
      });
      gsap.utils.toArray<SVGGElement>("[data-fill]", root.current).forEach((g) => {
        const n = Number(g.getAttribute("data-fill"));
        const up = g.getAttribute("data-dir") === "up";
        const b = g.querySelector<SVGGraphicsElement>(".bb")!.getBBox();
        const rect = g.querySelector(".fr")!, edge = g.querySelector(".fe")!;
        const dur = up ? 1.2 : 0.8, ease = "power1.inOut";
        tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.05 }, n);
        if (up) {
          gsap.set(rect, { attr: { x: b.x, width: b.width } });
          gsap.set(edge, { attr: { x1: b.x, x2: b.x + b.width } });
          tl.fromTo(rect, { attr: { y: b.y + b.height, height: 0 } }, { attr: { y: b.y, height: b.height }, duration: dur, ease }, n);
          tl.fromTo(edge, { attr: { y1: b.y + b.height, y2: b.y + b.height } }, { attr: { y1: b.y, y2: b.y }, duration: dur, ease }, n);
        } else {
          gsap.set(rect, { attr: { y: b.y, height: b.height } });
          gsap.set(edge, { attr: { y1: b.y, y2: b.y + b.height } });
          tl.fromTo(rect, { attr: { x: b.x, width: 0 } }, { attr: { x: b.x, width: b.width }, duration: dur, ease }, n);
          tl.fromTo(edge, { attr: { x1: b.x, x2: b.x } }, { attr: { x1: b.x + b.width, x2: b.x + b.width }, duration: dur, ease }, n);
        }
        tl.fromTo(edge, { opacity: 1 }, { opacity: 0, duration: 0.2 }, n + dur);
      });
      gsap.utils.toArray<Element>("[data-out]", root.current).forEach((el) =>
        tl.to(el, { opacity: 0, duration: 0.6 }, Number(el.getAttribute("data-out"))));
      tl.to({}, { duration: 0.5 }, steps);
      gsap.utils.toArray<Element>("[data-spin]", root.current).forEach((el) =>
        tl.to(el, { rotation: 12, scale: 1.25, svgOrigin: "200 200", duration: steps + 0.5 }, 0));
    }, root);
    return () => ctx.revert();
  }, [steps]);

  return (
    <section ref={root} className="h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center gap-2 md:gap-12 px-6 md:px-16">
      {scene && <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] max-w-[560px]">{scene}</div>}
      <div className={`w-full max-w-xl ${scene ? "md:w-1/2" : "text-center mx-auto"}`}>
        {kicker && <p className="font-display text-sm md:text-base text-hot mb-2">{kicker}</p>}
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">{title}</h2>
        <div className="mt-5 space-y-3">{children}</div>
      </div>
    </section>
  );
}
