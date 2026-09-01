# Pizzeria Europa

Website for a multi-location pizzeria in Sicily, Italy, currently running the Piazza Armerina location.

## Stack

React · Vite · Tailwind CSS · React Router · react-helmet-async · deployed on Vercel

## What it does

- **Menu as data** — the whole menu lives in `src/data/menu.js` and the locations in `src/data/sedi.js`. The owner sends changes, the data file is edited, nothing else moves. For a menu that changes seasonally this matters more than any UI feature.
- **One location, multi-location by design** — the site currently runs a single location, Piazza Armerina. Barrafranca and Aidone are still in `src/data/sedi.js` with `attiva: false`: their data was never deleted. Setting the flag back to `true` restores the location pickers, the per-location grids and the form validation, with no other code change. Opening hours and contact details are rendered per active location from the same structure.
- **Contact where the customers are** — a click-to-call button and a WhatsApp button, both fixed and reachable from any page, because most visits come from a phone with the intent to order.
- Cookie banner and the required policy pages.
- Per-page metadata through react-helmet-async.

## Structure

```
src/pages/        Home, Menu, ChiSiamo, Contatti, policies, NotFound
src/components/   Navbar, Footer, OrariCard, CallButton, WhatsAppButton, CookieBanner, ScrollToTop
src/data/         menu.js, sedi.js
```

## Running locally

```bash
npm install
npm run dev
```
