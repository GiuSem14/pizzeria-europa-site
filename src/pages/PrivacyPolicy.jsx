import { Helmet } from 'react-helmet-async'

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading text-2xl text-ink font-semibold mb-4">{title}</h2>
      <div className="font-body text-sm text-ink-muted leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Pizzeria Europa</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Header */}
      <section className="bg-ink pt-32 pb-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Informativa
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">Privacy Policy</h1>
          <p className="font-body text-cream/60 text-sm">
            Ai sensi del Regolamento UE 2016/679 (GDPR) — Aggiornata al {new Date().getFullYear()}
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="bg-cream-light py-16">
        <div className="max-w-3xl mx-auto px-6">

          <Section title="1. Titolare del trattamento">
            <p>
              Il Titolare del trattamento dei dati personali è:
            </p>
            <p className="bg-cream rounded-xl p-4 text-ink">
              <strong>Pizzeria Europa</strong><br />
              Piazza Giorgio Boris Giuliano 33<br />
              94015 Piazza Armerina (EN) — Italia<br />
              Email: <a href="mailto:flaviomira88@gmail.com" className="text-tomato hover:text-tomato-dark transition-colors">flaviomira88@gmail.com</a>
            </p>
          </Section>

          <Section title="2. Dati raccolti e finalità">
            <p>
              Il sito raccoglie dati personali <strong>esclusivamente</strong> quando l'utente li
              fornisce volontariamente compilando il modulo di contatto presente nella pagina
              Contatti. I dati raccolti sono:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono (facoltativo)</li>
              <li>Testo del messaggio</li>
            </ul>
            <p>
              Questi dati vengono utilizzati esclusivamente per rispondere alla richiesta
              dell'utente (prenotazione, informazioni, richiesta catering) e non vengono
              impiegati per finalità di marketing o profilazione.
            </p>
          </Section>

          <Section title="3. Base giuridica del trattamento">
            <p>
              Il trattamento è basato sul consenso dell'utente (art. 6, par. 1, lett. a GDPR),
              espresso con l'invio volontario del modulo di contatto.
            </p>
          </Section>

          <Section title="4. Modalità di trattamento e conservazione">
            <p>
              I dati inviati tramite il modulo di contatto vengono trasmessi e archiviati
              attraverso il servizio <strong>Formspree</strong> (Formspree Inc.), che funge da
              responsabile esterno del trattamento. I dati sono conservati per il tempo strettamente
              necessario a evadere la richiesta, e comunque non oltre 12 mesi.
            </p>
            <p>
              Per l'informativa sulla privacy di Formspree consulta:{' '}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tomato hover:text-tomato-dark transition-colors"
              >
                formspree.io/legal/privacy-policy
              </a>
            </p>
          </Section>

          <Section title="5. Cookie">
            <p>
              Il sito utilizza esclusivamente <strong>cookie tecnici</strong> necessari al
              funzionamento delle pagine (es. gestione della sessione). Non vengono utilizzati
              cookie di profilazione, cookie di tracciamento o cookie analitici di terze parti.
            </p>
            <p>
              La pagina Contatti incorpora mappe di Google Maps tramite iframe: Google potrebbe
              impostare cookie tecnici propri. Per maggiori informazioni consulta la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tomato hover:text-tomato-dark transition-colors"
              >
                Privacy Policy di Google
              </a>
              .
            </p>
            <p>
              Per informazioni dettagliate sui cookie consulta la nostra{' '}
              <a href="/cookie-policy" className="text-tomato hover:text-tomato-dark transition-colors">
                Cookie Policy
              </a>
              .
            </p>
          </Section>

          <Section title="6. Trasferimento dei dati a terzi">
            <p>
              I dati personali non vengono venduti, ceduti o comunicati a terzi, salvo quanto
              strettamente necessario per l'erogazione del servizio richiesto. L'unico soggetto
              terzo coinvolto è Formspree Inc. per la gestione del modulo di contatto, come
              indicato al punto 4.
            </p>
          </Section>

          <Section title="7. Diritti dell'utente (artt. 15–22 GDPR)">
            <p>L'utente ha il diritto di:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong>Accesso</strong>: ottenere conferma che sia in corso un trattamento di dati che lo riguardano e richiederne copia</li>
              <li><strong>Rettifica</strong>: richiedere la correzione di dati inesatti o incompleti</li>
              <li><strong>Cancellazione</strong> ("diritto all'oblio"): richiedere la cancellazione dei propri dati</li>
              <li><strong>Limitazione</strong>: richiedere la limitazione del trattamento</li>
              <li><strong>Portabilità</strong>: ricevere i dati in formato strutturato e leggibile da dispositivo automatico</li>
              <li><strong>Opposizione</strong>: opporsi al trattamento in qualsiasi momento</li>
              <li><strong>Revoca del consenso</strong>: revocare il consenso prestato senza pregiudicare la liceità del trattamento precedente</li>
            </ul>
            <p>
              Per esercitare questi diritti è sufficiente scrivere a{' '}
              <a href="mailto:flaviomira88@gmail.com" className="text-tomato hover:text-tomato-dark transition-colors">
                flaviomira88@gmail.com
              </a>
              . Il Titolare risponderà entro 30 giorni dalla ricezione della richiesta.
            </p>
            <p>
              L'utente ha inoltre il diritto di proporre reclamo all'autorità di controllo
              competente (in Italia: il Garante per la Protezione dei Dati Personali —{' '}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tomato hover:text-tomato-dark transition-colors"
              >
                www.garanteprivacy.it
              </a>
              ).
            </p>
          </Section>

          <Section title="8. Modifiche alla presente informativa">
            <p>
              Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi
              momento. Le modifiche saranno pubblicate su questa pagina con data di aggiornamento.
              Si consiglia di consultare periodicamente questa pagina.
            </p>
          </Section>

        </div>
      </section>
    </>
  )
}
