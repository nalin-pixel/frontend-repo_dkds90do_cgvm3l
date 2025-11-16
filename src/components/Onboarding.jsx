import { motion } from "framer-motion";

const stages = ["Awakening", "Healing", "Embodiment", "Manifestation", "Communion"];

export default function Onboarding({ onComplete }) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-semibold text-yellow-200 mb-6"
      >
        Choose your current stage
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stages.map((s, i) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onComplete(s)}
            className="rounded-xl p-4 bg-indigo-900/60 border border-indigo-700/50 text-yellow-100 shadow-inner"
          >
            <div className="text-lg font-medium">{s}</div>
            <div className="text-xs opacity-80">Tap to align your path</div>
          </motion.button>
        ))}
      </div>
      <p className="text-yellow-300/70 text-sm mt-6">
        Sacred geometry and ambient sound are coming soon.
      </p>
    </section>
  );
}
