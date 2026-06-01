import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 – Pagina non trovata | Pizzeria Europa</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <p
          className="font-heading leading-none mb-6 select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--color-tomato, #e63946)' }}
        >
          404
        </p>
        <h1 className="font-heading text-3xl text-ink mb-4">
          Pagina non trovata
        </h1>
        <p className="font-body text-ink-muted mb-10 max-w-sm leading-relaxed">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <Link
          to="/"
          className="bg-tomato text-white font-semibold px-8 py-4 rounded-full hover:bg-tomato-dark transition-colors"
        >
          Torna alla Home
        </Link>
      </section>
    </>
  )
}
