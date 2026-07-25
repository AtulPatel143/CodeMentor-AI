import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import { useMessage } from "../context/useMessage";

const ChatView = () => {
  const { messages, loading, streaming } = useMessage();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      150;

    if (isNearBottom || streaming) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading, streaming]);

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-8"
    >
      {messages.length === 0 ? (
        <div className="mt-20 text-center text-slate-500">
          Start a conversation by sending a message.
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.15s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.3s" }}
          />

          <span className="ml-2">CodeMentor AI is thinking...</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatView;
