import { Sparkles } from "lucide-react";

export default function Header({ current, onNavigate }) {
  const tabs = [
    { key: "onboarding", label: "Awakening Path" },
    { key: "mantra", label: "Daily Mantra" },
    { key: "journal", label: "Journal & Oracle" },
    { key: "library", label: "Library & Membership" },
  ];

  return (
    <header className="w-full sticky top-0 z-30 backdrop-blur bg-indigo-950/50 border-b border-indigo-800/40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gold-400">
          <Sparkles className="text-yellow-300" />
          <span className="font-semibold tracking-wide text-yellow-300">WonderLens Chronicles</span>
        </div>
        <nav className="flex gap-2 text-sm">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => onNavigate(t.key)}
              className={`px-3 py-1.5 rounded-full transition-all ${current===t.key ? 'bg-yellow-300 text-indigo-950' : 'text-yellow-200 hover:bg-indigo-800/60'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
