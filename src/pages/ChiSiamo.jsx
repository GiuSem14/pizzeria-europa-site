import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Thermometer, Timer, Flame } from 'lucide-react'
import imgLievitazione from '../assets/lievitazione-naturale.png'
import imgCottura from '../assets/cottura-a-legna.png'
import imgTerritorio from '../assets/vegetali.png'
import imgInclusivita from '../assets/pizza.png'
import forno from '../assets/forno.png'
import pizzeria from '../assets/pizzeria.png'

const values = [
  {
    title: 'Lievitazione naturale',
    desc: "Il nostro impasto riposa 24–48 ore. Non si accelera la natura: si aspetta, e il risultato si sente ad ogni morso.",
    img: imgLievitazione,
  },
  {
    title: 'Cottura a legna',
    desc: "Il forno a legna trasforma ogni pizza: crosta croccante fuori, alveolata dentro, con quel sapore di fumo che non si imita.",
    img: imgCottura,
  },
  {
    title: 'Territorio e km0',
    desc: "Salsiccia fresca locale, tuma siciliana, olio extravergine d'oliva della provincia. Sapori che raccontano questo territorio.",
    img: imgTerritorio,
  },
  {
    title: 'Inclusività a tavola',
    desc: "Impasto senza glutine per tutti i tipi di pizza, mozzarella senza lattosio disponibile. Nessuno rimane fuori.",
    img: imgInclusivita,
  },
]

const fornitori = [
  {
    nome: 'Salumi Rovagnati',
    desc: "Leader nella salumeria artigianale italiana. I loro prodotti — tra cui la mortadella Riserva Oro — sono certificati senza glutine e senza lattosio.",
    certificazioni: ['Senza Glutine', 'Senza Lattosio'],
  },
  {
    nome: 'Menu SRL',
    desc: "Specialità alimentari dal 1932. Un'azienda che porta avanti la tradizione gastronomica italiana con standard di qualità internazionali.",
    certificazioni: ['ISO 22000', 'ISO 9001', 'FSSC 22000'],
  },
  {
    nome: 'Caseificio La Gaipa',
    desc: "Mozzarella e latticini artigianali. La nostra fior di latte e la bufala campana arrivano da chi conosce il latte come una lingua madre.",
    certificazioni: ['Artigianale'],
  },
]

