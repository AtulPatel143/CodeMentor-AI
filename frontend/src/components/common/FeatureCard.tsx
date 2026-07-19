type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">
      <h3 className="mb-3 text-xl font-semibold text-cyan-400">
        {title}
      </h3>

      <p className="text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;