import { useCallback, useEffect, useRef, useState } from "react";
import {
  getConversations,
  sendStreamMessage,
} from "../services/conversation.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface ChatPanelProps {
  projectId: string;
}

type Conversation = {
  id: string;
  message: string;
  response: string;
};

const ChatPanel = ({ projectId }: ChatPanelProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await getConversations(projectId);
      setConversations(response.conversations);
    } catch (error) {
      console.error(error);
    }
  }, [projectId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchConversations();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversations, streamingResponse]);

  useEffect(() => {
    console.log("Render:", streamingResponse);
  }, [streamingResponse]);

  const handleSend = async () => {
    if (loading) return;
    if (!message.trim()) return;

    const userMessage = message;

    setCurrentMessage(userMessage);
    setStreamingResponse("");

    setMessage("");
    setLoading(true);

    try {
      await sendStreamMessage(projectId, userMessage, (chunk) => {
        console.log("ChatPanel received:", chunk);

        setStreamingResponse((prev) => {
          const next = prev + chunk;
          console.log("Next response:", next);
          return next;
        });
      });

      setLoading(false);
      setCurrentMessage("");
      setStreamingResponse("");

      inputRef.current?.focus();

      await fetchConversations();
    } catch (error) {
      console.error(error);

      setLoading(false);
      setCurrentMessage("");
      setStreamingResponse("");
    }
  };

  return (
    <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">🤖 AI Assistant</h2>

      <div className="mb-6 max-h-96 space-y-4 overflow-y-auto">
        {/* Existing conversations */}
        {conversations.map((conversation) => (
          <div key={conversation.id}>
            <div className="rounded-lg bg-cyan-100 p-3">
              <strong>You:</strong>
              <p>{conversation.message}</p>
            </div>

            <div className="prose prose-sm mt-2 max-w-none rounded-lg bg-gray-100 p-5">
              <strong>AI:</strong>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ children, className }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return match ? (
                      <CodeBlock
                        language={match[1]}
                        code={String(children).replace(/\n$/, "")}
                      />
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                }}
              >
                {conversation.response}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Streaming response */}
        {loading && (
          <div>
            <div className="rounded-lg bg-cyan-100 p-3">
              <strong>You:</strong>
              <p>{currentMessage}</p>
            </div>

            <div className="prose prose-sm mt-2 max-w-none rounded-lg bg-gray-100 p-5">
              <strong>AI:</strong>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ children, className }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return match ? (
                      <CodeBlock
                        language={match[1]}
                        code={String(children).replace(/\n$/, "")}
                      />
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                }}
              >
                {streamingResponse + (loading ? "▋" : "")}
              </ReactMarkdown>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-3">
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
          placeholder="Ask CodeMentor AI..."
          className="flex-1 rounded-lg border px-4 py-3"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-5 py-3 text-white hover:bg-cyan-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
