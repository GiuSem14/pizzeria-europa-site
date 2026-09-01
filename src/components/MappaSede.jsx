import { useState } from 'react'
import { Map as MapIcon } from 'lucide-react'

// Embed della mappa Google di una sede. L'indirizzo non è mai scritto qui:
// arriva da `urlMappa` in src/data/sedi.js.
//
// Questo è l'UNICO punto del sito in cui viene montato un iframe di Google
// Maps, ed è click-to-load: finché l'utente non preme "Mostra mappa" non parte
// nessuna richiesta verso Google. Il click vale come consenso per quella sola
// visualizzazione — niente localStorage, niente memoria tra pagine o tra
// istanze del componente.
export default function MappaSede({ sede, height = 220, className = '' }) {
  const [mostraMappa, setMostraMappa] = useState(false)

  if (!sede?.urlMappa) return null

  if (mostraMappa) {
    return (
      <iframe
        title={`Mappa di Pizzeria Europa — ${sede.nome}, ${sede.indirizzo}`}
        src={sede.urlMappa}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={className}
      />
    )
  }

  // Il placeholder riceve le stesse `height` e `className` dell'iframe, così al
  // click il layout non si sposta. È `minHeight` e non `height`: alle larghezze
  // strette il testo va a capo e il contenuto supererebbe l'altezza fissa,
  // troncando proprio la nota sui cookie. Meglio crescere di qualche pixel che
  // nascondere quella riga.
  //
  // Una `height` in percentuale non è invece una min-height utilizzabile: si
  // risolverebbe sull'altezza della riga, che dipende da cosa c'è accanto. In
  // quel caso l'altezza la impone il chiamante via `className`.
  const altezzaInPercentuale = String(height).endsWith('%')

  // Stesso formato usato nelle schede sede in Contatti.jsx: porta alla
  // scheda luogo di Google Maps, più utile della vista embed di `urlMappa`.
  const linkGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${sede.indirizzo}, ${sede.citta}`
  )}`

  return (
    <div
      style={altezzaInPercentuale ? undefined : { minHeight: height }}
      className={`flex flex-col items-center justify-center gap-2.5 px-4 py-3 text-center bg-cream-light border border-cream ${className}`}
    >
      <MapIcon className="w-6 h-6 text-tomato flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />

      <div className="font-body text-sm leading-snug">
        <p className="text-ink font-semibold">{sede.indirizzo}</p>
        <p className="text-ink-muted">{sede.cap} {sede.citta}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setMostraMappa(true)}
          className="bg-tomato hover:bg-tomato-dark text-white font-body text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Mostra mappa
        </button>
        <a
          href={linkGoogleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm font-semibold text-ink-faint hover:text-ink underline underline-offset-2 transition-colors px-2 py-2"
        >
          Apri in Google Maps
        </a>
      </div>

      <p className="font-body text-[11px] leading-snug text-ink-faint max-w-xs">
        Caricando la mappa accetti i cookie di Google Maps.
      </p>
    </div>
  )
}
