const giorniSettimana = [
  { giorno: "Lunedì",    pranzo: null,          cena: "19:00–23:00" },
  { giorno: "Martedì",   pranzo: null,          cena: null },
  { giorno: "Mercoledì", pranzo: "12:00–14:30", cena: "19:00–23:00" },
  { giorno: "Giovedì",   pranzo: "12:00–14:30", cena: "19:00–23:00" },
  { giorno: "Venerdì",   pranzo: "12:00–14:30", cena: "19:00–23:30" },
  { giorno: "Sabato",    pranzo: "12:00–14:30", cena: "19:00–23:30" },
  { giorno: "Domenica",  pranzo: "12:00–14:30", cena: "19:00–23:00" },
];

export const orariSedi = [
  {
    sede: "Piazza Armerina",
    giorni: giorniSettimana,
  },
  {
    sede: "Barrafranca",
    giorni: giorniSettimana,
  },
  {
    sede: "Aidone",
    giorni: giorniSettimana,
  },
];
