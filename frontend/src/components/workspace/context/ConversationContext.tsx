/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  createConversation as createConversationApi,
  deleteConversation as deleteConversationApi,
  getConversations,
  renameConversation as renameConversationApi,
} from "../../../api/conversation.api";

import { useWorkspace } from "./useWorkspace";

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;

  setActiveConversation: (conversation: Conversation | null) => void;

  createConversation: (projectId?: string) => Promise<Conversation | null>;

  renameConversation: (id: string, title: string) => Promise<void>;

  deleteConversation: (id: string) => Promise<void>;

  updateConversation: (id: string, updates: Partial<Conversation>) => void;

  refreshConversations: (projectId: string) => Promise<void>;
}

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

interface Props {
  projectId?: string;
  children: ReactNode;
}

export const ConversationProvider = ({ projectId, children }: Props) => {
  const { activeProject } = useWorkspace();
  const resolvedProjectId = projectId ?? activeProject?.id;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshConversations = useCallback(async (id: string) => {
    if (!id) {
      return;
    }

    setLoading(true);

    try {
      const data = await getConversations(id);

      setConversations(data);

      setActiveConversation((currentConversation) => {
        if (
          currentConversation &&
          data.some((conversation) => conversation.id === currentConversation.id)
        ) {
          return currentConversation;
        }

        return data[0] ?? null;
      });
    } catch (error) {
      console.error("Failed to refresh conversations:", error);
      setConversations([]);
      setActiveConversation(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(
    async (id?: string) => {
      const targetProjectId = id ?? resolvedProjectId;

      if (!targetProjectId) {
        return null;
      }

      const conversation = await createConversationApi(targetProjectId);

      setConversations((prev) => [conversation, ...prev]);
      setActiveConversation(conversation);

      return conversation;
    },
    [resolvedProjectId],
  );

  const updateConversation = useCallback(
    (id: string, updates: Partial<Conversation>) => {
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === id
            ? {
                ...conversation,
                ...updates,
              }
            : conversation,
        ),
      );

      setActiveConversation((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              ...updates,
            }
          : prev,
      );
    },
    [],
  );

  const renameConversation = useCallback(
    async (id: string, title: string) => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) return;

      const updatedConversation = await renameConversationApi(id, trimmedTitle);

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === id ? updatedConversation : conversation,
        ),
      );

      setActiveConversation((prev) =>
        prev?.id === id ? updatedConversation : prev,
      );
    },
    [],
  );

  const deleteConversation = useCallback(async (id: string) => {
    await deleteConversationApi(id);

    setConversations((prev) => prev.filter((conversation) => conversation.id !== id));

    setActiveConversation((prev) => (prev?.id === id ? null : prev));
  }, []);

  useEffect(() => {
    if (!resolvedProjectId) {
      return;
    }

    const loadConversations = async () => {
      await refreshConversations(resolvedProjectId);
    };

    void loadConversations();
  }, [resolvedProjectId, refreshConversations]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        activeConversation,
        loading,
        setActiveConversation,
        createConversation,
        renameConversation,
        deleteConversation,
        updateConversation,
        refreshConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
