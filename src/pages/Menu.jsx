import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { menuCategories, sedi } from '../data/menu'
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

function fmtPrice(n) {
  return n.toFixed(2).replace('.', ',') + '€'
}

function MenuItem({ item, catId, cartEntry, onUpdate }) {
  const id = `${catId}::${item.name}`
  const isNote = item.note
  const hasNumericPrice = typeof item.norm === 'number'
  const hasMaxi = hasNumericPrice && typeof item.maxi === 'number' && item.maxi !== null

  const qty = cartEntry?.qty ?? 0
  const formato = cartEntry?.formato ?? 'norm'
  const modifiche = cartEntry?.modifiche ?? ''
  const nota = cartEntry?.nota ?? ''

  const update = (patch) =>
    onUpdate(id, { qty, formato, modifiche, nota, ...patch })

  return (
    <div className={`py-4 border-b border-cream last:border-0 ${isNote ? 'opacity-70 italic' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline flex-wrap gap-x-1">
            <span className="font-body font-medium text-ink">{item.name}</span>
            {item.badges?.includes('sg') && <BadgeSG />}
            {item.badges?.includes('sl') && <BadgeSL />}
          </div>
          {item.desc && (
            <p className="font-body text-xs text-ink-faint mt-0.5 leading-relaxed capitalize">
              {item.desc}
            </p>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-2 text-sm">
          <PriceTag norm={item.norm} maxi={item.maxi} price={item.price} />
          {item.norm && item.maxi && (
            <p className="text-[10px] text-ink-faint">norm / maxi</p>
          )}

          {hasNumericPrice && !isNote && (
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => update({ qty: qty - 1 })}
                className="w-7 h-7 rounded-full border-2 border-tomato text-tomato font-bold leading-none flex items-center justify-center hover:bg-tomato hover:text-white transition-colors"
                aria-label="Rimuovi uno"
              >
                −
              </button>
              <span className="font-body text-sm font-semibold text-ink w-4 text-center select-none">
                {qty}
              </span>
              <button
                onClick={() => update({ qty: qty + 1 })}
                className="w-7 h-7 rounded-full bg-tomato text-white font-bold leading-none flex items-center justify-center hover:bg-tomato-dark transition-colors"
                aria-label="Aggiungi uno"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {hasNumericPrice && !isNote && qty > 0 && (
        <div className="mt-3 space-y-2">
          {hasMaxi && (
            <div className="flex items-center gap-2">
              <span className="font-body text-xs text-ink-muted">Formato:</span>
              <button
                onClick={() => update({ formato: 'norm' })}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  formato === 'norm'
                    ? 'bg-tomato text-white'
                    : 'border border-cream text-ink-muted hover:border-tomato hover:text-tomato'
                }`}
              >
                Norm {fmtPrice(item.norm)}
              </button>
              <button
                onClick={() => update({ formato: 'maxi' })}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  formato === 'maxi'
                    ? 'bg-tomato text-white'
                    : 'border border-cream text-ink-muted hover:border-tomato hover:text-tomato'
                }`}
              >
                Maxi {fmtPrice(item.maxi)}
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="Modifica ingredienti (es. senza cipolla)"
            value={modifiche}
            onChange={(e) => update({ modifiche: e.target.value })}
            className="w-full text-xs font-body border border-cream rounded-lg px-3 py-1.5 bg-cream placeholder:text-ink-faint text-ink focus:outline-none focus:border-tomato"
          />
          <input
            type="text"
            placeholder="Nota (es. ben cotta)"
            value={nota}
            onChange={(e) => update({ nota: e.target.value })}
            className="w-full text-xs font-body border border-cream rounded-lg px-3 py-1.5 bg-cream placeholder:text-ink-faint text-ink focus:outline-none focus:border-tomato"
          />
        </div>
      )}
    </div>
  )
}

function CategorySection({ category, isActive, onClick, cart, onUpdate }) {
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
            className={`text-tomato transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
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
            <MenuItem
              key={item.name}
              item={item}
              catId={category.id}
              cartEntry={cart[`${category.id}::${item.name}`]}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const WaIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const SEDI_WA = [
  { nome: 'Piazza Armerina', numero: '393802644694' },
  { nome: 'Barrafranca',     numero: '393802644694' },
  { nome: 'Aidone',          numero: '393802644694' },
]

const inputCls = 'w-full font-body text-sm border border-cream rounded-lg p-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-tomato transition-colors'
const labelCls = 'block font-body text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1'

function CartPanel({ cartItems, totalPrice, onClose }) {
  const [sedeModal, setSedeModal] = useState(false)
  const [tipoOrdine, setTipoOrdine] = useState('asporto')
  const [nomeCliente, setNomeCliente] = useState('')
  const [telefono, setTelefono] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [orario, setOrario] = useState('')
  const [pagamento, setPagamento] = useState(null)

  const formValid =
    nomeCliente.trim() !== '' &&
    telefono.trim() !== '' &&
    (tipoOrdine === 'asporto' || indirizzo.trim() !== '') &&
    pagamento !== null

  const buildMessage = () => {
    const righe = ['Ciao Pizzeria Europa! Vorrei effettuare un ordine.']
    righe.push('')
    righe.push(`Nome: ${nomeCliente}`)
    righe.push(`Telefono: ${telefono}`)
    righe.push(`Tipo: ${tipoOrdine === 'domicilio' ? 'Domicilio' : 'Asporto'}`)
    if (tipoOrdine === 'domicilio') righe.push(`Indirizzo: ${indirizzo}`)
    righe.push(`Orario: ${orario.trim() || 'Prima possibile'}`)
    righe.push(`Pagamento: ${pagamento === 'carta' ? 'Carta - il fattorino porterà il POS' : 'Contanti'}`)
    righe.push('')
    righe.push('Ordine:')
    cartItems.forEach(({ item, qty, formato, prezzo, modifiche, nota }) => {
      let riga = `- ${qty}x ${item.name}`
      if (item.maxi) riga += ` (${formato === 'maxi' ? 'maxi' : 'normale'})`
      riga += ` — ${fmtPrice(prezzo * qty)}`
      if (modifiche) riga += `\n  Modifiche: ${modifiche}`
      if (nota) riga += `\n  Note: ${nota}`
      righe.push(riga)
    })
    righe.push('')
    righe.push(`Totale stimato: ${fmtPrice(totalPrice)}`)
    righe.push('')
    righe.push('Grazie!')
    return encodeURIComponent(righe.join('\n'))
  }

  return (
    <>
      {/* Pannello riepilogo (slide da destra) */}
      <div className="fixed inset-0 z-[60] flex">
        <div className="flex-1 bg-ink/50" onClick={onClose} />
        <div className="w-full max-w-md bg-white flex flex-col shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream flex-shrink-0">
            <h2 className="font-heading text-xl text-ink">Il tuo ordine</h2>
            <button
              onClick={onClose}
              className="text-ink-faint hover:text-ink transition-colors"
              aria-label="Chiudi"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.map(({ id, item, qty, formato, prezzo, modifiche, nota }) => (
              <div key={id} className="border-b border-cream pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-body font-semibold text-ink">
                      {qty}× {item.name}
                    </p>
                    {item.maxi && (
                      <p className="font-body text-xs text-ink-muted mt-0.5">
                        Formato {formato === 'maxi' ? 'maxi' : 'normale'}
                      </p>
                    )}
                    {modifiche && (
                      <p className="font-body text-xs text-ink-faint mt-0.5">
                        Modifiche: {modifiche}
                      </p>
                    )}
                    {nota && (
                      <p className="font-body text-xs text-ink-faint">
                        Nota: {nota}
                      </p>
                    )}
                  </div>
                  <span className="font-body font-semibold text-tomato flex-shrink-0">
                    {fmtPrice(prezzo * qty)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-cream flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body font-semibold text-ink">Totale stimato</span>
              <span className="font-heading text-2xl text-tomato">{fmtPrice(totalPrice)}</span>
            </div>
            <button
              onClick={() => setSedeModal(true)}
              className="w-full bg-tomato text-white font-semibold py-3.5 rounded-full hover:bg-tomato-dark transition-colors"
            >
              Scegli sede e ordina →
            </button>
          </div>
        </div>
      </div>

      {/* Modal ordine + selezione sede */}
      {sedeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setSedeModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-cream flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-cream flex-shrink-0">
              <h3 className="font-heading text-xl text-ink">Completa l'ordine</h3>
              <button
                onClick={() => setSedeModal(false)}
                className="text-ink-faint hover:text-ink transition-colors"
                aria-label="Chiudi"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form + sedi */}
            <div className="overflow-y-auto px-6 py-5 space-y-4">

              {/* Tipo ordine */}
              <div>
                <span className={labelCls}>Tipo ordine</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTipoOrdine('domicilio')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-body border-2 transition-colors ${
                      tipoOrdine === 'domicilio'
                        ? 'bg-tomato border-tomato text-white'
                        : 'border-cream text-ink hover:border-tomato'
                    }`}
                  >
                    Domicilio
                  </button>
                  <button
                    onClick={() => setTipoOrdine('asporto')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-body border-2 transition-colors ${
                      tipoOrdine === 'asporto'
                        ? 'bg-tomato border-tomato text-white'
                        : 'border-cream text-ink hover:border-tomato'
                    }`}
                  >
                    Asporto
                  </button>
                </div>
              </div>

              {/* Nome e cognome */}
              <div>
                <label className={labelCls}>Nome e cognome *</label>
                <input
                  type="text"
                  placeholder="Es. Mario Rossi"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Telefono */}
              <div>
                <label className={labelCls}>Numero di telefono *</label>
                <input
                  type="tel"
                  placeholder="Es. 333 1234567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Indirizzo — solo domicilio */}
              {tipoOrdine === 'domicilio' && (
                <div>
                  <label className={labelCls}>Indirizzo di consegna *</label>
                  <input
                    type="text"
                    placeholder="Via Roma 12"
                    value={indirizzo}
                    onChange={(e) => setIndirizzo(e.target.value)}
                    className={inputCls}
                  />
                </div>
              )}

              {/* Orario */}
              <div>
                <label className={labelCls}>Orario desiderato</label>
                <input
                  type="text"
                  placeholder="Es. 20:30"
                  value={orario}
                  onChange={(e) => setOrario(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Pagamento */}
              <div>
                <span className={labelCls}>Metodo di pagamento *</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPagamento('contanti')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-body border-2 transition-colors ${
                      pagamento === 'contanti'
                        ? 'bg-tomato border-tomato text-white'
                        : 'border-cream text-ink hover:border-tomato'
                    }`}
                  >
                    Contanti
                  </button>
                  <button
                    onClick={() => setPagamento('carta')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-body border-2 transition-colors ${
                      pagamento === 'carta'
                        ? 'bg-tomato border-tomato text-white'
                        : 'border-cream text-ink hover:border-tomato'
                    }`}
                  >
                    Carta (POS)
                  </button>
                </div>
              </div>

              {/* Divisore */}
              <div className="border-t border-cream pt-4">
                <p className="font-body text-sm font-semibold text-ink mb-3">
                  Scegli la sede
                </p>
                {!formValid && (
                  <p className="font-body text-xs text-ink-faint mb-3">
                    Compila i campi obbligatori (*) per procedere.
                  </p>
                )}
                <div className="space-y-2">
                  {SEDI_WA.map(({ nome, numero }) => (
                    <a
                      key={nome}
                      href={formValid ? `https://wa.me/${numero}?text=${buildMessage()}` : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={formValid ? onClose : (e) => e.preventDefault()}
                      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border-2 transition-colors ${
                        formValid
                          ? 'border-cream hover:border-green-400 hover:bg-green-50 cursor-pointer'
                          : 'border-cream opacity-50 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      <span className="font-body font-semibold text-ink">{nome}</span>
                      <span className="text-green-600">
                        <WaIcon />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Menu({ onCartOpenChange }) {
  const [activeId, setActiveId] = useState('autore')
  const [cart, setCart] = useState({})
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    onCartOpenChange?.(showCart)
  }, [showCart])

  const toggle = (id) => setActiveId((prev) => (prev === id ? null : id))

  const updateCart = (id, updates) => {
    setCart((prev) => {
      const entry = prev[id] ?? { qty: 0, formato: 'norm', modifiche: '', nota: '' }
      const next = { ...entry, ...updates }
      if (next.qty <= 0) {
        const { [id]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  const cartItems = Object.entries(cart).map(([id, entry]) => {
    const [catId, itemName] = id.split('::')
    const cat = menuCategories.find((c) => c.id === catId)
    const item = cat?.items.find((i) => i.name === itemName)
    const prezzo = entry.formato === 'maxi' && item?.maxi ? item.maxi : item?.norm ?? 0
    return { id, item, ...entry, prezzo }
  })

  const totalQty = cartItems.reduce((sum, e) => sum + e.qty, 0)
  const totalPrice = cartItems.reduce((sum, e) => sum + e.prezzo * e.qty, 0)

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
              cart={cart}
              onUpdate={updateCart}
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

      {/* Cart FAB */}
      {totalQty > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 bg-tomato text-white font-semibold px-5 py-3.5 rounded-full shadow-xl hover:bg-tomato-dark transition-colors"
          >
            <span className="w-6 h-6 bg-white text-tomato text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
              {totalQty}
            </span>
            <span className="font-body">Ordine</span>
            <span className="font-heading">{fmtPrice(totalPrice)}</span>
          </button>
        </div>
      )}

      {/* Cart Panel */}
      {showCart && (
        <CartPanel
          cartItems={cartItems}
          totalPrice={totalPrice}
          onClose={() => setShowCart(false)}
        />
      )}
    </>
  )
}
