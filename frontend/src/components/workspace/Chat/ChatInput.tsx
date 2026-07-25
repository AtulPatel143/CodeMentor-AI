import { useState } from "react";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-6">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3">
        <button className="rounded-xl p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <Paperclip size={20} />
        </button>

        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask CodeMentor AI anything..."
          className="max-h-48 flex-1 resize-none bg-transparent py-2 text-white placeholder:text-slate-500 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button className="rounded-xl p-3 text-slate-400 transition hover:bg-slate-800 hover:text-white">
          <Mic size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-xl bg-cyan-500 p-3 text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
