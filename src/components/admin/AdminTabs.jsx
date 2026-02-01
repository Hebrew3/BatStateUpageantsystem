import { Button } from "@/components/ui/button";

const tabs = [
  { id: "contestants", label: "Contestants" },
  { id: "judges", label: "Judges" },
  { id: "segments", label: "Segments" },
  { id: "scoring", label: "Scoring" },
  { id: "results", label: "Results" },
];

export function AdminTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-5 p-3 shadow-sm rounded-lg mb-6">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className="flex-1 sm:flex- btn-3d-red text-white font-semibold hover:text-white"
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

