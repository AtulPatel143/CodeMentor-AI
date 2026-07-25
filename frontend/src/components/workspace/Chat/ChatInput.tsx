import { useState } from "react";
import { Send, Square } from "lucide-react";

import { useConversation } from "../../hooks/useConversation";
import { useMessage } from "../../hooks/useMessage";

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
    <div className="border-t border-slate-800 bg-[#0B1120] p-4">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3">
        <textarea
          rows={1}
          value={content}
          disabled={streaming}
          placeholder={
            streaming
              ? "CodeMentor AI is responding..."
              : "Ask CodeMentor AI..."
          }
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="max-h-40 flex-1 resize-none bg-transparent outline-none"
        />

        {streaming ? (
          <button
            onClick={stopGenerating}
            className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
            aria-label="Stop generating"
          >
            <Square size={18} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!content.trim()}
            className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
