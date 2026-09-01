// ============================================================================
// SUPPLEMENTI E RIMOZIONI
// ----------------------------------------------------------------------------
// ATTENZIONE: l'INTERO contenuto di questo file è provvisorio.
// Voci e prezzi NON provengono dal listino del cliente: sono ipotesi di lavoro
// messe qui per far funzionare l'interfaccia. Vanno confermate una per una
// prima del lancio, insieme all'elenco completo (qui ce n'è solo un campione).
// ============================================================================

// Prezzo applicato a un supplemento che non ne dichiara uno proprio.
// DA VERIFICARE con il cliente: sulla maxi il supplemento costa come sulla
// normale, o di più? Per ora i due valori sono uguali.
export const prezzoSupplementoDefault = { norm: 0.5, maxi: 0.5 }

// Ogni voce può sovrascrivere il prezzo di default aggiungendo i campi
// `norm` e `maxi`:   { id: 'esempio', nome: 'Esempio', norm: <prezzo>, maxi: <prezzo> }
export const supplementi = [
  { id: 'bufala', nome: 'Bufala' }, // DA VERIFICARE con il cliente
  { id: 'salsiccia', nome: 'Salsiccia locale' }, // DA VERIFICARE con il cliente
  { id: 'funghi', nome: 'Funghi' }, // DA VERIFICARE con il cliente
  { id: 'olive', nome: 'Olive' }, // DA VERIFICARE con il cliente
  { id: 'grana', nome: 'Grana Padano' }, // DA VERIFICARE con il cliente
]

// Le rimozioni non hanno prezzo: togliere un ingrediente non costa e non
// sconta. Non aggiungere campi di prezzo qui.
export const rimozioni = [
  { id: 'cipolla', nome: 'Cipolla' }, // DA VERIFICARE con il cliente
  { id: 'aglio', nome: 'Aglio' }, // DA VERIFICARE con il cliente
  { id: 'basilico', nome: 'Basilico' }, // DA VERIFICARE con il cliente
  { id: 'piccante', nome: 'Piccante' }, // DA VERIFICARE con il cliente
]

const mappaSupplementi = Object.fromEntries(supplementi.map((v) => [v.id, v]))

// Prezzo di un singolo supplemento nel formato richiesto ('norm' | 'maxi').
export const prezzoSupplemento = (id, formato) => {
  const s = mappaSupplementi[id]
  if (!s) return 0
  return s[formato] ?? prezzoSupplementoDefault[formato] ?? 0
}

// Somma dei supplementi scelti per un formato.
export const totaleSupplementi = (ids, formato) =>
  (ids ?? []).reduce((tot, id) => tot + prezzoSupplemento(id, formato), 0)

// Nomi leggibili, nell'ordine in cui sono definiti nel file (non nell'ordine
// in cui l'utente li ha selezionati): due ordini identici si leggono uguali.
export const nomiSupplementi = (ids) =>
  supplementi.filter((s) => (ids ?? []).includes(s.id)).map((s) => s.nome)

export const nomiRimozioni = (ids) =>
  rimozioni.filter((r) => (ids ?? []).includes(r.id)).map((r) => r.nome)
