function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-cyan-400">CodeMentor AI</h3>

          <p className="mt-4 text-slate-400">
            Your AI-powered coding companion for learning, debugging, and
            interview preparation.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>

          <ul className="space-y-2 text-slate-400">
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Resources</h4>

          <ul className="space-y-2 text-slate-400">
            <li>Documentation</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>

          <p className="text-slate-400">support@codementorai.com</p>

          <p className="mt-2 text-slate-400">Made by Atul Patel</p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © 2026 CodeMentor AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
