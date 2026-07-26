import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Code Generation",
    description:
      "Generate clean and optimized code in multiple programming languages.",
    icon: "💻",
  },
  {
    title: "Bug Fixing",
    description:
      "Find and fix coding errors instantly with AI-powered suggestions.",
    icon: "🐞",
  },
  {
    title: "Code Explanation",
    description: "Understand complex code with simple AI explanations.",
    icon: "📖",
  },
  {
    title: "Project Guidance",
    description: "Build complete projects step-by-step with your AI mentor.",
    icon: "🚀",
  },
];

function HomePage() {
  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            🚀 AI Powered Coding Assistant
          </span>

          <h1 className="mt-8 bg-gradient-to-r from-white via-cyan-200 to-cyan-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl">
            Learn, Build & Debug
            <span className="block">with CodeMentor AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Your personal AI coding mentor. Generate code, fix bugs, explain
            concepts, and build projects faster using the power of AI.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/workspace"
              className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-900 transition hover:bg-cyan-400"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-cyan-500 hover:text-cyan-400"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-white">
          Why Choose CodeMentor AI?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-500"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>

              <h3 className="mb-3 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-10 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-cyan-400">10K+</h3>
            <p className="mt-2 text-slate-400">Developers</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-cyan-400">1M+</h3>
            <p className="mt-2 text-slate-400">Lines Generated</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-cyan-400">99%</h3>
            <p className="mt-2 text-slate-400">Accuracy</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-cyan-400">24/7</h3>
            <p className="mt-2 text-slate-400">AI Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
