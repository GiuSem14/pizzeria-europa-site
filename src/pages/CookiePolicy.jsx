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

const browsers = [
  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/it/kb/Gestione dei cookie' },
  { name: 'Safari (macOS/iOS)', url: 'https://support.apple.com/it-it/guide/safari/sfri11471/mac' },
  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
]

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — Pizzeria Europa</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Header */}
      <section className="bg-ink pt-32 pb-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-body text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Informativa
          </p>
          <h1 className="font-heading text-5xl text-cream-light mb-4">Cookie Policy</h1>
          <p className="font-body text-cream/60 text-sm">
            Ai sensi del D.Lgs. 196/2003 e del Regolamento UE 2016/679 (GDPR) — Aggiornata al {new Date().getFullYear()}
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="bg-cream-light py-16">
        <div className="max-w-3xl mx-auto px-6">

          <Section title="1. Cosa sono i cookie">
            <p>
              I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano
              al suo dispositivo (computer, tablet, smartphone), dove vengono memorizzati e
              poi ritrasmessi al sito ad ogni visita successiva.
            </p>
            <p>
              I cookie permettono al sito di funzionare correttamente, di ricordare le
              preferenze dell'utente e di raccogliere informazioni sull'utilizzo del sito.
            </p>
          </Section>

          <Section title="2. Cookie utilizzati da questo sito">
            <p>
              Il sito di Pizzeria Europa utilizza <strong>esclusivamente cookie tecnici</strong>,
              necessari al funzionamento delle pagine. Non vengono utilizzati:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Cookie di profilazione</li>
              <li>Cookie analitici (es. Google Analytics)</li>
              <li>Pixel di tracciamento (es. Meta Pixel, Google Tag Manager)</li>
              <li>Cookie pubblicitari</li>
            </ul>

            <div className="bg-cream rounded-xl overflow-hidden mt-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-cream border-b border-cream-light">
                    <th className="text-left px-4 py-3 text-ink font-semibold">Nome</th>
                    <th className="text-left px-4 py-3 text-ink font-semibold">Tipo</th>
                    <th className="text-left px-4 py-3 text-ink font-semibold">Durata</th>
                    <th className="text-left px-4 py-3 text-ink font-semibold">Finalità</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-cream-light">
                    <td className="px-4 py-3 font-mono text-ink">cookieConsent</td>
                    <td className="px-4 py-3">Tecnico (localStorage)</td>
                    <td className="px-4 py-3">Persistente</td>
                    <td className="px-4 py-3">Memorizza il consenso al banner cookie</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-faint mt-2">
              Il valore <code className="bg-cream px-1 py-0.5 rounded text-ink">cookieConsent</code> è
              salvato nel <em>localStorage</em> del browser (non è tecnicamente un cookie, ma ha
              funzione analoga di memorizzare una preferenza).
            </p>
          </Section>

          <Section title="3. Cookie di terze parti — Google Maps">
            <p>
              La pagina Contatti incorpora mappe tramite iframe di Google Maps. Google potrebbe
              impostare cookie tecnici propri per il funzionamento del servizio cartografico.
              Questi cookie sono gestiti da Google LLC e soggetti alla propria informativa:
            </p>
            <p>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tomato hover:text-tomato-dark transition-colors"
              >
                policies.google.com/privacy
              </a>
            </p>
            <p>
              Pizzeria Europa non ha accesso né controllo sui cookie impostati da Google.
            </p>
          </Section>

          <Section title="4. Come gestire o disabilitare i cookie">
            <p>
              L'utente può gestire, bloccare o eliminare i cookie direttamente dalle impostazioni
              del proprio browser. Di seguito i collegamenti alle guide ufficiali dei principali browser:
            </p>
            <ul className="space-y-2">
              {browsers.map(({ name, url }) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="text-tomato">→</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tomato hover:text-tomato-dark transition-colors"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2">
              Si noti che disabilitare i cookie tecnici potrebbe compromettere il corretto
              funzionamento di alcune funzionalità del sito.
            </p>
          </Section>

          <Section title="5. Modifiche alla Cookie Policy">
            <p>
              Il Titolare si riserva il diritto di aggiornare questa Cookie Policy in qualsiasi
              momento. Le modifiche saranno pubblicate su questa pagina. Per la gestione dei dati
              personali consulta la{' '}
              <a href="/privacy" className="text-tomato hover:text-tomato-dark transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          <div className="mt-10 pt-6 border-t border-cream text-xs font-body text-ink-faint">
            Titolare del trattamento: Pizzeria Europa — Piazza Giorgio Boris Giuliano 33, 94015
            Piazza Armerina (EN) — Email:{' '}
            <a href="mailto:flaviomira88@gmail.com" className="text-tomato hover:text-tomato-dark transition-colors">
              flaviomira88@gmail.com
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
