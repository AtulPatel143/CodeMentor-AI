import ChatItem from "./ChatItem";
import type { Conversation } from "../context/ConversationContext";

interface Props {
  conversations: Conversation[];
}

const ChatList = ({ conversations }: Props) => {
  if (conversations.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-slate-500">
        No conversations found.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation: Conversation) => (
        <ChatItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};

export default ChatList;
