import { useState } from "react";
import { Plus } from "lucide-react";
import { useConversation } from "../context/useConversation";
import { useMessage } from "../context/useMessage";

const NewChatButton = () => {
  const { createConversation } = useConversation();
  const { clearMessages } = useMessage();
  const [isCreating, setIsCreating] = useState(false);

  const handleNewChat = async () => {
    if (isCreating) return;
    setIsCreating(true);
    try {
      clearMessages();
      await createConversation();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <button
      onClick={handleNewChat}
      disabled={isCreating}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Plus size={18} />
      {isCreating ? "Creating..." : "New Chat"}
    </button>
  );
};

export default NewChatButton;
