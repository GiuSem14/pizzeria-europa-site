import { useState, useEffect, useRef } from 'react'
import { PhoneCall } from 'lucide-react'

const sedi = [
  { nome: 'Piazza Armerina', tel: 'tel:+390935182485', display: '0935 182 2485' },
  { nome: 'Barrafranca', tel: 'tel:+390934976507', display: '0934 976507' },
  { nome: 'Aidone', tel: 'tel:+390935545864', display: '0935 545864' },
]

export default function CallButton({ isHidden = false }) {
  if (isHidden) return null
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

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

  return (
    <div ref={containerRef} className="fixed bottom-36 right-6 z-50">
      {/* Pannello sedi */}
      {open && (
        <div className="absolute bottom-20 right-0 w-56 bg-white rounded-2xl shadow-xl border border-cream overflow-hidden">
          <p className="px-4 pt-4 pb-2 font-body text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Scegli la sede
          </p>
          {sedi.map(({ nome, tel, display }) => (
            <a
              key={nome}
              href={tel}
              className="flex flex-col px-4 py-3 hover:bg-cream transition-colors border-t border-cream first-of-type:border-0"
              onClick={() => setOpen(false)}
            >
              <span className="font-body text-sm font-semibold text-ink">{nome}</span>
              <span className="font-body text-xs text-tomato mt-0.5">{display}</span>
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
