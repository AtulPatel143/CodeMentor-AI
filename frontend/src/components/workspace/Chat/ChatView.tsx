import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import { useMessage } from "../context/useMessage";

const ChatView = () => {
  const { messages, loading, streaming } = useMessage();

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: streaming ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, loading, streaming]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-8 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
                Welcome to CodeMentor AI
              </h1>

              <p className="text-lg leading-8 text-slate-400">
                Ask coding questions, debug errors, generate projects,
                understand algorithms, or get help with any programming task.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {loading && (
              <div className="flex items-center gap-3 py-2 text-sm text-slate-400">
                <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                  style={{ animationDelay: "150ms" }}
                />

                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                  style={{ animationDelay: "300ms" }}
                />

                <span className="ml-2">CodeMentor AI is thinking...</span>
              </div>
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatView;
