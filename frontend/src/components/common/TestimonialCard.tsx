type TestimonialCardProps = {
  name: string;
  role: string;
  review: string;
};

function TestimonialCard({ name, role, review }: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">
      <p className="italic text-slate-300">"{review}"</p>

      <div className="mt-6">
        <h3 className="font-semibold text-cyan-400">{name}</h3>

        <p className="text-sm text-slate-400">{role}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
