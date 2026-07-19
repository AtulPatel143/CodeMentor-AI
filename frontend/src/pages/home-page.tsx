import Button from "../components/common/Button";
import FeatureCard from "../components/common/FeatureCard";
import StatCard from "../components/common/StatCard";
import TestimonialCard from "../components/common/TestimonialCard";
import PricingCard from "../components/common/PricingCard";
import Footer from "../components/common/Footer";

function HomePage() {
  return (
    <>
      <section className="relative flex py-24 items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="max-w-4xl text-center">
          <p className="mb-4 text-cyan-400 font-semibold tracking-widest uppercase">
            AI Powered Coding Assistant
          </p>

          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            Build Better Software
            <br />
            with <span className="text-cyan-400">CodeMentor AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Debug faster, review code smarter, prepare for interviews, and learn
            modern development with an AI mentor available whenever you need it.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button>Get Started</Button>
            <Button variant="secondary">Explore Features</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Powerful AI Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="AI Code Review"
            description="Get instant code quality suggestions and best practices."
          />

          <FeatureCard
            title="AI Debugging"
            description="Find bugs quickly with intelligent explanations."
          />

          <FeatureCard
            title="Interview Preparation"
            description="Practice coding interviews with AI guidance."
          />

          <FeatureCard
            title="Learning Roadmaps"
            description="Follow personalized learning paths for modern development."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Trusted by Developers
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard value="10K+" label="Developers Learning" />

          <StatCard value="500K+" label="Lines of Code Reviewed" />

          <StatCard value="98%" label="Positive Feedback" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-4 text-center text-4xl font-bold">
          What Developers Say
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
          Real users share how CodeMentor AI helps them write better code, debug
          faster, and prepare for technical interviews.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <TestimonialCard
            name="Rahul Sharma"
            role="Frontend Developer"
            review="CodeMentor AI reduced my debugging time by almost half. It's like having a senior developer available anytime."
          />

          <TestimonialCard
            name="Priya Verma"
            role="Computer Science Student"
            review="The interview preparation feature helped me crack my internship. The explanations are simple and practical."
          />

          <TestimonialCard
            name="Amit Patel"
            role="Full Stack Developer"
            review="I use it daily for code reviews. The AI catches issues that I often miss during development."
          />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-4 text-center text-4xl font-bold">Simple Pricing</h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
          Start for free and upgrade whenever you're ready.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <PricingCard
            title="Free"
            price="₹0"
            buttonText="Start Free"
            features={[
              "20 AI prompts/day",
              "Basic code review",
              "Community support",
            ]}
          />

          <PricingCard
            title="Pro"
            price="₹499/mo"
            buttonText="Upgrade Now"
            featured
            features={[
              "Unlimited AI chat",
              "AI code review",
              "AI debugger",
              "Interview preparation",
              "Priority support",
            ]}
          />

          <PricingCard
            title="Team"
            price="₹1499/mo"
            buttonText="Contact Sales"
            features={[
              "Unlimited team members",
              "Shared workspaces",
              "Analytics dashboard",
              "Enterprise security",
            ]}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
