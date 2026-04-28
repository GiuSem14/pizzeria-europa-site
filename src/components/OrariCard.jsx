import { Clock } from 'lucide-react'

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function getGiornoOggi() {
  return capitalize(new Date().toLocaleDateString('it-IT', { weekday: 'long' }))
}

export default function OrariCard({ sede }) {
  const oggi = getGiornoOggi()

  return (
    <div className="bg-white border border-cream rounded-xl overflow-hidden font-body shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-cream">
        <Clock size={16} className="text-tomato flex-shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Orari di apertura
        </span>
      </div>

      {/* Righe giorni */}
      <ul>
        {sede.giorni.map(({ giorno, pranzo, cena }) => {
          const isOggi = capitalize(giorno) === oggi
          const chiuso = pranzo === null && cena === null

          return (
            <li
              key={giorno}
              className={`flex items-start justify-between gap-4 px-5 py-2.5 border-b border-cream/60 last:border-b-0 ${
                isOggi ? 'bg-cream' : ''
              }`}
            >
              {/* Giorno */}
              <div className="flex items-center gap-2 min-w-[100px]">
                <span
                  className={`text-sm font-medium ${
                    isOggi ? 'text-tomato' : 'text-ink'
                  }`}
                >
                  {giorno}
                </span>
                {isOggi && (
                  <span className="text-[10px] font-semibold uppercase tracking-wide bg-tomato text-white px-1.5 py-0.5 rounded-full leading-none">
                    oggi
                  </span>
                )}
              </div>

              {/* Orari */}
              <div className="text-right">
                {chiuso ? (
                  <span className="text-sm italic text-ink-faint">Chiuso</span>
                ) : (
                  <div className="flex flex-col gap-0.5">
                    {pranzo && (
                      <span className="text-sm text-ink-muted">
                        <span className="text-[11px] text-ink-faint mr-1">pranzo</span>
                        {pranzo}
                      </span>
                    )}
                    {cena && (
                      <span className="text-sm text-ink-muted">
                        <span className="text-[11px] text-ink-faint mr-1">cena</span>
                        {cena}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
