import { createContext } from "react";
import type { Conversation } from "../types/conversation";

interface ConversationContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;

  loadConversations(projectId: string): Promise<void>;

  createConversation(projectId: string): Promise<void>;

  renameConversation(id: string, title: string): Promise<void>;

  deleteConversation(id: string): Promise<void>;

  setActiveConversation(conversation: Conversation | null): void;
}

export const ConversationContext = createContext<ConversationContextType>(
  {} as ConversationContextType,
);
export type { ConversationContextType };
