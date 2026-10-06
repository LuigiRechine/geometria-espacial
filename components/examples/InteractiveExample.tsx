import ScrollSection from "@/components/ui/ScrollSection";
import { F, S } from "@/components/ui/Steps";
export default function InteractiveExample() {
  return (
    <ScrollSection kicker="Exemplo" title="Passo a passo" steps={6}>
      <S n={0.01}>Um cilindro possui raio de 3 cm e altura de 10 cm. Qual é seu volume?</S>
      <div className="flex flex-col items-center gap-3">
        <F n={1} tex="r = 3\text{ cm}\quad h = 10\text{ cm}" label="Dados" />
        <F n={2} tex="V = \pi r^2 h" label="Fórmula" />
        <F n={3} tex="V = \pi \cdot 3^2 \cdot 10" label="Substituindo" />
        <F n={4} tex="V = 90\pi\ \text{cm}^3" label="Exato" />
        <F n={5} tex="V \approx 282{,}74\ \text{cm}^3" label="Aproximado" />
      </div>
    </ScrollSection>
  );
}
