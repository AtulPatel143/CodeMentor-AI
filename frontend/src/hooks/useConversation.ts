import { useContext } from "react";
import { ConversationContext } from "../components/workspace/context/ConversationContext";

export const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error("useConversation must be used within ConversationProvider");
  }

  return context;
};

