import Hero from "@/components/hero/Hero";
import { CuboSection, PrismaSection, PiramideSection, CilindroSection, ConeSection, EsferaSection } from "@/components/solids/Sections";
import Formulario from "@/components/formulas/Formulario";
import InteractiveExample from "@/components/examples/InteractiveExample";
import Quiz from "@/components/quiz/Quiz";
export default function Home() {
  return (
    <main>
      <Hero />
      <section className="min-h-[70vh] flex items-center justify-center px-6 text-center">
        <p className="max-w-3xl font-display text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
          Geometria espacial estuda os objetos <span className="text-hot">tridimensionais</span>: seu formato, suas medidas, sua superfície e o espaço que ocupam.
        </p>
      </section>
      <h2 className="outline-text px-6 md:px-16 pt-10 font-display text-7xl md:text-[10rem] font-extrabold tracking-tighter">SÓLIDOS</h2>
      <CuboSection /><PrismaSection /><PiramideSection /><CilindroSection /><ConeSection /><EsferaSection />
      <Formulario /><InteractiveExample /><Quiz />
    </main>
  );
}
