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

  const refreshConversations = useCallback(async (id: string) => {
    if (!id) return;

    setLoading(true);

    try {
      // TODO:
      // const data = await getProjectConversations(id);

      const data: Conversation[] = [];

      setConversations(data);

      if (data.length > 0) {
        setActiveConversation(data[0]);
      } else {
        setActiveConversation(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!projectId) return;

    void Promise.resolve().then(() => {
      void refreshConversations(projectId);
    });
  }, [projectId, refreshConversations]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        activeConversation,
        loading,
        setActiveConversation,
        refreshConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
