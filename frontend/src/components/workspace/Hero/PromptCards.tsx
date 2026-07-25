import {
  Bug,
  Code2,
  Lightbulb,
  SearchCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

const prompts = [
  {
    icon: Code2,
    title: "Generate Code",
    description: "Create new components, APIs, or features.",
  },
  {
    icon: Bug,
    title: "Debug Error",
    description: "Find and fix issues in your code.",
  },
  {
    icon: SearchCheck,
    title: "Review Code",
    description: "Get feedback on quality and best practices.",
  },
  {
    icon: Wrench,
    title: "Refactor",
    description: "Improve readability and maintainability.",
  },
  {
    icon: Lightbulb,
    title: "Explain Code",
    description: "Understand complex logic step by step.",
  },
  {
    icon: Sparkles,
    title: "Optimize",
    description: "Improve performance and scalability.",
  },
];

const PromptCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map(({ icon: Icon, title, description }) => (
        <button
          key={title}
          className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-800"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
            <Icon size={22} className="text-cyan-400" />
          </div>

          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-300">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </button>
      ))}
    </div>
  );
};

export default PromptCards;
