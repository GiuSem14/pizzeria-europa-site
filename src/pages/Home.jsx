import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { sedi } from '../data/menu'

const highlights = [
  {
    icon: '🔥',
    title: 'Forno a Legna',
    desc: 'Cottura a legna per una crosta croccante e un cuore morbido. La tradizione che fa la differenza.',
  },
  {
    icon: '🌿',
    title: 'Ingredienti km0',
    desc: 'Salsiccia locale, tuma siciliana, olio EVO del territorio. Sapori autentici a km zero.',
  },
  {
    icon: '🌾',
    title: 'Senza Glutine',
    desc: 'Impasto senza glutine disponibile per tutti i tipi di pizza. Gusto senza compromessi.',
  },
  {
    icon: '🛵',
    title: 'Delivery & Asporto',
    desc: 'Consegna a domicilio nelle tre sedi. Oppure passa a ritirare, pronto in pochi minuti.',
  },
]

const featuredPizzas = [
  {
    name: 'Mortadella',
    price: '11€',
    desc: 'Bufala, mortadella Rovagnati riserva oro, scamorza, pesto pistacchio, burrata pugliese',
    tag: 'La più richiesta',
  },
  {
    name: 'Bronte',
    price: '10€',
    desc: 'Bufala campana, gamberetti, zucchine, pesto pistacchio, olio EVO',
    tag: "Pizza d'Autore",
  },
  {
    name: 'Carbonara',
    price: '9€',
    desc: 'Carbon crema, fior di latte, guanciale, uova, Grana Padano',
    tag: 'Storica',
  },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pizzeria Europa — Pizza Artigianale in Provincia di Enna</title>
        <meta
          name="description"
          content="Pizzeria Europa: lievitazione naturale 24-48h, cottura a legna, ingredienti km0. Tre sedi a Piazza Armerina, Barrafranca e Aidone. Ordina ora."
        />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen bg-ink flex items-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-tomato/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle, #E8A020 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Pizzeria Europa — Provincia di Enna, Sicilia
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream-light leading-tight mb-6">
            L'arte della pizza,
            <br />
            <em className="not-italic text-tomato">il cuore</em> della Sicilia
          </h1>
          <p className="font-body text-cream/60 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Lievitazione naturale 24–48 ore, cottura a legna, materie prime selezionate.
            Tre sedi in provincia di Enna per portarti il meglio della tradizione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-tomato hover:bg-tomato-dark text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Sfoglia il Menù
            </Link>
            <Link
              to="/contatti"
              className="border-2 border-cream/40 text-cream-light hover:border-cream hover:text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Le Nostre Sedi
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/30">
            <span className="text-xs font-body uppercase tracking-widest">Scopri</span>
            <div className="w-px h-8 bg-cream/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Perché sceglierci
            </p>
            <h2 className="font-heading text-4xl text-ink">
              Ogni dettaglio fa la differenza
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-cream-light rounded-2xl p-7 hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-5 block">{icon}</span>
                <h3 className="font-heading text-lg text-ink font-semibold mb-2">
                  {title}
                </h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANTEPRIMA MENU */}
      <section className="bg-cream-light py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Dal nostro menù
            </p>
            <h2 className="font-heading text-4xl text-ink">
              Le pizze che non puoi perdere
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredPizzas.map(({ name, price, desc, tag }) => (
              <div
                key={name}
                className="group bg-cream rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Placeholder image area */}
                <div className="h-44 bg-gradient-to-br from-tomato/20 to-gold/20 flex items-center justify-center">
                  <span className="font-heading text-6xl text-tomato/30 select-none">
                    {name[0]}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-xl text-ink font-semibold">
                      {name}
                    </h3>
                    <span className="font-body text-lg font-semibold text-tomato ml-2">
                      {price}
                    </span>
                  </div>
                  <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                    {desc}
                  </p>
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block border-2 border-tomato text-tomato hover:bg-tomato hover:text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Vedi il menù completo →
            </Link>
          </div>
        </div>
      </section>

      {/* QUALITÀ */}
      <section className="bg-ink py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                La nostra filosofia
              </p>
              <h2 className="font-heading text-4xl text-cream-light leading-tight mb-6">
                Solo ingredienti <em className="not-italic text-tomato">veri</em>
              </h2>
              <p className="font-body text-cream/60 leading-relaxed mb-6">
                Usiamo salsiccia fresca locale, tuma siciliana, olio extravergine d'oliva del
                territorio. Ogni pizza nasce da un impasto lievitato naturalmente per 24–48 ore,
                poi cotto nel forno a legna per restituirti il sapore autentico della tradizione.
              </p>
              <ul className="space-y-3">
                {[
                  'Salumi Rovagnati — certificati senza glutine e senza lattosio',
                  'Menu SRL — specialità dal 1932, ISO 22000 e FSSC 22000',
                  'Caseificio La Gaipa — mozzarella e latticini artigianali',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    <span className="font-body text-sm text-cream/70">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/chi-siamo"
                className="inline-block mt-8 text-gold hover:text-gold-light font-semibold text-sm transition-colors"
              >
                Scopri la nostra storia →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '24–48h', label: 'Lievitazione naturale' },
                { value: '3', label: 'Sedi in provincia di Enna' },
                { value: '60+', label: 'Pizze in menù' },
                { value: '100%', label: 'Ingredienti selezionati' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white/5 rounded-2xl p-6 text-center border border-white/10"
                >
                  <p className="font-heading text-3xl text-gold mb-2">{value}</p>
                  <p className="font-body text-xs text-cream/50 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEDI */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Dove trovarci
            </p>
            <h2 className="font-heading text-4xl text-ink">Tre sedi, un'unica qualità</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sedi.map((s) => (
              <div key={s.id} className="bg-cream-light rounded-2xl p-7">
                <h3 className="font-heading text-xl text-ink font-semibold mb-1">{s.nome}</h3>
                <p className="font-body text-sm text-ink-muted mb-1">{s.indirizzo}</p>
                <p className="font-body text-sm text-ink-muted mb-4">{s.citta}</p>
                <a
                  href={`tel:${s.tel}`}
                  className="inline-flex items-center gap-2 text-tomato font-semibold text-sm hover:text-tomato-dark transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {s.telDisplay}
                </a>
                {s.telMobile && (
                  <a
                    href={`https://wa.me/${s.telMobile.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors mt-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp {s.telMobileDisplay}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-tomato py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-white mb-4">
            Hai voglia di pizza?
          </h2>
          <p className="font-body text-white/80 text-lg mb-10">
            Ordina adesso, vieni a trovarci, o contattaci per un evento su misura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390935549864"
              className="bg-white text-tomato font-semibold px-8 py-4 rounded-full hover:bg-cream transition-colors"
            >
              Chiama ora
            </a>
            <Link
              to="/contatti"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-tomato transition-colors"
            >
              Scrivici
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
