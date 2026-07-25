import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";
import type { Message } from "../../../types/message";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">
        {isUser ? (
          <User size={18} className="text-white" />
        ) : (
          <Bot size={18} className="text-cyan-400" />
        )}
      </div>

      <div className="flex-1">
        <div className="mb-2 font-semibold text-white">
          {isUser ? "You" : "CodeMentor AI"}
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 text-slate-200">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");

                if (!match) {
                  return (
                    <code className="rounded bg-slate-800 px-1 py-0.5">
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    language={match[1]}
                    value={String(children).replace(/\n$/, "")}
                  />
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
