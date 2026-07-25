/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

  createConversation: () => Conversation;

  renameConversation: (id: string, title: string) => void;

  deleteConversation: (id: string) => void;

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
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  const [loading, setLoading] = useState(false);

  const createConversation = () => {
    const now = new Date().toISOString();

    const conversation: Conversation = {
      id: crypto.randomUUID(),
      title: "New Chat",
      createdAt: now,
      updatedAt: now,
    };

    setConversations((prev) => [conversation, ...prev]);

    setActiveConversation(conversation);

    return conversation;
  };

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
    (id: string, title: string) => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) return;

      updateConversation(id, {
        title: trimmedTitle,
        updatedAt: new Date().toISOString(),
      });
    },
    [updateConversation],
  );

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) =>
      prev.filter((conversation) => conversation.id !== id),
    );

    setActiveConversation((prev) => (prev?.id === id ? null : prev));
  }, []);

  const refreshConversations = useCallback(async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      // TODO:
      // const data =
      //   await getProjectConversations(id);

      const data: Conversation[] = [];

      setConversations(data);

      setActiveConversation(data.length > 0 ? data[0] : null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!projectId) return;

    void refreshConversations(projectId);
  }, [projectId, refreshConversations]);

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
