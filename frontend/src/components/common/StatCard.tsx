type StatCardProps = {
  value: string;
  label: string;
};

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8 text-center transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">
      <h3 className="text-4xl font-bold text-cyan-400">{value}</h3>

      <p className="mt-2 text-slate-300">{label}</p>
    </div>
  );
}

export default StatCard;
