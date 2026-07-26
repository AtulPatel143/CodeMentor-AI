import robot from "../assets/robot.png";

const WelcomeScreen = () => {
  return (
    <div className="flex h-full items-center justify-center bg-[#0B1120] px-6">
      <div className="max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
          🤖 AI Coding Workspace
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CodeMentor AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Your intelligent coding companion. Generate code, debug faster,
          explain concepts, and build projects with AI-powered assistance.
        </p>

        {/* Robot */}
        <div className="mt-12 flex justify-center">
          <img
            src={robot}
            alt="CodeMentor AI"
            className="w-[420px] max-w-full drop-shadow-[0_0_40px_rgba(34,211,238,0.35)]"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
