import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import { useMessage } from "../context/useMessage";

const ChatView = () => {
  const { messages, loading, streaming } = useMessage();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomRef.current) return;

    bottomRef.current.scrollIntoView({
      behavior: streaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, loading, streaming]);

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 overflow-y-auto px-6 py-8"
    >
      {messages.length === 0 ? (
        <div className="mt-28 flex flex-col items-center justify-center text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Welcome to CodeMentor AI 👋
          </h2>

          <p className="max-w-lg text-slate-400">
            Ask coding questions, generate projects, debug errors, explain
            algorithms, or get help with any programming task.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}

      {loading && (
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

          <div
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{
              animationDelay: "150ms",
            }}
          />

          <div
            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
            style={{
              animationDelay: "300ms",
            }}
          />

          <span className="ml-2">CodeMentor AI is thinking...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatView;
