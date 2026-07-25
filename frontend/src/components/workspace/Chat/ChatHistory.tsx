import ChatMessage from "./ChatMessage";
import type { Message } from "../../../types/message";

const messages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "👋 Welcome to CodeMentor AI! I'm here to help you build, debug, review, and explain your code.",
    conversationId: "demo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    role: "user",
    content: "Create a React authentication page using TypeScript.",
    conversationId: "demo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Absolutely! I'll generate a modern React authentication page with TypeScript, Tailwind CSS, and reusable components.",
    conversationId: "demo",
    createdAt: new Date().toISOString(),
  },
];

const ChatHistory = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatHistory;
