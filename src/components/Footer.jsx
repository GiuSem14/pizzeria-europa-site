import { Link } from 'react-router-dom'
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

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-3">
              Ordina o prenota
            </p>
            <a
              href="https://wa.me/393663674311"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Barrafranca
            </a>
          </div>
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
