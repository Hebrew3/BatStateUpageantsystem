export function StatsCard({ number, label }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4 text-center">
      <div className="text-4xl font-bold text-shadow-2xs text-red-700/90">{number}</div>
      <div className="text-muted-foreground text-sm mt-1">{label}</div>
    </div>
  );
}

