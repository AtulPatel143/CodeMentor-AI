import { createContext } from "react";
import type { Message } from "../../../types/message";

interface MessageContextType {
  messages: Message[];
  loading: boolean;
  streaming: boolean;

  loadMessages(conversationId: string): Promise<void>;

  sendMessage(conversationId: string, content: string): Promise<void>;

  stopGenerating(): void;

  clearMessages(): void;

  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessageContext = createContext({} as MessageContextType);
export type { MessageContextType };
