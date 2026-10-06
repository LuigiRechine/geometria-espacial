import katex from "katex";
export default function Tex({ t, block = false }: { t: string; block?: boolean }) {
  return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(t, { throwOnError: false, displayMode: block }) }} />;
}
