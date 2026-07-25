import { Plus } from "lucide-react";
import { useConversation } from "../context/useConversation";
import { useMessage } from "../context/useMessage";

const NewChatButton = () => {
  const { createConversation } = useConversation();
  const { clearMessages } = useMessage();

  const handleNewChat = () => {
    clearMessages();
    createConversation();
  };

  return (
    <button
      onClick={handleNewChat}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
    >
      <Plus size={18} />
      New Chat
    </button>
  );
};

export default NewChatButton;
