import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { sedi } from '../data/menu'
import contatti from '../assets/contatti.png'
import { orariSedi } from '../data/orari'
import OrariCard from '../components/OrariCard'

const SEDI_CONTATTI = [
  { nome: 'Piazza Armerina', numero: '393802644694' },
  { nome: 'Barrafranca',     numero: '393802644694' },
  { nome: 'Aidone',          numero: '393802644694' },
]

const MAP_SRC = {
  'Piazza Armerina': 'https://maps.google.com/maps?q=Piazza+Giorgio+Boris+Giuliano+33,+94015+Piazza+Armerina,+EN,+Italy&output=embed&hl=it',
  'Barrafranca':     'https://maps.google.com/maps?q=Corso+Garibaldi+350,+94012+Barrafranca,+EN,+Italy&output=embed&hl=it',
  'Aidone':          'https://maps.google.com/maps?q=Via+Martiri+della+Libert%C3%A0+15,+94010+Aidone,+EN,+Italy&output=embed&hl=it',
}

// SVG path helpers
const IconPin = () => (
  <svg className="w-4 h-4 text-tomato mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-4 h-4 text-tomato flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const IconWhatsApp = () => (
  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IconExternal = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

export default function Contatti() {
  const [nome, setNome] = useState('')
  const [telefono, setTelefono] = useState('')
  const [messaggio, setMessaggio] = useState('')
  const [sede, setSede] = useState(null)

  const formValid = nome.trim() !== '' && messaggio.trim() !== '' && sede !== null

  const handleInvia = () => {
    const selectedSede = SEDI_CONTATTI.find((s) => s.nome === sede)
    const msg = encodeURIComponent(
      `Ciao Pizzeria Europa!\n\nNome: ${nome}\nTelefono: ${telefono.trim() || 'Non fornito'}\n\nMessaggio:\n${messaggio}`
    )
    window.open(`https://wa.me/${selectedSede.numero}?text=${msg}`, '_blank')
  }

  return (
    <>
      <Helmet>
        <title>Contatti e Sedi – Pizzeria Europa | Piazza Armerina, Barrafranca, Aidone</title>
        <meta name="description" content="Trova Pizzeria Europa a Piazza Armerina, Barrafranca e Aidone. Orari, indirizzi, telefono e WhatsApp per prenotazioni e ordini." />
        <meta property="og:title" content="Contatti – Pizzeria Europa" />
        <meta property="og:description" content="Tre sedi in provincia di Enna. Prenota un tavolo o ordina via WhatsApp." />
        <meta property="og:url" content="https://pizzeria-europa-site.vercel.app/contatti" />
      </Helmet>

      {/* Header */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <img
          src={contatti}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Dove siamo
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">Contatti</h1>
          <p className="font-body text-cream/60 leading-relaxed">
            Tre sedi a tua disposizione. Chiama, scrivi su WhatsApp o compila il modulo.
          </p>
        </div>
      </section>

      {/* Sedi */}
      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Le nostre sedi
            </p>
            <h2 className="font-heading text-4xl text-ink">Trovaci vicino a te</h2>
          </div>

          <div className="flex flex-col gap-10">
            {sedi.map((s) => {
              const orari = orariSedi.find((o) => o.sede === s.nome)
              return (
                <div
                  key={s.id}
                  className="bg-white border border-cream rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Colonna sinistra — contatti + mappa */}
                    <div className="flex flex-col p-8 gap-6 border-b border-cream md:border-b-0 md:border-r">

                      {/* Nome */}
                      <h3 className="font-heading text-2xl text-ink font-semibold">{s.nome}</h3>

                      {/* Info contatto */}
                      <div className="space-y-3 font-body text-sm">
                        <div className="flex items-start gap-3">
                          <IconPin />
                          <div>
                            <p className="text-ink">{s.indirizzo}</p>
                            <p className="text-ink-muted">{s.cap} {s.citta}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <IconPhone />
                          <a
                            href={`tel:${s.tel}`}
                            className="text-tomato font-medium hover:text-tomato-dark transition-colors"
                          >
                            {s.telDisplay}
                          </a>
                        </div>

                        {s.telMobile && (
                          <div className="flex items-center gap-3">
                            <IconWhatsApp />
                            <a
                              href={`https://wa.me/${s.telMobile.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 font-medium hover:text-green-700 transition-colors"
                            >
                              {s.telMobileDisplay} (WhatsApp)
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Link Google Maps */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.indirizzo + ', ' + s.citta)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-faint hover:text-ink transition-colors"
                      >
                        <IconExternal />
                        Apri in Google Maps
                      </a>

                      {/* Embed mappa */}
                      <iframe
                        title={`Mappa sede ${s.nome}`}
                        src={MAP_SRC[s.nome]}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full rounded-xl mt-auto"
                      />
                    </div>

                    {/* Colonna destra — orari */}
                    <div className="p-8">
                      {orari && <OrariCard sede={orari} />}
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Canali rapidi */}
      <section className="bg-cream-light py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="tel:+390935549864"
              className="group flex flex-col items-center text-center p-7 bg-cream rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-tomato/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-tomato/20 transition-colors">
                <svg className="w-6 h-6 text-tomato" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-ink font-semibold mb-1">Telefono</h3>
              <p className="font-body text-xs text-ink-muted">Chiama direttamente la sede</p>
            </a>

            <a
              href="https://wa.me/393663674311"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-7 bg-cream rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-ink font-semibold mb-1">WhatsApp</h3>
              <p className="font-body text-xs text-ink-muted">Sede Barrafranca — 366 3674311</p>
            </a>

            <a
              href="mailto:flaviomira88@gmail.com"
              className="group flex flex-col items-center text-center p-7 bg-cream rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <svg className="w-6 h-6 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-ink font-semibold mb-1">Email</h3>
              <p className="font-body text-xs text-ink-muted">flaviomira88@gmail.com</p>
            </a>
          </div>
        </div>
      </section>

      {/* Form WhatsApp */}
      <section className="bg-cream py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Scrivici
            </p>
            <h2 className="font-heading text-4xl text-ink mb-3">
              Prenota o inviaci un messaggio
            </h2>
            <p className="font-body text-sm text-ink-muted">
              Per prenotazioni, ordini catering, eventi o semplici domande.
            </p>
          </div>

          <div className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block font-body text-sm font-medium text-ink mb-1.5">
                Nome e cognome <span className="text-tomato">*</span>
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-tomato transition-colors"
                placeholder="Mario Rossi"
              />
            </div>

            {/* Telefono */}
            <div>
              <label htmlFor="telefono" className="block font-body text-sm font-medium text-ink mb-1.5">
                Telefono
              </label>
              <input
                id="telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-tomato transition-colors"
                placeholder="+39 333 000 0000"
              />
            </div>

            {/* Messaggio */}
            <div>
              <label htmlFor="messaggio" className="block font-body text-sm font-medium text-ink mb-1.5">
                Messaggio <span className="text-tomato">*</span>
              </label>
              <textarea
                id="messaggio"
                rows={5}
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-tomato transition-colors resize-none"
                placeholder="Vorrei prenotare un tavolo per 4 persone sabato sera..."
              />
            </div>

            {/* Sede */}
            <div>
              <span className="block font-body text-sm font-medium text-ink mb-1.5">
                Sede <span className="text-tomato">*</span>
              </span>
              <div className="flex gap-2">
                {SEDI_CONTATTI.map(({ nome: nomeSede }) => (
                  <button
                    key={nomeSede}
                    onClick={() => setSede(nomeSede)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold font-body border-2 transition-colors ${
                      sede === nomeSede
                        ? 'bg-tomato border-tomato text-white'
                        : 'border-cream text-ink hover:border-tomato'
                    }`}
                  >
                    {nomeSede}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleInvia}
              disabled={!formValid}
              className="w-full bg-tomato hover:bg-tomato-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-full transition-colors"
            >
              Invia messaggio su WhatsApp
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