export default function ChiSiamo() {
  return (
    <>
      <Helmet>
        <title>Chi Siamo – Pizzeria Europa | La Nostra Storia</title>
        <meta name="description" content="La storia di Pizzeria Europa: passione per la pizza napoletana, forno a legna, ingredienti a km0 e tre sedi in provincia di Enna." />
        <meta property="og:title" content="Chi Siamo – Pizzeria Europa" />
        <meta property="og:description" content="La nostra storia, i nostri valori e la passione per la pizza artigianale." />
        <meta property="og:url" content="https://pizzeria-europa-site.vercel.app/chi-siamo" />
      </Helmet>

      {/* Header */}
      <section className="bg-ink pt-32 pb-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            La nostra storia
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">
            Chi Siamo
          </h1>
          <p className="font-body text-cream/60 leading-relaxed">
            Una pizzeria nata dalla passione per la pizza vera, cresciuta nel cuore della Sicilia.
          </p>
        </div>
      </section>

      {/* Storia */}
      <section className="bg-cream-light py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Le nostre radici
              </p>
              <h2 className="font-heading text-4xl text-ink leading-tight mb-6">
                Pizza artigianale,<br />
                <em className="not-italic text-tomato">cuore siciliano</em>
              </h2>
              <p className="font-body text-ink-muted leading-relaxed mb-4">
                Pizzeria Europa nasce in provincia di Enna con un'idea semplice: fare la pizza
                come si fa in casa, con gli ingredienti giusti, i tempi giusti, il calore giusto.
              </p>
              <p className="font-body text-ink-muted leading-relaxed mb-4">
                Tre sedi — Piazza Armerina, Barrafranca, Aidone — unite dalla stessa filosofia:
                niente scorciatoie. Impasto lievitato naturalmente per 24–48 ore, farina
                selezionata, cottura a legna. Ogni pizza esce dal forno come deve.
              </p>
              <p className="font-body text-ink-muted leading-relaxed">
                Il territorio parla nei nostri ingredienti: la salsiccia è locale, la tuma è
                siciliana, l'olio è extravergine d'oliva della nostra provincia. Non usiamo
                surrogati e non cerchiamo scorciatoie.
              </p>
            </div>

            {/* Stats decorative */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '3', label: 'Sedi in provincia di Enna' },
                { value: '24–48h', label: 'Lievitazione naturale' },
                { value: '60+', label: 'Pizze nel menù' },
                { value: '100%', label: 'Ingredienti selezionati' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-cream rounded-2xl p-6 text-center border border-cream"
                >
                  <p className="font-heading text-3xl text-tomato mb-2">{value}</p>
                  <p className="font-body text-xs text-ink-muted leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Forno a legna */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={forno}
          alt="Forno a legna Pizzeria Europa acceso durante la cottura"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Il cuore della pizzeria
          </p>
          <h2 className="font-heading text-4xl text-cream-light mb-6">
            Il forno a legna
          </h2>
          <p className="font-body text-cream/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Ogni pizza che esce dalle nostre cucine passa per il forno a legna. Non è solo una
            tecnica: è una scelta. Il fuoco di legna raggiunge temperature che nessun forno
            elettrico replica, creando quella crosta sottile e croccante con un interno soffice e
            leggermente affumicato che rende la pizza napoletana un'esperienza a sé.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { Icon: Thermometer, title: '400–500°C', desc: 'Temperatura di cottura' },
              { Icon: Timer, title: '60–90 sec', desc: 'Tempo di cottura perfetto' },
              { Icon: Flame, title: 'Legna selezionata', desc: 'Per un aroma autentico' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-tomato" strokeWidth={1.5} />
                </div>
                <p className="font-heading text-xl text-cream-light mb-1">{title}</p>
                <p className="font-body text-sm text-cream/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              La nostra filosofia
            </p>
            <h2 className="font-heading text-4xl text-ink">I valori che ci guidano</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ title, desc, img }) => (
              <div key={title} className="bg-cream-light rounded-xl overflow-hidden">
                <img src={img} alt={`${title} – Pizzeria Europa`} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-5">
                  <h3 className="font-heading text-xl text-ink font-semibold mb-3">{title}</h3>
                  <p className="font-body text-sm text-ink-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fornitori */}
      <section className="bg-cream-light py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-tomato text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Qualità certificata
            </p>
            <h2 className="font-heading text-4xl text-ink">I nostri fornitori</h2>
            <p className="font-body text-ink-muted mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Scegliamo solo fornitori che condividono il nostro impegno per la qualità,
              la tracciabilità e la sicurezza alimentare.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fornitori.map(({ nome, desc, certificazioni }) => (
              <div key={nome} className="bg-cream rounded-2xl p-7">
                <h3 className="font-heading text-xl text-ink font-semibold mb-3">{nome}</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {certificazioni.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-semibold bg-gold/15 text-gold-dark px-2.5 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center overflow-hidden">
        <img
          src={pizzeria}
          alt="Sala interna Pizzeria Europa – ambiente caldo e accogliente"
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-white mb-4">
            Vieni a trovarci
          </h2>
          <p className="font-body text-white/80 mb-10">
            Tre sedi, una sola qualità. Siamo a Piazza Armerina, Barrafranca e Aidone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contatti"
              className="bg-white text-tomato font-semibold px-8 py-4 rounded-full hover:bg-cream transition-colors"
            >
              Scopri le sedi
            </Link>
            <Link
              to="/menu"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-tomato transition-colors"
            >
              Vedi il menù
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
