import { useState, useEffect, useRef } from 'react'
import { PhoneCall } from 'lucide-react'
import { sediAttive, telHref } from '../data/sedi'

export default function CallButton({ isHidden = false }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('openCallPanel', handleOpen)
    return () => window.removeEventListener('openCallPanel', handleOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (isHidden) return null

  return (
    <div ref={containerRef} className="fixed bottom-36 right-6 z-50">
      {/* Pannello sedi */}
      {open && (
        <div className="absolute bottom-20 right-0 w-56 bg-white rounded-2xl shadow-xl border border-cream overflow-hidden">
          <p className="px-4 pt-4 pb-2 font-body text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Scegli la sede
          </p>
          {sediAttive.map((s) => (
            <a
              key={s.id}
              href={telHref(s.telefono)}
              className="flex flex-col px-4 py-3 hover:bg-cream transition-colors border-t border-cream first-of-type:border-0"
              onClick={() => setOpen(false)}
            >
              <span className="font-body text-sm font-semibold text-ink">{s.nome}</span>
              <span className="font-body text-xs text-tomato mt-0.5">{s.telefono}</span>
            </a>
          ))}
        </div>
      )}

      {/* Pulsante cornetta */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chiama Pizzeria Europa"
        aria-expanded={open}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
          open
            ? 'bg-tomato-dark shadow-xl'
            : 'bg-tomato hover:bg-tomato-dark hover:shadow-xl'
        } text-white`}
      >
        <PhoneCall size={22} strokeWidth={2} />
      </button>
    </div>
  )
}
