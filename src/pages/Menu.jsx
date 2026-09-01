import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { menuCategories } from '../data/menu'
import {
  supplementi as tuttiSupplementi,
  rimozioni as tutteRimozioni,
  totaleSupplementi,
  nomiSupplementi,
  nomiRimozioni,
} from '../data/supplementi'
import { sediAttive, sedeUnica, telHref, waHref } from '../data/sedi'
import pizze from '../assets/pizze.webp'
import ordinazioni from '../assets/ordinazioni.webp'

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

function QtyControl({ qty, onInc, onDec, label }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onDec}
        className="w-7 h-7 rounded-full border-2 border-tomato text-tomato font-bold leading-none flex items-center justify-center hover:bg-tomato hover:text-white transition-colors"
        aria-label={`Rimuovi ${label}`}
      >
        −
      </button>
      <span className="font-body text-sm font-semibold text-ink w-4 text-center select-none">
        {qty}
      </span>
      <button
        onClick={onInc}
        className="w-7 h-7 rounded-full bg-tomato text-white font-bold leading-none flex items-center justify-center hover:bg-tomato-dark transition-colors"
        aria-label={`Aggiungi ${label}`}
      >
        +
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CHIAVE DI RIGA DEL CARRELLO
// ---------------------------------------------------------------------------
// Una riga non è più identificata dal solo prodotto, ma dal prodotto PIÙ la
// personalizzazione scelta. Due personalizzazioni identiche devono cadere sulla
// stessa chiave e sommarsi; due diverse devono restare righe distinte.
//
// Perché la firma è ordinata: chi sceglie "olive poi bufala" e chi sceglie
// "bufala poi olive" ha ordinato la stessa cosa. Senza ordinamento nascerebbero
// due righe identiche a video.
//
// Perché la nota è normalizzata: "Ben cotta" e "ben cotta " sono la stessa
// richiesta. Nella voce resta però il testo originale, per la visualizzazione.
//
// La firma si calcola UNA SOLA VOLTA, alla conferma del modale. Se dipendesse
// da un input sempre montato, ogni battuta cambierebbe la chiave e React
// rimonterebbe la riga perdendo il focus.
const firmaPersonalizzazione = ({ supplementi = [], rimozioni = [], nota = '' }) => {
  const s = [...supplementi].sort().join(',')
  const r = [...rimozioni].sort().join(',')
  const n = nota.trim().replace(/\s+/g, ' ').toLowerCase()
  if (!s && !r && !n) return 'base'
  return `s=${s}|r=${r}|n=${n}`
}

const chiaveRiga = (catId, itemName, firma) => `${catId}::${itemName}::${firma}`

// Riepilogo leggibile della personalizzazione di una riga.
const descriviPersonalizzazione = (entry) => {
  const parti = []
  const agg = nomiSupplementi(entry.supplementi)
  const via = nomiRimozioni(entry.rimozioni)
  if (agg.length) parti.push(`con ${agg.join(', ')}`)
  if (via.length) parti.push(`senza ${via.join(', ')}`)
  return parti.join(' · ')
}

