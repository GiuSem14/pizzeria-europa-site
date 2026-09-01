// ============================================================================
// FONTE UNICA DEI DATI DELLE SEDI
// ----------------------------------------------------------------------------
// Tutti i dati di contatto qui sotto sono i valori attualmente presenti nel
// codice e NON sono stati modificati. Sono ancora provvisori/da verificare:
// ogni campo marcato `// TODO CLIENTE` va confermato con il cliente prima del
// lancio (numeri, indirizzi, email, coordinate, orari).
//
// Convenzioni:
// - I numeri di telefono sono memorizzati in formato "nazionale" leggibile
//   (senza prefisso internazionale). Gli helper `telHref` / `waHref`
//   aggiungono il prefisso +39 / 39 quando costruiscono i link.
// - `whatsapp` è il numero di DESTINAZIONE dei messaggi/ordini: resta lo
//   stesso per tutte le sedi (scelta di prodotto, non un errore).
// - `attiva` controlla se la sede viene mostrata nel sito (selettore sede,
//   pagina contatti, footer, mappe). Impostare a `false` per nasconderla
//   ovunque senza rimuovere i dati.
// ============================================================================

export const sedi = [
  {
    id: 'piazza-armerina',
    nome: 'Piazza Armerina',
    // DA VERIFICARE con il cliente: civico 18 o 33? Il vecchio JSON-LD della
    // home diceva 33. Se cambia, aggiornare anche `urlMappa` qui sotto.
    indirizzo: 'Piazza Giorgio Boris Giuliano 18', // TODO CLIENTE
    cap: '94015', // TODO CLIENTE
    citta: 'Piazza Armerina (EN)', // TODO CLIENTE
    // DA VERIFICARE con il cliente: 6 o 7 cifre dopo lo 0935?
    telefono: '0935 182 2485', // fisso (display) // TODO CLIENTE
    cellulare: '380 2644694', // cellulare mostrato sulle schede // TODO CLIENTE
    whatsapp: '380 2644694', // destinazione ordini/messaggi (uguale per tutte) // TODO CLIENTE
    email: 'flaviomira88@gmail.com', // TODO CLIENTE
    coordinate: { lat: 37.3833, lng: 14.3667 }, // TODO CLIENTE
    urlMappa:
      'https://maps.google.com/maps?q=Piazza+Giorgio+Boris+Giuliano+18,+94015+Piazza+Armerina,+EN,+Italy&output=embed&hl=it', // TODO CLIENTE
    // DA VERIFICARE con il cliente: il vecchio JSON-LD della home dichiarava
    // orari diversi (Lun 19:00-23:00, Mer-Dom 12:00-23:30, Mar assente).
    orari: [
      // TODO CLIENTE
      { giorno: 'Lunedì', orario: '17:00–23:30' },
      { giorno: 'Martedì', orario: '17:00–23:30' },
      { giorno: 'Mercoledì', orario: '17:00–23:30' },
      { giorno: 'Giovedì', orario: '17:30–23:30' },
      { giorno: 'Venerdì', orario: '17:00–23:30' },
      { giorno: 'Sabato', orario: '17:00–23:30' },
      { giorno: 'Domenica', orario: '17:00–23:30' },
    ],
    attiva: true,
  },
  {
    id: 'barrafranca',
    nome: 'Barrafranca',
    indirizzo: 'Corso Garibaldi 350', // TODO CLIENTE
    cap: '94012', // TODO CLIENTE
    citta: 'Barrafranca (EN)', // TODO CLIENTE
    telefono: '0934 976507', // fisso (display) // TODO CLIENTE
    cellulare: '366 3674311', // cellulare mostrato sulle schede // TODO CLIENTE
    whatsapp: '380 2644694', // destinazione ordini/messaggi (uguale per tutte) // TODO CLIENTE
    email: 'flaviomira88@gmail.com', // TODO CLIENTE
    coordinate: null, // TODO CLIENTE
    urlMappa:
      'https://maps.google.com/maps?q=Corso+Garibaldi+350,+94012+Barrafranca,+EN,+Italy&output=embed&hl=it', // TODO CLIENTE
    orari: [
      // TODO CLIENTE
      { giorno: 'Lunedì', orario: '17:00–23:00' },
      { giorno: 'Martedì', orario: '17:00–23:00' },
      { giorno: 'Mercoledì', orario: null },
      { giorno: 'Giovedì', orario: '17:00–23:00' },
      { giorno: 'Venerdì', orario: '17:00–23:00' },
      { giorno: 'Sabato', orario: '17:00–23:00' },
      { giorno: 'Domenica', orario: '17:00–23:00' },
    ],
    attiva: false,
  },
  {
    id: 'aidone',
    nome: 'Aidone',
    indirizzo: 'Viale Martiri della Libertà 15', // TODO CLIENTE
    cap: '94010', // TODO CLIENTE
    citta: 'Aidone (EN)', // TODO CLIENTE
    telefono: '0935 545864', // fisso (display) // TODO CLIENTE
    cellulare: '380 2644694', // cellulare mostrato sulle schede // TODO CLIENTE
    whatsapp: '380 2644694', // destinazione ordini/messaggi (uguale per tutte) // TODO CLIENTE
    email: 'flaviomira88@gmail.com', // TODO CLIENTE
    coordinate: null, // TODO CLIENTE
    urlMappa:
      'https://maps.google.com/maps?q=Viale+Martiri+della+Libert%C3%A0+15,+94010+Aidone,+EN,+Italy&output=embed&hl=it', // TODO CLIENTE
    orari: [
      // TODO CLIENTE
      { giorno: 'Lunedì', orario: '17:00–23:00' },
      { giorno: 'Martedì', orario: '17:00–23:00' },
      { giorno: 'Mercoledì', orario: null },
      { giorno: 'Giovedì', orario: '17:00–23:00' },
      { giorno: 'Venerdì', orario: '17:00–23:00' },
      { giorno: 'Sabato', orario: '17:00–23:30' },
      { giorno: 'Domenica', orario: '17:00–23:00' },
    ],
    attiva: false,
  },
]

// Solo le sedi attualmente attive (usare questa in tutta la UI).
export const sediAttive = sedi.filter((s) => s.attiva)

// Valorizzata SOLO quando esiste esattamente una sede attiva: in quel caso la UI
// salta ogni selettore di sede e usa direttamente questo oggetto. Quando le sedi
// attive tornano a essere due o più vale `null` e la UI riprende il
// comportamento multi-sede senza altre modifiche al codice.
export const sedeUnica = sediAttive.length === 1 ? sediAttive[0] : null

// Numero in formato E.164 da un numero nazionale (es. "0935 182 2485" -> "+3909351822485").
export const telE164 = (numero) => `+39${String(numero).replace(/\D/g, '')}`

// Costruisce un link `tel:` pulito da un numero nazionale (es. "0935 182 2485").
export const telHref = (numero) => `tel:${telE164(numero)}`

// Cifre pronte per wa.me da un numero nazionale (es. "380 2644694" -> "393802644694").
export const waNumero = (numero) => `39${String(numero).replace(/\D/g, '')}`

// Link completo a WhatsApp, con testo già codificato opzionale.
export const waHref = (numero, testoCodificato) =>
  `https://wa.me/${waNumero(numero)}${testoCodificato ? `?text=${testoCodificato}` : ''}`
