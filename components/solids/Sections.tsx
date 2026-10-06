import ScrollSection from "@/components/ui/ScrollSection";
import { F, S } from "@/components/ui/Steps";
import { Cube, Prism, Pyramid, Cylinder, Cone, Sphere } from "./Scenes";

export const CuboSection = () => (
  <ScrollSection kicker="Sólido 1 de 6" title="Cubo" steps={6} scene={<Cube />}>
    <S n={1}>Doze arestas, <b>todas com a mesma medida</b>.</S>
    <S n={2}>Uma só medida define tudo: a aresta <i>a</i>.</S>
    <F n={3} tex="A_b = a^2" label="Área da base" />
    <F n={4} tex="A_t = 6a^2" label="Área total · 6 faces" />
    <F n={5} tex="V = a^3" label="Volume" />
  </ScrollSection>
);
export const PrismaSection = () => (
  <ScrollSection kicker="Sólido 2 de 6" title="Prisma" steps={5} scene={<Prism />}>
    <S n={1}>Duas bases <b>congruentes e paralelas</b>.</S>
    <S n={2}>A altura <i>h</i> é a distância entre as bases.</S>
    <F n={2} tex="V = A_b \cdot h" label="Volume" />
    <S n={3}>As faces laterais (retângulos) formam a área lateral.</S>
    <F n={4} tex="A_t = 2A_b + A_l" label="Área total" />
  </ScrollSection>
);
export const PiramideSection = () => (
  <ScrollSection kicker="Sólido 3 de 6" title="Pirâmide" steps={6} scene={<Pyramid />}>
    <S n={1}>Uma base e faces laterais triangulares que se encontram no vértice.</S>
    <S n={2}><b>Altura</b>: do vértice, perpendicular à base.</S>
    <S n={3}><b>Apótema</b>: altura de uma face lateral. <b>Aresta lateral</b>: vértice → canto da base.</S>
    <F n={4} tex="A_l = \dfrac{P_b \cdot a_p}{2}" label="Pirâmide regular" />
    <F n={5} tex="V = \dfrac{A_b \cdot h}{3}" label="Volume" />
  </ScrollSection>
);
export const CilindroSection = () => (
  <ScrollSection kicker="Sólido 4 de 6" title="Cilindro" steps={8} scene={<Cylinder />}>
    <S n={1}>Um círculo ganha altura e vira cilindro.</S>
    <S n={2}>Raio <i>r</i>; diâmetro <i>d = 2r</i>.</S>
    <F n={4} tex="A_b = \pi r^2" label="Área da base" />
    <S n={5}>Desenrolando a lateral: retângulo de base <i>2πr</i> e altura <i>h</i>.</S>
    <F n={5} tex="A_l = 2\pi r h" label="Área lateral" />
    <F n={6} tex="A_t = 2\pi r^2 + 2\pi r h" label="Área total" />
    <F n={7} tex="V = \pi r^2 h" label="Base × altura" />
  </ScrollSection>
);
export const ConeSection = () => (
  <ScrollSection kicker="Sólido 5 de 6" title="Cone" steps={9} scene={<Cone />}>
    <S n={2}>Raio <i>r</i> e altura <i>h</i>. A geratriz <i>g</i> é o lado inclinado.</S>
    <S n={3}><b>g ≠ h</b>: r, h e g formam um triângulo retângulo.</S>
    <F n={4} tex="g^2 = r^2 + h^2" label="Pitágoras" />
    <F n={5} tex="A_b = \pi r^2" />
    <F n={6} tex="A_l = \pi r g" label="Área lateral" />
    <F n={7} tex="A_t = \pi r^2 + \pi r g" label="Área total" />
    <F n={8} tex="V = \dfrac{\pi r^2 h}{3}" label="⅓ do cilindro" />
  </ScrollSection>
);
export const EsferaSection = () => (
  <ScrollSection kicker="Sólido 6 de 6" title="Esfera" steps={7} scene={<Sphere />}>
    <S n={1}>De círculo a esfera: todos os pontos à mesma distância do centro.</S>
    <S n={2}>Raio <i>r</i>, diâmetro <i>d = 2r</i> e centro.</S>
    <F n={3} tex="A = 4\pi r^2" label="Área" />
    <F n={4} tex="V = \dfrac{4}{3}\pi r^3" label="Volume" />
    <S n={5}>Um plano que corta a esfera revela um <b>círculo</b>.</S>
  </ScrollSection>
);
