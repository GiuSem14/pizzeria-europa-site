import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Truck, ShoppingBag, UtensilsCrossed, X, ChevronLeft, Phone } from 'lucide-react'
import { sedi } from '../data/menu'

const sediContatti = [
  { nome: 'Piazza Armerina', tel: 'tel:+390935182485', wa: 'https://wa.me/390935182485', display: '0935 182 2485' },
  { nome: 'Barrafranca', tel: 'tel:+390934976507', wa: 'https://wa.me/390934976507', display: '0934 976507' },
  { nome: 'Aidone', tel: 'tel:+390935545864', wa: 'https://wa.me/390935545864', display: '0935 545864' },
]

const services = [
  {
    Icon: Truck,
    title: 'Consegna a domicilio',
    desc: 'Portiamo la pizza direttamente a casa tua nelle zone servite da ciascuna sede.',
  },
  {
    Icon: ShoppingBag,
    title: 'Asporto',
    desc: 'Ordina e ritira quando vuoi: pronta in pochi minuti, calda e fragrante.',
  },
  {
    Icon: UtensilsCrossed,
    title: 'Cena in sede',
    desc: 'Accomodati da noi: ambiente caldo e accogliente, servizio attento.',
  },
]

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

const reviews = [
  {
    name: 'Francesca Schiavoni',
    text: 'Flavio e il suo team ti fanno sentire come a casa, con un servizio attento e gentile. Le pizze? Strepitose e con ingredienti freschissimi.',
  },
  {
    name: 'Martin V.',
    text: 'Veniamo spesso qui, la pizza è sempre buonissima. Il personale è davvero gentile e sempre disponibile. 5 stelle meritatissime.',
  },
  {
    name: 'John Bevilacqua',
    text: 'La migliore pizzeria da asporto di Piazza Armerina. Locale pulito ed accogliente, personale gentilissimo e professionale.',
  },
  {
    name: 'Romina Mendola',
    text: 'Un ambiente molto carino, ragazzi molto bravi ed accoglienti. Pizza senza glutine Ottima!',
  },
  {
    name: 'Marco Spelta',
    text: 'Pizzi-cotto fantastico, stracarico e gustosissimo!! Pizza fantastica, gustosa e soprattutto molto digeribile. Veloci e prezzo onesto!',
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
  const [modal, setModal] = useState(null) // null | 'main' | 'phone' | 'whatsapp'

  const closeModal = () => setModal(null)

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
            <button
              onClick={() => setModal('main')}
              className="border-2 border-gold text-gold hover:bg-gold hover:text-ink font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Prenota un tavolo
            </button>
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

      {/* SERVIZI */}
      <section className="bg-ink py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5 bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-tomato/20 flex items-center justify-center">
                  <Icon size={22} className="text-tomato" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-heading text-base text-cream-light font-semibold mb-1">{title}</h3>
                  <p className="font-body text-sm text-cream/50 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="bg-cream-light py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header con rating aggregato */}
          <div className="text-center mb-12">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Cosa dicono di noi
            </p>
            <h2 className="font-heading text-4xl text-ink mb-4">
              Le parole dei nostri clienti
            </h2>
            <div className="inline-flex items-center gap-2.5 bg-cream rounded-full px-5 py-2.5">
              {/* Stelle aggregate */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-sm font-semibold text-ink">4,6</span>
              <span className="font-body text-sm text-ink-muted">· 376 recensioni Google</span>
            </div>
          </div>

          {/* Carousel mobile / griglia desktop */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6
                          md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0
                          scrollbar-none">
            {reviews.map(({ name, text }) => (
              <div
                key={name}
                className="flex-shrink-0 w-[80vw] sm:w-[60vw] snap-start
                           md:w-auto md:flex-shrink
                           bg-cream rounded-2xl p-6 flex flex-col gap-4"
              >
                {/* Virgolette decorative */}
                <span className="font-heading text-5xl text-gold/40 leading-none select-none -mb-2">
                  "
                </span>
                <p className="font-body text-sm text-ink-muted leading-relaxed flex-1">
                  {text}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-cream-light">
                  <div>
                    <p className="font-body text-sm font-semibold text-ink">{name}</p>
                    <p className="font-body text-xs text-ink-faint mt-0.5">Google</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
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
      {/* MODAL PRENOTA */}
      {modal && (
        <div
          className="fixed inset-0 bg-ink/60 z-50 flex items-center justify-center px-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-cream">
              <div className="flex items-center gap-2">
                {modal !== 'main' && (
                  <button
                    onClick={() => setModal('main')}
                    className="text-ink-faint hover:text-ink transition-colors mr-1"
                    aria-label="Torna indietro"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h3 className="font-heading text-xl text-ink font-semibold">
                  {modal === 'main' && 'Prenota un tavolo'}
                  {modal === 'phone' && 'Chiama per prenotare'}
                  {modal === 'whatsapp' && 'Scrivi su WhatsApp'}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-ink-faint hover:text-ink transition-colors"
                aria-label="Chiudi"
              >
                <X size={20} />
              </button>
            </div>

            {/* Corpo — vista principale */}
            {modal === 'main' && (
              <div className="p-6 flex flex-col gap-3">
                <button
                  onClick={() => setModal('phone')}
                  className="flex items-center gap-4 w-full text-left p-4 rounded-xl border-2 border-cream hover:border-tomato hover:bg-cream transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-tomato/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-tomato" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink">Chiama per prenotare</p>
                    <p className="font-body text-xs text-ink-faint mt-0.5">Seleziona la sede più vicina</p>
                  </div>
                </button>
                <button
                  onClick={() => setModal('whatsapp')}
                  className="flex items-center gap-4 w-full text-left p-4 rounded-xl border-2 border-cream hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink">Scrivi su WhatsApp</p>
                    <p className="font-body text-xs text-ink-faint mt-0.5">Risposta rapida, seleziona la sede</p>
                  </div>
                </button>
              </div>
            )}

            {/* Corpo — sedi telefono */}
            {modal === 'phone' && (
              <div className="py-2">
                {sediContatti.map(({ nome, tel, display }) => (
                  <a
                    key={nome}
                    href={tel}
                    className="flex items-center justify-between px-6 py-4 hover:bg-cream transition-colors border-b border-cream last:border-0"
                    onClick={closeModal}
                  >
                    <span className="font-body text-sm font-semibold text-ink">{nome}</span>
                    <span className="font-body text-sm text-tomato font-medium">{display}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Corpo — sedi WhatsApp */}
            {modal === 'whatsapp' && (
              <div className="py-2">
                {sediContatti.map(({ nome, wa, display }) => (
                  <a
                    key={nome}
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-6 py-4 hover:bg-green-50 transition-colors border-b border-cream last:border-0"
                    onClick={closeModal}
                  >
                    <span className="font-body text-sm font-semibold text-ink">{nome}</span>
                    <span className="font-body text-sm font-medium" style={{ color: '#25D366' }}>{display}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
