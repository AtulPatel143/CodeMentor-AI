import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";
import type { Message } from "../../../types/message";
import { useMessage } from "../context/useMessage";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  const { streaming } = useMessage();

  const showCursor = !isUser && streaming && message.content.length > 0;

  return (
    <div
      className={`group flex gap-4 transition-all duration-300 ${
        isUser ? "" : "animate-in fade-in slide-in-from-bottom-2"
      }`}
    >
      {/* Avatar */}

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isUser ? "bg-blue-600" : "bg-gradient-to-br from-cyan-500 to-blue-600"
        }`}
      >
        {isUser ? (
          <User size={18} className="text-white" />
        ) : (
          <Bot size={18} className="text-white" />
        )}
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <div className="mb-2 font-semibold text-white">
          {isUser ? "You" : "CodeMentor AI"}
        </div>

        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            isUser
              ? "border-blue-700 bg-blue-950/30"
              : "border-slate-700 bg-slate-900"
          }`}
        >
          <article
            className="
              prose
              prose-invert
              prose-slate
              max-w-none

              prose-headings:text-white
              prose-headings:font-bold

              prose-p:text-slate-200
              prose-p:leading-7

              prose-strong:text-white

              prose-a:text-cyan-400

              prose-ul:text-slate-200
              prose-ol:text-slate-200

              prose-li:marker:text-cyan-400

              prose-blockquote:border-cyan-500
              prose-blockquote:text-slate-300

              prose-hr:border-slate-700

              prose-table:block
              prose-table:w-full
              prose-table:overflow-x-auto

              prose-th:border
              prose-th:border-slate-700
              prose-th:bg-slate-800
              prose-th:p-3

              prose-td:border
              prose-td:border-slate-700
              prose-td:p-3

              prose-code:rounded
              prose-code:bg-slate-800
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:text-cyan-300
              prose-code:before:content-none
              prose-code:after:content-none
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (!match) {
                    return <code>{children}</code>;
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

            {showCursor && (
              <span className="ml-1 inline-block animate-pulse text-cyan-400">
                ▌
              </span>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
