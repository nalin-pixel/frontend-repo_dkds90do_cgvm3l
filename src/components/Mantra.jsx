import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

export default function Mantra({ user }) {
  const [mantra, setMantra] = useState(null);
  const [loading, setLoading] = useState(false);
  const base = import.meta.env.VITE_BACKEND_URL || "";

  const speak = (text) => {
    if (window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = user?.locale === 'sw' ? 'sw-KE' : 'en-US';
      window.speechSynthesis.speak(u);
    }
  };

  const generate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${base}/api/mantra/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, user_stage: user.stage })
      });
      const data = await res.json();
      setMantra(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if(user) generate(); }, [user]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-10 text-center">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="bg-gradient-to-br from-indigo-900/70 to-indigo-700/40 border border-indigo-600/40 rounded-2xl p-8 shadow-2xl">
        <div className="text-yellow-200 uppercase tracking-widest text-xs mb-2">Daily Mantra</div>
        <div className="text-2xl md:text-3xl text-yellow-100 font-serif leading-relaxed min-h-[3.5rem]">
          {mantra?.text || (loading ? 'Tuning to Ashe...' : 'Tap generate to receive guidance')}
        </div>
        {mantra?.meaning && (
          <div className="text-yellow-200/80 mt-3 text-sm">{mantra.meaning}</div>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={generate} className="px-4 py-2 rounded-full bg-yellow-300 text-indigo-900 font-semibold hover:bg-yellow-200">{loading? 'Channeling...' : 'Generate'}</button>
          {mantra?.text && (
            <button onClick={() => speak(mantra.text)} className="px-3 py-2 rounded-full bg-indigo-800 text-yellow-200 flex items-center gap-2 hover:bg-indigo-700">
              <Volume2 size={18}/> Speak
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
