import type { Config } from "tailwindcss";
const v = (n: string) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: { paper: v("paper"), ink: v("ink"), acc: v("acc"), hot: v("hot"), mut: v("mut"), line: v("line"), onhot: v("onhot") },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"Source Serif 4"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
