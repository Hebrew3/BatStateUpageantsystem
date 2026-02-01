import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { ContestantsPanel } from "@/components/admin/ContestantsPanel";
import { JudgesPanel } from "@/components/admin/JudgesPanel";
import { SegmentsPanel } from "@/components/admin/SegmentsPanel";

export function AdminDashboardPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("contestants");

  const renderTabContent = () => {
    switch (activeTab) {
      case "contestants":
        return <ContestantsPanel />;
      case "judges":
        return <JudgesPanel />;
      case "segments":
        return <SegmentsPanel />;
      case "scoring":
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Scoring</h3>
            <p className="text-muted-foreground">
              Scoring interface (placeholder)
            </p>
          </div>
        );
      case "results":
        return (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Results</h3>
            <p className="text-muted-foreground">
              Official results and export (placeholder)
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AdminHeader onLogout={onLogout} />
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

