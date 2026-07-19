type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

function Button({ children, variant = "primary" }: ButtonProps) {
  const base = "rounded-lg px-6 py-3 font-semibold transition";

  const styles =
    variant === "primary"
      ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
      : "border border-slate-600 hover:border-cyan-400 hover:text-cyan-400";

  return <button className={`${base} ${styles}`}>{children}</button>;
}

export default Button;
