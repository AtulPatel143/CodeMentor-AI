import { Bot } from "lucide-react";

const WelcomeScreen = () => {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* AI Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
          <Bot className="h-12 w-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CodeMentor AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
          Your AI coding assistant. Ask questions, generate code, debug issues,
          and build projects faster with intelligent conversations.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
