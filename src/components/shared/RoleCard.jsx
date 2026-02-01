import { Button } from "@/components/ui/button";

export function RoleCard({ title, subtitle, bullets, onClick }) {
  const roleName = title.split(' ')[0];

  return (
    <div className="bg-card text-card-foreground border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-white shadow-2xs outline-1 flex items-center justify-center">
          <div className="w-6 h-6 bg-red-700/90 rounded-full" />
        </div>
      </div>
      <h3 className="text-3xl text-red-700/90 text-shadow-2xs tracking-tighter font-semibold text-center mb-2">{title}</h3>
      <p className="text-muted-foreground text-center text-sm mb-4">{subtitle}</p>
      <ul className="space-y-2 mb-6">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-shadow-2xs text-primary/80 ">{bullet}</span>
          </li>
        ))}
      </ul>
      <Button
        className="w-full btn-3d-red"
        onClick={onClick}
      >
        Access as {roleName}
      </Button>
    </div>
  );
}

