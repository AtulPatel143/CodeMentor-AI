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
        isUser ? "justify-end" : "animate-in fade-in slide-in-from-bottom-2"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg ring-1 ring-cyan-400/20">
          <Bot size={18} className="text-white" />
        </div>
      )}

      {/* Content */}
      <div className={`min-w-0 ${isUser ? "max-w-[80%]" : "flex-1"}`}>
        <div
          className={`mb-2 flex items-center gap-2 text-sm ${
            isUser ? "justify-end" : ""
          }`}
        >
          <span className="font-semibold text-white">
            {isUser ? "You" : "CodeMentor AI"}
          </span>

          {!isUser && (
            <span className="text-xs text-slate-500">AI Assistant</span>
          )}
        </div>

        <div
          className={`rounded-2xl border px-6 py-5 shadow-sm transition-all duration-200 ${
            isUser
              ? "border-cyan-500/20 bg-cyan-950/20"
              : "border-slate-700/70 bg-slate-900/80"
          }`}
        >
          <article
            className="
              prose
              prose-invert
              max-w-none

              prose-headings:mb-4
              prose-headings:text-white
              prose-headings:font-bold

              prose-p:leading-8
              prose-p:text-slate-200

              prose-a:text-cyan-400
              prose-a:no-underline
              hover:prose-a:text-cyan-300

              prose-strong:text-white

              prose-ul:text-slate-200
              prose-ol:text-slate-200
              prose-li:marker:text-cyan-400

              prose-blockquote:border-cyan-500
              prose-blockquote:bg-slate-800/30
              prose-blockquote:py-1
              prose-blockquote:rounded-r-lg
              prose-blockquote:text-slate-300

              prose-hr:border-slate-700

              prose-table:block
              prose-table:overflow-x-auto

              prose-th:border
              prose-th:border-slate-700
              prose-th:bg-slate-800
              prose-th:p-3

              prose-td:border
              prose-td:border-slate-700
              prose-td:p-3

              prose-code:rounded-md
              prose-code:bg-slate-800/80
              prose-code:px-1.5
              prose-code:py-1
              prose-code:font-medium
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

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 shadow-lg ring-1 ring-cyan-400/20">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
