# Vow & Ever

An elegant wedding e-commerce storefront, built in JavaScript with React and Vite. This repository currently contains **Stage 1**: a responsive customer-facing frontend using sample product data and browser-local cart and wishlist state.

## Stage 1 page and component structure

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Editorial hero, category browsing, favourites, brand story and newsletter demo |
| Shop | `/shop` | Searchable catalogue with category, availability and sort filters |
| Product details | `/products/:id` | Product information, quantity selector, stock-aware add-to-bag and related pieces |
| Wishlist | `/wishlist` | Saved products, persisted in this browser |
| Shopping bag | `/cart` | Item quantities, removal, subtotals and checkout entry |
| Checkout | `/checkout` | Delivery form and clearly labelled simulated order placement |
| Order confirmation | `/order-confirmation` | Confirmation for the last locally simulated order |
| Account | `/account` | Stage 4 sign-in/profile feature preview |

Reusable UI lives in `src/components/`; sample catalogue data and currency/image helpers are in `src/data/`; shared cart/wishlist state is in `src/context/`; route-level views are in `src/pages/`.

## Run locally

Requirements: Node.js 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production bundle or check the code style:

```bash
npm run build
npm run lint
```

## Stage 1 demo notes

- Products currently come from `src/data/products.js`; the API/database integration is planned for Stage 2 and Stage 3.
- Cart and wishlist are saved in `localStorage` on this device and browser only. They are not associated with an account.
- Checkout validates the browser form and creates a local demonstration reference. It does not call a server, reserve stock, or collect/process payment information.
- Product photographs are loaded from Unsplash at runtime, and the page fonts are loaded from Google Fonts. An internet connection is needed for those remote assets.
- Account authentication, profile, and order history are not implemented yet.

## Planned stages

1. Responsive storefront and sample data (current)
2. Express API, MongoDB models, product endpoints and sample seeding
3. Connect the frontend to the API
4. Authentication, authorization and accounts
5. Server-validated cart, checkout and order history
6. Admin product and order management
7. Persistent account wishlist and optional budget tracker
8. End-to-end tests, documentation and deployment preparation
