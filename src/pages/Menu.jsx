import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { menuCategories } from '../data/menu'
import pizze from '../assets/pizze.png'
import ordinazioni from '../assets/ordinazioni.png'

function BadgeSG() {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 px-1.5 py-0.5 rounded ml-1.5">
      SG
    </span>
  )
}

function BadgeSL() {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1.5">
      SL
    </span>
  )
}

function PriceTag({ norm, maxi, price }) {
  if (price) return <span className="font-semibold text-tomato">{price}</span>
  if (norm && !maxi) return <span className="font-semibold text-tomato">{norm.toFixed(2).replace('.', ',')}€</span>
  if (norm && maxi)
    return (
      <span className="font-semibold text-tomato whitespace-nowrap">
        {norm.toFixed(2).replace('.', ',')}€
        <span className="text-ink-faint font-normal text-xs mx-1">/</span>
        {maxi.toFixed(2).replace('.', ',')}€
      </span>
    )
  return null
}

function MenuItem({ item }) {
  const isNote = item.note
  return (
    <div
      className={`flex items-start justify-between py-4 border-b border-cream last:border-0 gap-4 ${
        isNote ? 'opacity-70 italic' : ''
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline flex-wrap gap-x-1">
          <span className="font-body font-medium text-ink">
            {item.name}
          </span>
          {item.badges?.includes('sg') && <BadgeSG />}
          {item.badges?.includes('sl') && <BadgeSL />}
        </div>
        {item.desc && (
          <p className="font-body text-xs text-ink-faint mt-0.5 leading-relaxed capitalize">
            {item.desc}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 text-right text-sm">
        <PriceTag norm={item.norm} maxi={item.maxi} price={item.price} />
        {item.norm && item.maxi && (
          <p className="text-[10px] text-ink-faint mt-0.5">norm / maxi</p>
        )}
      </div>
    </div>
  )
}

function CategorySection({ category, isActive, onClick }) {
  return (
    <div id={category.id}>
      <button
        className="w-full text-left"
        onClick={onClick}
        aria-expanded={isActive}
      >
        <div className="flex items-center justify-between py-4 px-6 bg-cream-light hover:bg-cream transition-colors rounded-2xl cursor-pointer">
          <div>
            <h2 className="font-heading text-xl text-ink font-semibold">
              {category.label}
            </h2>
            {category.subtitle && (
              <p className="font-body text-xs text-ink-faint mt-0.5">{category.subtitle}</p>
            )}
          </div>
          <span
            className={`text-tomato transition-transform duration-200 ${
              isActive ? 'rotate-180' : ''
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>

      {isActive && (
        <div className="px-6 py-2">
          {category.items.map((item) => (
            <MenuItem key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Menu() {
  const [activeId, setActiveId] = useState('autore')

  const toggle = (id) => setActiveId((prev) => (prev === id ? null : id))

  return (
    <>
      <Helmet>
        <title>Menù — Pizzeria Europa</title>
        <meta
          name="description"
          content="Menù completo Pizzeria Europa: pizze d'autore, pizze storiche, tradizione, pizzicotti, panini, fritture e bevande. Impasto senza glutine disponibile."
        />
      </Helmet>

      {/* Header */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <img
          src={pizze}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Il nostro menù
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">
            Scegli la tua pizza
          </h1>
          <p className="font-body text-cream/60 leading-relaxed">
            Lievitazione naturale 24–48 ore, cottura a legna, ingredienti selezionati.
            Impasto senza glutine disponibile su richiesta per tutte le pizze.
          </p>
        </div>
      </section>

      {/* Legenda badge */}
      <div className="bg-cream border-b border-cream py-3">
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-6 text-xs font-body text-ink-muted flex-wrap">
          <span className="font-semibold text-ink-muted">Legenda:</span>
          <span className="flex items-center gap-1.5">
            <BadgeSG /> Senza Glutine (certificato)
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeSL /> Senza Lattosio (certificato)
          </span>
          <span className="text-ink-faint italic">
            Impasto SG disponibile su richiesta per tutte le pizze.
          </span>
        </div>
      </div>

      {/* Prezzi norm/maxi */}
      <div className="bg-cream-light border-b border-cream py-3">
        <div className="max-w-3xl mx-auto px-6 text-xs font-body text-ink-faint">
          <strong className="text-ink-muted">norm</strong> = formato normale &nbsp;|&nbsp;
          <strong className="text-ink-muted">maxi</strong> = formato maxi
        </div>
      </div>

      {/* Categorie */}
      <section className="bg-cream-light py-10">
        <div className="max-w-3xl mx-auto px-6 space-y-3">
          {menuCategories.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat}
              isActive={activeId === cat.id}
              onClick={() => toggle(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* Nota allergeni */}
      <section className="bg-cream py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-cream-light rounded-2xl p-6 text-xs font-body text-ink-muted leading-relaxed border border-cream">
            <strong className="text-ink">Allergeni:</strong> Tutti i piatti potrebbero contenere
            frutta a guscio, sesamo, glutine, lattosio, latte, crostacei, uova, soia, molluschi,
            senape. Per informazioni dettagliate sugli allergeni chiedi al personale.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 text-center overflow-hidden">
        <img
          src={ordinazioni}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <h2 className="font-heading text-3xl text-white mb-3">
            Pronto a ordinare?
          </h2>
          <p className="font-body text-white/80 mb-8">
            Chiama la sede più vicina o scrivici su WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390935549864"
              className="bg-white text-tomato font-semibold px-8 py-3.5 rounded-full hover:bg-cream transition-colors"
            >
              Chiama ora
            </a>
            <a
              href="https://wa.me/393663674311"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white hover:text-tomato transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
