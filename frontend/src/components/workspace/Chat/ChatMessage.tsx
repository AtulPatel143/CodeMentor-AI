import { Bot, Copy, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
          <Bot size={20} className="text-cyan-400" />
        </div>
      )}

      <div
        className={`max-w-3xl rounded-2xl border px-5 py-4 ${
          isUser
            ? "border-cyan-500 bg-cyan-500 text-slate-950"
            : "border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">{content}</p>

        {!isUser && (
          <button className="mt-4 flex items-center gap-2 text-xs text-slate-400 transition hover:text-white">
            <Copy size={14} />
            Copy
          </button>
        )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500">
          <User size={20} className="text-slate-950" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
