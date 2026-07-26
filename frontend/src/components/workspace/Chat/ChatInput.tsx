import { useState } from "react";
import { Send, Square } from "lucide-react";

import { useConversation } from "../context/useConversation";
import { useMessage } from "../context/useMessage";

export default function ChatInput() {
  const [content, setContent] = useState("");

  const { activeConversation } = useConversation();
  const { sendMessage, stopGenerating, streaming } = useMessage();

  const handleSend = async () => {
    if (!activeConversation) return;
    if (!content.trim()) return;
    if (streaming) return;

    const message = content;

    setContent("");

    try {
      await sendMessage(activeConversation.id, message);
    } catch (error) {
      console.error(error);
      setContent(message);
    }
  };

  return (
    <div className="border-t border-slate-800/70 bg-[#0B1120] px-6 py-5">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-3 shadow-lg transition-all duration-200 focus-within:border-cyan-500/40 focus-within:shadow-cyan-500/5">
          <textarea
            rows={1}
            value={content}
            disabled={streaming}
            placeholder={
              streaming
                ? "CodeMentor AI is responding..."
                : "Message CodeMentor AI..."
            }
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="max-h-40 flex-1 resize-none bg-transparent py-2 text-[15px] text-slate-100 placeholder:text-slate-500 outline-none"
          />

          {streaming ? (
            <button
              onClick={stopGenerating}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white transition-all duration-200 hover:bg-red-700 hover:scale-105"
              aria-label="Stop generating"
            >
              <Square size={18} fill="currentColor" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!content.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-600 text-white transition-all duration-200 hover:scale-105 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