function RigaPersonalizzata({ chiave, entry, item, onUpdate }) {
  const suppNorm = totaleSupplementi(entry.supplementi, 'norm')
  const suppMaxi = totaleSupplementi(entry.supplementi, 'maxi')
  const hasMaxi = typeof item.maxi === 'number' && item.maxi !== null
  const descrizione = descriviPersonalizzazione(entry)

  const patch = (calcola) => onUpdate(chiave, calcola)

  return (
    <div className="mt-3 pl-3 border-l-2 border-tomato/40">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {descrizione && (
            <p className="font-body text-xs text-ink leading-snug">{descrizione}</p>
          )}
          {entry.nota && (
            <p className="font-body text-xs text-ink-faint leading-snug mt-0.5">
              Nota: {entry.nota}
            </p>
          )}
        </div>
        <button
          onClick={() => onUpdate(chiave, { qtyNorm: 0, qtyMaxi: 0 })}
          aria-label={`Rimuovi la personalizzazione di ${item.name}`}
          className="text-ink-faint hover:text-tomato transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-end gap-2 mt-2">
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-ink-muted whitespace-nowrap">
            Norm {fmtPrice((item.norm ?? 0) + suppNorm)}
          </span>
          <QtyControl
            qty={entry.qtyNorm}
            onInc={() => patch((e) => ({ qtyNorm: e.qtyNorm + 1 }))}
            onDec={() => patch((e) => ({ qtyNorm: Math.max(0, e.qtyNorm - 1) }))}
            label={`${item.name} normale personalizzata`}
          />
        </div>
        {hasMaxi && (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-ink-muted whitespace-nowrap">
              Maxi {fmtPrice(item.maxi + suppMaxi)}
            </span>
            <QtyControl
              qty={entry.qtyMaxi}
              onInc={() => patch((e) => ({ qtyMaxi: e.qtyMaxi + 1 }))}
              onDec={() => patch((e) => ({ qtyMaxi: Math.max(0, e.qtyMaxi - 1) }))}
              label={`${item.name} maxi personalizzata`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function MenuItem({ item, catId, cart, onUpdate, onPersonalizza }) {
  const isNote = item.note
  const hasNumericPrice = typeof item.norm === 'number'
  const hasMaxi = hasNumericPrice && typeof item.maxi === 'number' && item.maxi !== null
  const personalizzabile = hasNumericPrice && !isNote && item.allowCustomization !== false

  const chiaveBase = chiaveRiga(catId, item.name, 'base')
  const base = cart[chiaveBase]
  const qtyNorm = base?.qtyNorm ?? 0
  const qtyMaxi = base?.qtyMaxi ?? 0

  // Tutte le righe personalizzate di QUESTO prodotto, in aggiunta a quella base.
  const righePersonalizzate = Object.entries(cart).filter(
    ([chiave, e]) => e.catId === catId && e.itemName === item.name && chiave !== chiaveBase
  )

  const updateBase = (calcola) =>
    onUpdate(chiaveBase, (e) => ({
      catId,
      itemName: item.name,
      supplementi: [],
      rimozioni: [],
      nota: '',
      ...calcola(e),
    }))

  return (
    <div className={`py-4 border-b border-cream last:border-0 ${isNote ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-4">
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

        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          {!hasNumericPrice && (
            <PriceTag norm={item.norm} maxi={item.maxi} price={item.price} />
          )}

          {hasNumericPrice && !isNote && (
            <>
              {/* Riga Normale — invariata: è l'ordine del prodotto senza aggiunte */}
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-ink-muted text-right whitespace-nowrap">
                  Norm {fmtPrice(item.norm)}
                </span>
                <QtyControl
                  qty={qtyNorm}
                  onInc={() => updateBase((e) => ({ qtyNorm: e.qtyNorm + 1 }))}
                  onDec={() => updateBase((e) => ({ qtyNorm: Math.max(0, e.qtyNorm - 1) }))}
                  label={`${item.name} normale`}
                />
              </div>

              {/* Riga Maxi — solo se esiste */}
              {hasMaxi && (
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs text-ink-muted text-right whitespace-nowrap">
                    Maxi {fmtPrice(item.maxi)}
                  </span>
                  <QtyControl
                    qty={qtyMaxi}
                    onInc={() => updateBase((e) => ({ qtyMaxi: e.qtyMaxi + 1 }))}
                    onDec={() => updateBase((e) => ({ qtyMaxi: Math.max(0, e.qtyMaxi - 1) }))}
                    label={`${item.name} maxi`}
                  />
                </div>
              )}

              {personalizzabile && (
                <button
                  onClick={() => onPersonalizza({ item, catId })}
                  className="font-body text-xs font-semibold text-tomato hover:text-tomato-dark underline underline-offset-2 transition-colors"
                >
                  + Personalizza
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {righePersonalizzate.map(([chiave, entry]) => (
        <RigaPersonalizzata
          key={chiave}
          chiave={chiave}
          entry={entry}
          item={item}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

const inputCls = 'w-full font-body text-sm border border-cream rounded-lg p-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-tomato transition-colors'
const labelCls = 'block font-body text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1'

function ModalePersonalizza({ item, catId, onChiudi, onConferma }) {
  // Il pannello entra con una TRANSIZIONE su classe, non con una keyframe che
  // parte da fuori schermo: se l'animazione non parte (motore fermo, contesto
  // che non anima), la classe passa comunque a `translate-y-0` e il pannello
  // resta al suo posto. Con una keyframe, invece, resterebbe sotto il bordo
  // dello schermo e il carrello sembrerebbe rotto.
  const [entrato, setEntrato] = useState(false)
  useEffect(() => {
    setEntrato(true)
  }, [])

  const [supplementiScelti, setSupplementiScelti] = useState([])
  const [rimozioniScelte, setRimozioniScelte] = useState([])
  const [nota, setNota] = useState('')
  const [qtyNorm, setQtyNorm] = useState(1)
  const [qtyMaxi, setQtyMaxi] = useState(0)

  const hasMaxi = typeof item.maxi === 'number' && item.maxi !== null
  const prezzoNorm = (item.norm ?? 0) + totaleSupplementi(supplementiScelti, 'norm')
  const prezzoMaxi = hasMaxi ? item.maxi + totaleSupplementi(supplementiScelti, 'maxi') : 0
  const totale = prezzoNorm * qtyNorm + prezzoMaxi * qtyMaxi
  const valido = qtyNorm > 0 || qtyMaxi > 0

  const alterna = (elenco, setElenco, id) =>
    setElenco(elenco.includes(id) ? elenco.filter((x) => x !== id) : [...elenco, id])

  const conferma = () => {
    if (!valido) return
    onConferma({
      catId,
      item,
      supplementi: supplementiScelti,
      rimozioni: rimozioniScelte,
      nota,
      qtyNorm,
      qtyMaxi,
    })
  }

  const chipCls = (attivo) =>
    `px-3 py-1.5 rounded-full border-2 font-body text-xs font-semibold transition-colors ${
      attivo ? 'bg-tomato border-tomato text-white' : 'border-cream text-ink hover:border-tomato'
    }`

  return (
    // Su mobile il pannello sale dal basso (items-end + angoli arrotondati solo
    // in alto); da sm in su torna una finestra centrata.
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/60" onClick={onChiudi} />

      <div
        className={`relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[88vh] transform transition-transform duration-200 ease-out motion-reduce:transition-none sm:translate-y-0 ${
          entrato ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-cream flex-shrink-0">
          <div className="min-w-0">
            <h3 className="font-heading text-xl text-ink">Personalizza</h3>
            <p className="font-body text-sm text-ink-muted truncate">{item.name}</p>
          </div>
          <button
            onClick={onChiudi}
            aria-label="Chiudi"
            className="text-ink-faint hover:text-ink transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <p className={labelCls}>Aggiungi</p>
            <div className="flex flex-wrap gap-2">
              {tuttiSupplementi.map((sup) => (
                <button
                  key={sup.id}
                  onClick={() => alterna(supplementiScelti, setSupplementiScelti, sup.id)}
                  className={chipCls(supplementiScelti.includes(sup.id))}
                >
                  {sup.nome}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={labelCls}>Togli</p>
            <div className="flex flex-wrap gap-2">
              {tutteRimozioni.map((rim) => (
                <button
                  key={rim.id}
                  onClick={() => alterna(rimozioniScelte, setRimozioniScelte, rim.id)}
                  className={chipCls(rimozioniScelte.includes(rim.id))}
                >
                  {rim.nome}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="nota-personalizzazione" className={labelCls}>
              Nota
            </label>
            <input
              id="nota-personalizzazione"
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="es. ben cotta, poco sale"
              className={inputCls}
            />
          </div>

          <div className="border-t border-cream pt-4 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-body text-sm text-ink-muted">
                Normale {fmtPrice(prezzoNorm)}
              </span>
              <QtyControl
                qty={qtyNorm}
                onInc={() => setQtyNorm((q) => q + 1)}
                onDec={() => setQtyNorm((q) => Math.max(0, q - 1))}
                label={`${item.name} normale personalizzata`}
              />
            </div>
            {hasMaxi && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-sm text-ink-muted">
                  Maxi {fmtPrice(prezzoMaxi)}
                </span>
                <QtyControl
                  qty={qtyMaxi}
                  onInc={() => setQtyMaxi((q) => q + 1)}
                  onDec={() => setQtyMaxi((q) => Math.max(0, q - 1))}
                  label={`${item.name} maxi personalizzata`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-cream flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="font-body text-sm font-semibold text-ink">Totale</span>
            <span className="font-heading text-xl text-tomato">{fmtPrice(totale)}</span>
          </div>
          <button
            onClick={conferma}
            disabled={!valido}
            className={`w-full font-semibold py-3 rounded-full transition-colors ${
              valido
                ? 'bg-tomato hover:bg-tomato-dark text-white'
                : 'bg-tomato text-white opacity-50 cursor-not-allowed'
            }`}
          >
            Aggiungi all'ordine
          </button>
        </div>
      </div>
    </div>
  )
}

function CategorySection({ category, isActive, onClick, cart, onUpdate, onPersonalizza }) {
  const domId = `categoria-${category.label
    .toLowerCase()
    .replace(/['']/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

  const handleClick = () => {
    const opening = !isActive
    onClick()
    if (opening) {
      setTimeout(() => {
        const el = document.getElementById(domId)
        if (el) {
          const yOffset = -90
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 50)
    }
  }

  return (
    <div id={domId} className="scroll-mt-20">
      <button
        className="w-full text-left"
        onClick={handleClick}
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
              cart={cart}
              onUpdate={onUpdate}
              onPersonalizza={onPersonalizza}
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

  const buildMessage = (nomeSede) => {
    const righe = [`Ordine per Pizzeria Europa - ${nomeSede}`]
    righe.push('')
    righe.push(`Nome: ${nomeCliente}`)
    righe.push(`Telefono: ${telefono}`)
    righe.push(`Tipo: ${tipoOrdine === 'domicilio' ? 'Domicilio' : 'Asporto'}`)
    if (tipoOrdine === 'domicilio') righe.push(`Indirizzo: ${indirizzo}`)
    righe.push(`Orario: ${orario.trim() || 'Prima possibile'}`)
    righe.push(`Pagamento: ${pagamento === 'carta' ? 'Carta - il fattorino porterà il POS' : 'Contanti'}`)
    righe.push('')
    righe.push('Ordine:')
    cartItems.forEach(({ item, qty, formato, prezzo, supplementi, rimozioni, nota }) => {
      const hasMaxi = item.maxi !== null && item.maxi !== undefined
      let riga = `- ${qty}x ${item.name}`
      if (hasMaxi) riga += ` (${formato === 'maxi' ? 'Maxi' : 'Normale'})`
      if (prezzo > 0) riga += ` — ${fmtPrice(prezzo * qty)}`
      const agg = nomiSupplementi(supplementi)
      const via = nomiRimozioni(rimozioni)
      if (agg.length) riga += `\n  Aggiunte: ${agg.join(', ')}`
      if (via.length) riga += `\n  Senza: ${via.join(', ')}`
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
            {cartItems.map(({ id, item, qty, formato, prezzo, supplementi, rimozioni, nota }) => {
              const hasMaxi = item.maxi !== null && item.maxi !== undefined
              return (
                <div key={id} className="border-b border-cream pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-body font-semibold text-ink">
                        {qty}× {item.name}
                        {hasMaxi && (
                          <span className="font-normal text-ink-muted text-xs ml-1">
                            ({formato === 'maxi' ? 'Maxi' : 'Normale'})
                          </span>
                        )}
                      </p>
                      {nomiSupplementi(supplementi).length > 0 && (
                        <p className="font-body text-xs text-ink-faint mt-0.5">
                          Aggiunte: {nomiSupplementi(supplementi).join(', ')}
                        </p>
                      )}
                      {nomiRimozioni(rimozioni).length > 0 && (
                        <p className="font-body text-xs text-ink-faint mt-0.5">
                          Senza: {nomiRimozioni(rimozioni).join(', ')}
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
              )
            })}
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
              Ordina su WhatsApp →
            </button>
          </div>
        </div>
      </div>

      {sedeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setSedeModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-cream flex flex-col max-h-[90vh]">

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

            <div className="overflow-y-auto px-6 py-5 space-y-4">

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

              <div className="border-t border-cream pt-4">
                <p className="font-body text-sm font-semibold text-ink mb-3">
                  {sedeUnica ? 'Invia il tuo ordine' : 'Scegli la sede'}
                </p>
                {!formValid && (
                  <p className="font-body text-xs text-ink-faint mb-3">
                    Compila i campi obbligatori (*) per procedere.
                  </p>
                )}
                <div className="space-y-2">
                  {sedeUnica ? (
                    <a
                      href={formValid ? waHref(sedeUnica.whatsapp, buildMessage(sedeUnica.nome)) : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={formValid ? onClose : (e) => e.preventDefault()}
                      className={`flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl font-body font-semibold transition-colors ${
                        formValid
                          ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                          : 'bg-green-600 text-white opacity-50 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      <WaIcon />
                      Invia ordine su WhatsApp
                    </a>
                  ) : (
                    sediAttive.map((s) => (
                      <a
                        key={s.id}
                        href={formValid ? waHref(s.whatsapp, buildMessage(s.nome)) : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={formValid ? onClose : (e) => e.preventDefault()}
                        className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border-2 transition-colors ${
                          formValid
                            ? 'border-cream hover:border-green-400 hover:bg-green-50 cursor-pointer'
                            : 'border-cream opacity-50 cursor-not-allowed pointer-events-none'
                        }`}
                      >
                        <span className="font-body font-semibold text-ink">{s.nome}</span>
                        <span className="text-green-600">
                          <WaIcon />
                        </span>
                      </a>
                    ))
                  )}
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
  const [daPersonalizzare, setDaPersonalizzare] = useState(null)

  useEffect(() => {
    onCartOpenChange?.(showCart)
  }, [showCart])

  const toggle = (id) => setActiveId((prev) => (prev === id ? null : id))

  // `updates` può essere un oggetto oppure una funzione della voce corrente.
  // La forma funzionale serve ai contatori: due tap ravvicinati sul "+" cadono
  // nello stesso frame e, leggendo la quantità dalla closure di render,
  // vedrebbero entrambi il valore vecchio perdendo un incremento.
  const updateCart = (chiave, updates) => {
    setCart((prev) => {
      const entry = prev[chiave] ?? {
        qtyNorm: 0,
        qtyMaxi: 0,
        supplementi: [],
        rimozioni: [],
        nota: '',
      }
      const patch = typeof updates === 'function' ? updates(entry) : updates
      const next = { ...entry, ...patch }
      next.qtyNorm = Math.max(0, next.qtyNorm ?? 0)
      next.qtyMaxi = Math.max(0, next.qtyMaxi ?? 0)
      if (next.qtyNorm === 0 && next.qtyMaxi === 0) {
        const resto = { ...prev }
        delete resto[chiave]
        return resto
      }
      return { ...prev, [chiave]: next }
    })
  }

  // Conferma del modale: la firma decide se questa personalizzazione è nuova
  // (riga a sé) o identica a una già presente (quantità che si sommano).
  const aggiungiPersonalizzazione = ({ catId, item, supplementi, rimozioni, nota, qtyNorm, qtyMaxi }) => {
    const chiave = chiaveRiga(
      catId,
      item.name,
      firmaPersonalizzazione({ supplementi, rimozioni, nota })
    )
    setCart((prev) => {
      const esistente = prev[chiave]
      return {
        ...prev,
        [chiave]: {
          catId,
          itemName: item.name,
          supplementi,
          rimozioni,
          // Se la riga esiste già la nota è, per costruzione della firma, la
          // stessa a meno di spazi e maiuscole: si tiene quella già mostrata.
          nota: esistente?.nota ?? nota,
          qtyNorm: (esistente?.qtyNorm ?? 0) + qtyNorm,
          qtyMaxi: (esistente?.qtyMaxi ?? 0) + qtyMaxi,
        },
      }
    })
    setDaPersonalizzare(null)
  }

  // catId e itemName vengono dalla voce, non dal parsing della chiave: un nome
  // prodotto o una nota che contenga '::' non rompono più niente.
  const cartItems = Object.entries(cart).flatMap(([chiave, entry]) => {
    const cat = menuCategories.find((c) => c.id === entry.catId)
    const item = cat?.items.find((i) => i.name === entry.itemName)
    if (!item) return []
    const comuni = {
      item,
      supplementi: entry.supplementi ?? [],
      rimozioni: entry.rimozioni ?? [],
      nota: entry.nota ?? '',
    }
    const righe = []
    if (entry.qtyNorm > 0) {
      righe.push({
        ...comuni,
        id: `${chiave}::norm`,
        qty: entry.qtyNorm,
        formato: 'norm',
        prezzo: (item.norm ?? 0) + totaleSupplementi(entry.supplementi, 'norm'),
      })
    }
    if (entry.qtyMaxi > 0 && item.maxi) {
      righe.push({
        ...comuni,
        id: `${chiave}::maxi`,
        qty: entry.qtyMaxi,
        formato: 'maxi',
        prezzo: item.maxi + totaleSupplementi(entry.supplementi, 'maxi'),
      })
    }
    return righe
  })

  const totalQty = cartItems.reduce((sum, e) => sum + e.qty, 0)
  const totalPrice = cartItems.reduce((sum, e) => sum + e.prezzo * e.qty, 0)

  return (
    <>
      <Helmet>
        <title>Menù – Pizzeria Europa | Pizze, Fritture e Bevande</title>
        <meta name="description" content="Scopri il menù completo di Pizzeria Europa: pizze d'autore, pizze storiche, fritture, bevande. Impasto senza glutine disponibile." />
        <meta property="og:title" content="Menù – Pizzeria Europa" />
        <meta property="og:description" content="Pizze d'autore, storiche e classiche. Ordina direttamente via WhatsApp." />
        <meta property="og:url" content="https://pizzeria-europa-site.vercel.app/menu" />
      </Helmet>

      {/* Header */}
      <section className="relative pt-32 pb-16 text-center overflow-hidden">
        <img
          src={pizze}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
          loading="eager"
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
              onPersonalizza={setDaPersonalizzare}
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
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-xl mx-auto px-6">
          <h2 className="font-heading text-3xl text-white mb-3">
            Pronto a ordinare?
          </h2>
          <p className="font-body text-white/80 mb-8">
            Chiamaci o scrivici su WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={telHref(sediAttive[0].telefono)}
              className="bg-white text-tomato font-semibold px-8 py-3.5 rounded-full hover:bg-cream transition-colors"
            >
              Chiama ora
            </a>
            <a
              href={waHref(sediAttive[0].whatsapp)}
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

      {/* Modale personalizzazione */}
      {daPersonalizzare && (
        <ModalePersonalizza
          item={daPersonalizzare.item}
          catId={daPersonalizzare.catId}
          onChiudi={() => setDaPersonalizzare(null)}
          onConferma={aggiungiPersonalizzazione}
        />
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
