import ChatMessage from "./ChatMessage";

const messages = [
  {
    id: "1",
    role: "assistant" as const,
    content:
      "👋 Welcome to CodeMentor AI! I'm here to help you build, debug, review, and explain your code.",
  },
  {
    id: "2",
    role: "user" as const,
    content: "Create a React authentication page using TypeScript.",
  },
  {
    id: "3",
    role: "assistant" as const,
    content:
      "Absolutely! I'll generate a modern React authentication page with TypeScript, Tailwind CSS, and reusable components.",
  },
];

const ChatHistory = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-8">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
};

export default ChatHistory;
