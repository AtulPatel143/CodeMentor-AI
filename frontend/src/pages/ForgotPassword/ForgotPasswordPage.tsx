import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-2xl shadow-slate-900/20">
        <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
        <p className="mb-6 text-slate-300">
          Enter your email to receive password reset instructions.
        </p>
        <form className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-400">Email address</span>
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              placeholder="you@example.com"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Send reset link
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Remembered your password?{' '}
          <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
