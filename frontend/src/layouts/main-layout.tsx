import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-2xl font-extrabold text-cyan-400 tracking-wide">
            CodeMentor AI
          </h1>

          <nav className="flex gap-6 text-sm">
            <a href="/" className="transition hover:text-cyan-400">
              Home
            </a>
            <a href="#" className="transition hover:text-cyan-400">
              Features
            </a>
            <a href="#" className="transition hover:text-cyan-400">
              Login
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
