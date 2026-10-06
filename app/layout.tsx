import "./globals.css";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import ThemeToggle from "@/components/ui/ThemeToggle";

export const metadata: Metadata = { title: "Geometria Espacial", description: "Entenda os sólidos. Visualize as medidas. Domine as fórmulas." };

const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body><ThemeToggle />{children}</body>
    </html>
  );
}
