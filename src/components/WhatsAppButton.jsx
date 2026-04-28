import { useState, useEffect, useRef } from 'react'
import { MessageCircle } from 'lucide-react'

const sedi = [
  { nome: 'Piazza Armerina', href: 'https://wa.me/390935182485', display: '0935 182 2485' },
  { nome: 'Barrafranca', href: 'https://wa.me/390934976507', display: '0934 976507' },
  { nome: 'Aidone', href: 'https://wa.me/390935545864', display: '0935 545864' },
]

export default function WhatsAppButton() {
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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {/* Pannello sedi */}
      {open && (
        <div className="absolute bottom-20 right-0 w-56 bg-white rounded-2xl shadow-xl border border-cream overflow-hidden">
          <p className="px-4 pt-4 pb-2 font-body text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Scegli la sede
          </p>
          {sedi.map(({ nome, href, display }) => (
            <a
              key={nome}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col px-4 py-3 hover:bg-cream transition-colors border-t border-cream first-of-type:border-0"
              onClick={() => setOpen(false)}
            >
              <span className="font-body text-sm font-semibold text-ink">{nome}</span>
              <span className="font-body text-xs mt-0.5" style={{ color: '#25D366' }}>{display}</span>
            </a>
          ))}
        </div>
      )}

      {/* Pulsante WhatsApp */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contatta su WhatsApp"
        aria-expanded={open}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all text-white"
        style={{ backgroundColor: open ? '#1da851' : '#25D366' }}
      >
        <MessageCircle size={24} strokeWidth={2} />
      </button>
    </div>
  )
}
