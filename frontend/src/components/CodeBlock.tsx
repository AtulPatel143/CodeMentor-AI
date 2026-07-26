import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      toast.success("Code copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Failed to copy code.");
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-slate-700 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3">
        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-300">
          {language || "text"}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-700 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: "20px",
          borderRadius: 0,
          background: "#0f172a",
          fontSize: "14px",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
