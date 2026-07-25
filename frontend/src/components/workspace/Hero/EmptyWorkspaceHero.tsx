import { Sparkles } from "lucide-react";
import PromptCards from "./PromptCards";

const EmptyWorkspaceHero = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-500/10 ring-1 ring-cyan-500/20">
          <Sparkles size={42} className="text-cyan-400" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome to CodeMentor AI
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
          Build, debug, review, and learn with an AI coding mentor. Start by
          creating a project or choose one from the sidebar.
        </p>

        <div className="mt-12 w-full">
          <PromptCards />
        </div>
      </div>
    </div>
  );
};

export default EmptyWorkspaceHero;
