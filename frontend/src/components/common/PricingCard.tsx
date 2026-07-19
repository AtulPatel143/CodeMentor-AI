type PricingCardProps = {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  featured?: boolean;
};

function PricingCard({
  title,
  price,
  features,
  buttonText,
  featured = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-8 text-center transition hover:scale-105 ${
        featured
          ? "border-cyan-400 bg-slate-800 shadow-lg shadow-cyan-500/20"
          : "border-slate-700 bg-slate-800/50"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-4 py-1 text-xs font-bold text-slate-900">
          MOST POPULAR
        </span>
      )}
      <h3 className="text-2xl font-bold text-cyan-400">{title}</h3>

      <p className="mt-6 text-5xl font-extrabold">{price}</p>

      <ul className="mt-6 space-y-3 text-left text-slate-300">
        {features.map((feature) => (
          <li key={feature}>✔ {feature}</li>
        ))}
      </ul>

      <button className="mt-8 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400">
        {buttonText}
      </button>
    </div>
  );
}

export default PricingCard;
