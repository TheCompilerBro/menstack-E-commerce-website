# Changelog

## Latest Update

### What was changed

- Added backend + frontend full MERN scaffold for e-commerce.
- Implemented authentication (register/login/profile) with JWT.
- Implemented product listing APIs and order creation/history APIs.
- Added React pages for home/shop, cart, login, register, and orders.
- Added minimalist UI styling with skeleton shimmer loading on product cards.
- Added seed script and demo account (`demo@store.com` / `password123`).
- Added Docker Compose for MongoDB and setup docs for local development.

### Why this was changed

To provide a complete starting point that runs quickly for local development and can be iterated into a production-ready e-commerce app.

## Follow-up Fix

- Replaced external product image URLs with stable placeholder URLs to avoid `403 Forbidden` image failures in browser consoles.
- Added client-side image `onError` fallback in product and cart UI components.
- Added README troubleshooting note with re-seed command to refresh older DB records.

## Admin Panel Update

- Added admin-only UI page to add/delete products, manage users, and view all orders.
- Added protected admin backend APIs for products, users, and orders management.
- Added seeded admin user (`admin@store.com` / `admin123`).

## GitHub Update Note

- Added README section documenting exact commands to publish local changes to GitHub and update PRs.

## GitHub CI Update

- Added `.github/workflows/ci.yml` to run install/build/syntax checks on GitHub push and pull_request events.

## Admin Access UX Fix

- Improved `/admin` behavior: non-admin users now see clear access guidance instead of being silently redirected home.
- Added profile-role sync on app load for older sessions missing `isAdmin` in local storage.

## Admin Dashboard URL + Order Items

- Added alternate admin URL: `/admin-dashboard` (same protected admin page).
- Admin orders section now shows each order's line items (`name x qty`).

## Admin Dashboard Routing Fix

- `/admin-dashboard` now shows explicit login/access-required states instead of redirecting users away.
- Admin login links now preserve redirect target as `/admin-dashboard`.
