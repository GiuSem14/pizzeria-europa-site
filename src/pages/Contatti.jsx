import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { sedi } from '../data/menu'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mlgayaok'

function SedCard({ sede }) {
  return (
    <div className="bg-cream-light rounded-2xl p-7">
      <h3 className="font-heading text-xl text-ink font-semibold mb-4">{sede.nome}</h3>

      <div className="space-y-3 text-sm font-body">
        <div className="flex items-start gap-3">
          <svg className="w-4 h-4 text-tomato mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <p className="text-ink">{sede.indirizzo}</p>
            <p className="text-ink-muted">{sede.cap} {sede.citta}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-tomato flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${sede.tel}`} className="text-tomato font-medium hover:text-tomato-dark transition-colors">
            {sede.telDisplay}
          </a>
        </div>

        {sede.telMobile && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <a
              href={`https://wa.me/${sede.telMobile.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              {sede.telMobileDisplay} (WhatsApp)
            </a>
          </div>
        )}
      </div>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sede.indirizzo + ', ' + sede.citta)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-ink-faint hover:text-ink transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Apri in Google Maps
      </a>
    </div>
  )
}

export default function Contatti() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ nome: '', email: '', telefono: '', messaggio: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nome: '', email: '', telefono: '', messaggio: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contatti — Pizzeria Europa</title>
        <meta
          name="description"
          content="Contatta Pizzeria Europa: tre sedi a Piazza Armerina, Barrafranca e Aidone. Prenota un tavolo, ordina a domicilio o scrivici per un evento."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-ink pt-32 pb-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Dove siamo
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">
            Contatti
          </h1>
          <p className="font-body text-cream/60 leading-relaxed">
            Tre sedi a tua disposizione. Chiama, scrivi su WhatsApp o compilando il modulo.
          </p>
        </div>
      </section>

      {/* Sedi */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Le nostre sedi
            </p>
            <h2 className="font-heading text-4xl text-ink">Trovaci vicino a te</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sedi.map((s) => (
              <SedCard key={s.id} sede={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Mappe */}
      <section className="bg-cream-light py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nome: 'Piazza Armerina',
                src: 'https://maps.google.com/maps?q=Piazza+Giorgio+Boris+Giuliano+33,+94015+Piazza+Armerina,+EN,+Italy&output=embed&hl=it',
              },
              {
                nome: 'Barrafranca',
                src: 'https://maps.google.com/maps?q=Corso+Garibaldi+350,+94012+Barrafranca,+EN,+Italy&output=embed&hl=it',
              },
              {
                nome: 'Aidone',
                src: 'https://maps.google.com/maps?q=Via+Martiri+della+Libert%C3%A0+15,+94010+Aidone,+EN,+Italy&output=embed&hl=it',
              },
            ].map(({ nome, src }) => (
              <div key={nome}>
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2 pl-1">
                  {nome}
                </p>
                <iframe
                  title={`Mappa sede ${nome}`}
                  src={src}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-2xl shadow-md"
                />
              </div>
            ))}
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

      {/* Form Formspree */}
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

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <span className="text-4xl block mb-4">✓</span>
              <h3 className="font-heading text-2xl text-ink mb-2">Messaggio inviato!</h3>
              <p className="font-body text-sm text-ink-muted">
                Ti risponderemo al più presto. Grazie per aver contattato Pizzeria Europa.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-tomato hover:text-tomato-dark transition-colors"
              >
                Invia un altro messaggio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nome" className="block font-body text-sm font-medium text-ink mb-1.5">
                    Nome e cognome <span className="text-tomato">*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={form.nome}
                    onChange={handleChange}
                    className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato transition-colors"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block font-body text-sm font-medium text-ink mb-1.5">
                    Telefono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato transition-colors"
                    placeholder="+39 333 000 0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-body text-sm font-medium text-ink mb-1.5">
                  Email <span className="text-tomato">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato transition-colors"
                  placeholder="mario@email.com"
                />
              </div>

              <div>
                <label htmlFor="messaggio" className="block font-body text-sm font-medium text-ink mb-1.5">
                  Messaggio <span className="text-tomato">*</span>
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  required
                  rows={5}
                  value={form.messaggio}
                  onChange={handleChange}
                  className="w-full bg-cream-light border border-cream rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-tomato/30 focus:border-tomato transition-colors resize-none"
                  placeholder="Vorrei prenotare un tavolo per 4 persone sabato sera..."
                />
              </div>

              {status === 'error' && (
                <p className="font-body text-sm text-tomato bg-red-50 rounded-xl px-4 py-3">
                  Si è verificato un errore. Riprova o contattaci direttamente per telefono.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-tomato hover:bg-tomato-dark disabled:opacity-60 text-white font-semibold py-4 rounded-full transition-colors"
              >
                {status === 'sending' ? 'Invio in corso…' : 'Invia messaggio'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
