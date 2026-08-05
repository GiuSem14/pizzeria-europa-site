Pizzeria Europa

Website for a pizzeria with more than one location, in Sicily, Italy.

Stack

React · Vite · Tailwind CSS · React Router · react-helmet-async · deployed on Vercel

What it does
Menu as data — the whole menu lives in src/data/menu.js and the locations in src/data/sedi.js. The owner sends changes, the data file is edited, nothing else moves. For a menu that changes seasonally this matters more than any UI feature.
Multiple locations — opening hours and contact details are rendered per location from the same structure.
Contact where the customers are — a click-to-call button and a WhatsApp button, both fixed and reachable from any page, because most visits come from a phone with the intent to order.
Cookie banner and the required policy pages.
Per-page metadata through react-helmet-async.
Structure
src/pages/        Home, Menu, ChiSiamo, Contatti, policies, NotFound
src/components/   Navbar, Footer, OrariCard, CallButton, WhatsAppButton, CookieBanner, ScrollToTop
src/data/         menu.js, sedi.js
Running locally
bash
npm install
npm run dev
