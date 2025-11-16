import { useEffect, useState } from "react";

export default function LibraryMembership() {
  const base = import.meta.env.VITE_BACKEND_URL || "";
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${base}/api/lessons`);
        const data = await res.json();
        setLessons(data);
      } catch(e) { console.error(e); }
    })();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h3 className="text-yellow-200 text-2xl font-semibold mb-4">Spiritual Library</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map(l => (
          <div key={l.slug} className="rounded-xl p-5 bg-indigo-900/60 border border-indigo-700/50">
            <div className="text-yellow-100 font-medium">{l.title}</div>
            <div className="text-yellow-200/80 text-sm mt-1">{l.body}</div>
            {l.badge && <div className="mt-3 inline-block text-xs px-2 py-1 rounded-full bg-yellow-300 text-indigo-900">Badge: {l.badge}</div>}
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-200 text-indigo-900">
        <div className="font-semibold">Membership</div>
        <div className="text-sm">Free tier active. Premium and Master coming with payments integration.</div>
      </div>
    </section>
  );
}
