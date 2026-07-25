import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-700">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs text-slate-300 transition hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#0f172a",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
