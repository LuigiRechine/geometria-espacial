import ScrollSection from "@/components/ui/ScrollSection";
import { HeroScene } from "@/components/solids/Scenes";
const words = ["altura", "raio", "apótema", "geratriz", "aresta"];
export default function Hero() {
  return (
    <ScrollSection title={<span className="font-extrabold tracking-tighter">GEOMETRIA ESPACIAL</span>} steps={5} scene={<HeroScene />}>
      <p className="text-xl md:text-2xl text-mut">Entenda os sólidos. Visualize as medidas. Domine as fórmulas.</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {words.map((w, i) => <span key={w} data-step={i + 1} className="rounded-full border border-hot/60 text-hot px-4 py-1 text-sm font-display">{w}</span>)}
      </div>
      <p className="pt-4 text-sm text-mut">Role para explorar ↓</p>
    </ScrollSection>
  );
}
