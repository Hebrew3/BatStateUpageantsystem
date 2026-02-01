import { useState } from "react";
import { ShieldIcon } from "@/components/shared/ShieldIcon";
import { RoleCard } from "@/components/shared/RoleCard";
import { LoginModal } from "@/components/shared/LoginModal";

export function HomePage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);

  const adminBullets = [
    "Manage contestants and judges",
    "Configure scoring categories",
    "View all scores and rankings",
    "Generate official results",
  ];

  const judgeBullets = [
    "Input contestant scores",
    "Category-based evaluation",
    "Real-time score submission",
    "Simplified scoring interface",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-8 px-4 text-center border-b bg-card">
        <div className="flex justify-center mb-4">
          <ShieldIcon className="w-16 h-16" />
        </div>
        <h1 className="text-4xl text-red-700/90 text-shadow-2xs tracking-tighter font-bold">MR & MS BatStateU</h1>
        <p className="text-1xl text-muted-foreground mb-1">The NEU - Balayan 2026</p>
        <p className="text-xs text-muted-foreground">
          Digital Scoresheet & Tabulation System
        </p>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <RoleCard
            title="Administrator"
            subtitle="Full system access and management"
            bullets={adminBullets}
            primary
            onClick={() => setShowLogin(true)}
          />
          <RoleCard
            title="Judge Panel"
            subtitle="Scoring and evaluation interface"
            bullets={judgeBullets}
            onClick={() => alert("Judge panel not implemented in this demo")}
          />
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-card">
        © 2026 Batangas State University - The NEU Balayan
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={onLogin}
        />
      )}
    </div>
  );
}

