import { useState } from "react";
import { motion } from "framer-motion";

export default function JournalOracle({ user }) {
  const base = import.meta.env.VITE_BACKEND_URL || "";
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [saving, setSaving] = useState(false);

  const saveJournal = async () => {
    if (!user || !text.trim()) return;
    setSaving(true);
    try {
      await fetch(`${base}/api/journal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, content: text })
      });
    } finally { setSaving(false); }
  };

  const askOracle = async () => {
    if (!text.trim()) return;
    setResponse(null);
    try {
      const res = await fetch(`${base}/api/oracle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id, prompt: text })
      });
      const data = await res.json();
      setResponse(data);
    } catch (e) { console.error(e); }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="bg-indigo-900/60 border border-indigo-700/50 rounded-2xl p-6">
        <div className="text-yellow-200 uppercase tracking-widest text-xs mb-3">Journal</div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Share your dream, symbol, or feeling..." className="w-full h-48 rounded-xl p-4 bg-indigo-950/60 border border-indigo-800 text-yellow-100 focus:outline-none" />
        <div className="mt-3 flex gap-3">
          <button onClick={saveJournal} className="px-4 py-2 rounded-full bg-yellow-300 text-indigo-900 font-semibold hover:bg-yellow-200">{saving? 'Saving...' : 'Save Entry'}</button>
          <button onClick={askOracle} className="px-4 py-2 rounded-full bg-indigo-800 text-yellow-200 hover:bg-indigo-700">Ask The Lens</button>
        </div>
      </motion.div>
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="bg-indigo-900/60 border border-indigo-700/50 rounded-2xl p-6">
        <div className="text-yellow-200 uppercase tracking-widest text-xs mb-3">Lens Oracle</div>
        {response ? (
          <div className="text-yellow-100 whitespace-pre-wrap leading-relaxed">{response.interpretation}</div>
        ) : (
          <div className="text-yellow-200/70">Your insights will appear here with gentle guidance.</div>
        )}
      </motion.div>
    </section>
  );
}
