import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// Font self-hosted (Fontsource): nessuna richiesta a fonts.googleapis.com /
// fonts.gstatic.com. Sono importati SOLO i pesi realmente usati nel sito:
//   Playfair Display (font-heading) 400, 600
//   Inter            (font-body)    400, 500, 600, 700
// Il corsivo non è importato per nessuna delle due famiglie: non è usato.
// Si importa il solo sottoinsieme `latin`: copre tutto l'italiano, accentate e
// apostrofo inclusi. Gli altri sottoinsiemi (latin-ext, cirillico, greco,
// vietnamita) finivano nella dist senza che nessun browser li richiedesse.
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
