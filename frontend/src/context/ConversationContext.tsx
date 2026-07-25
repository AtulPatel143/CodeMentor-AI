import { useCallback, useState } from "react";
import type { ReactNode } from "react";

import {
  getConversations,
  createConversation as createConversationApi,
  renameConversation as renameConversationApi,
  deleteConversation as deleteConversationApi,
} from "../api/conversation.api";

import type { Conversation } from "../types/conversation";
import { ConversationContext } from "./ConversationContextImpl";

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  const [loading, setLoading] = useState(false);

  const loadConversations = useCallback(
    async (projectId: string) => {
      setLoading(true);

      try {
        const data = await getConversations(projectId);

        setConversations(data);

        if (data.length && !activeConversation) {
          setActiveConversation(data[0]);
        }
      } finally {
        setLoading(false);
      }
    },
    [activeConversation],
  );

  const createConversation = async (projectId: string) => {
    const conversation = await createConversationApi(projectId);

    setConversations((prev) => [conversation, ...prev]);

    setActiveConversation(conversation);
  };

  const renameConversation = async (id: string, title: string) => {
    const updated = await renameConversationApi(id, title);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id ? updated : conversation,
      ),
    );

    if (activeConversation?.id === id) {
      setActiveConversation(updated);
    }
  };

  const deleteConversation = async (id: string) => {
    await deleteConversationApi(id);

    const updated = conversations.filter(
      (conversation) => conversation.id !== id,
    );

    setConversations(updated);

    if (activeConversation?.id === id) {
      setActiveConversation(updated[0] ?? null);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        activeConversation,
        loading,

        loadConversations,

        createConversation,

        renameConversation,

        deleteConversation,

        setActiveConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
