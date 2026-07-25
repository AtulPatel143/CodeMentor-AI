import { useCallback, useState } from "react";
import type { ReactNode } from "react";

import { getMessages, streamMessage, stopStreaming } from "../../../api/message.api";

import type { Message } from "../../../types/message";
import { MessageContext } from "./MessageContextImpl";

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const loadMessages = useCallback(async (conversationId: string) => {
    setLoading(true);

    try {
      const data = await getMessages(conversationId);
      setMessages(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (conversationId: string, content: string) => {
      if (streaming) return;
      if (!content.trim()) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        conversationId,
        createdAt: new Date().toISOString(),
      };

      const assistantId = crypto.randomUUID();

      const assistantMessage: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        conversationId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      setStreaming(true);

      try {
        await streamMessage(conversationId, content, (chunk) => {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantId
                ? {
                    ...message,
                    content: message.content + chunk,
                  }
                : message,
            ),
          );
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantId
              ? {
                  ...message,
                  content: "⚠️ Failed to generate a response.",
                }
              : message,
          ),
        );

        throw error;
      } finally {
        setStreaming(false);
      }
    },
    [streaming],
  );

  const stopGenerating = useCallback(() => {
    stopStreaming();
    setStreaming(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        streaming,
        loadMessages,
        sendMessage,
        stopGenerating,
        clearMessages,
        setMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
