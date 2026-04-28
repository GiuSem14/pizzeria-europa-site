import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cookieConsent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream-light shadow-[0_-4px_24px_rgba(0,0,0,0.08)] border-t border-cream">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-body text-sm text-ink-muted leading-relaxed">
          Questo sito utilizza cookie tecnici necessari al funzionamento.
          Nessun cookie di profilazione viene utilizzato.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/cookie-policy"
            className="font-body text-sm text-ink-faint hover:text-ink underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            Scopri di più
          </Link>
          <button
            onClick={accept}
            className="bg-tomato hover:bg-tomato-dark text-white font-body text-sm font-semibold px-5 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
