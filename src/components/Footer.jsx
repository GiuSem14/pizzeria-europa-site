import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { sedi } from '../data/menu'

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 font-body">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <p className="font-heading text-2xl text-cream-light mb-3">
            Pizzeria <span className="text-gold">Europa</span>
          </p>
          <p className="text-sm leading-relaxed text-cream/60 mb-6">
            Lievitazione naturale 24–48 ore, cottura a legna, materie prime selezionate.
            Dal cuore della Sicilia, in provincia di Enna.
          </p>
          <a
            href="mailto:flaviomira88@gmail.com"
            className="text-sm text-gold hover:text-gold-light transition-colors"
          >
            flaviomira88@gmail.com
          </a>
        </div>

        {/* Sedi */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
            Le Nostre Sedi
          </p>
          <ul className="space-y-4">
            {sedi.map((s) => (
              <li key={s.id}>
                <p className="text-sm font-semibold text-cream-light">{s.nome}</p>
                <p className="text-sm text-cream/60">{s.indirizzo}</p>
                <div className="mt-1.5 space-y-0.5">
                  <p className="flex items-center gap-1.5 text-xs text-white/50">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    Mer–Dom: 12:00–14:30 / 19:00–23:30
                  </p>
                  <p className="text-xs text-white/50 pl-[18px]">
                    Lun: solo cena · Mar: chiuso
                  </p>
                </div>
                <a
                  href={`tel:${s.tel}`}
                  className="text-sm text-gold hover:text-gold-light transition-colors"
                >
                  {s.telDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-4">
            Link rapidi
          </p>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/menu', label: 'Menù completo' },
              { to: '/chi-siamo', label: 'Chi Siamo' },
              { to: '/contatti', label: 'Contatti e Prenotazioni' },
              { to: '/contatti', label: 'Prenota un tavolo' },
              { to: '/contatti', label: 'Consegna a domicilio' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-cream/60 hover:text-cream-light transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} Pizzeria Europa — Tutti i diritti riservati
          </p>
          <div className="flex items-center gap-3 text-xs text-cream/30">
            <Link to="/privacy" className="hover:text-cream/60 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link to="/cookie-policy" className="hover:text-cream/60 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
