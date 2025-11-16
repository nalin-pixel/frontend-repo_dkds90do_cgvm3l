import { useEffect, useState } from 'react'
import Header from './components/Header'
import Onboarding from './components/Onboarding'
import Mantra from './components/Mantra'
import JournalOracle from './components/JournalOracle'
import LibraryMembership from './components/LibraryMembership'

function App() {
  const [view, setView] = useState('onboarding')
  const [user, setUser] = useState(null)
  const base = import.meta.env.VITE_BACKEND_URL || ''

  // Simple demo user creation in DB (no auth yet)
  useEffect(() => {
    const init = async () => {
      const display_name = 'Seeker'
      const email = `seeker@wonderlens.local`
      const res = await fetch(`${base}/api/users/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name, email })
      })
      const data = await res.json()
      setUser({ id: data.user_id, stage: data.stage, locale: 'en', name: display_name })
    }
    init()
  }, [])

  const handleStage = async (stage) => {
    if (!user) return
    await fetch(`${base}/api/users/stage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, stage })
    })
    setUser({ ...user, stage })
    setView('mantra')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-900 text-yellow-50">
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <Header current={view} onNavigate={setView} />

      {view === 'onboarding' && <Onboarding onComplete={handleStage} />}
      {view === 'mantra' && <Mantra user={user} />}
      {view === 'journal' && <JournalOracle user={user} />}
      {view === 'library' && <LibraryMembership />}

      <footer className="text-center text-yellow-200/70 text-xs py-6">
        See Through the Wonder. Live Through the Lens.
      </footer>
    </div>
  )
}

export default App
