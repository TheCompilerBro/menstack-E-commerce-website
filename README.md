# MERN Minimal E-commerce Website

A full-stack MERN e-commerce project using **MongoDB, Express, React, and Node.js** with a **minimalist UI** and **skeleton shimmer loading**.

## What is implemented

- **Auth**: register, login, profile (JWT)
- **Catalog**: product list + product detail API
- **Cart**: add/remove/update quantity, local persistence
- **Orders**: place order + view my orders
- **Admin**: add/delete products, manage users, view all orders
- **Loading UX**: skeleton shimmer cards while fetching products
- **Seed data**: sample products + demo user
- **Resilience**: product API falls back to bundled sample catalog if DB product query fails

## Project Structure

- `server/` → Express API + MongoDB models
- `client/` → React + Vite web app

## Quick start

1. Install dependencies

   ```bash
   npm run install:all
   ```

2. Start MongoDB (choose one)

   - Local MongoDB service, or
   - Docker:

   ```bash
   docker compose up -d
   ```

3. Configure server env

   ```bash
   cp server/.env.example server/.env
   ```

   Default local value:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/mern_store
   ```

4. Seed demo data

   ```bash
   npm run seed --prefix server
   ```

5. Run backend + frontend (in separate terminals)

   ```bash
   npm run dev:server
   npm run dev:client
   ```

6. Open:
   - Frontend: `http://localhost:5173`
   - API health: `http://localhost:5001/` (or your configured API port)

## GitHub update summary

A concise list of the latest repository changes is tracked in [`CHANGELOG.md`](./CHANGELOG.md).

## Demo account

- Email: `demo@store.com`
- Password: `password123`

- Admin: `admin@store.com` / `admin123`

## Troubleshooting

- **Products not loading / 403-style errors on frontend**: this usually means the UI is pointing to the wrong backend origin.
  - Default Vite proxy target is `http://localhost:5001`.
  - Set `client/.env` to match your backend:

  ```env
  VITE_PROXY_TARGET=http://localhost:5001
  # or use direct API base if not proxying
  # VITE_API_URL=http://localhost:5001/api
  ```

  Then restart frontend dev server and verify endpoint: `http://localhost:5001/api/products`.

- **Files not showing on GitHub**: confirm you pushed the correct branch and that GitHub is viewing the latest commit.

- **`/admin` opens but returns you away from panel**: make sure you are logged in as admin (`admin@store.com` / `admin123`). If you logged in before admin roles were added, log out and log in again so the profile role refreshes.

- **Console shows `403 (Forbidden)` for image resources**: this project now uses placeholder image URLs and UI image fallbacks, but if seeded DB still has old external image URLs, re-run seed to refresh:

  ```bash
  npm run seed --prefix server
  ```



## Update to GitHub

After making local changes, publish updates with:

```bash
git add .
git commit -m "your message"
git push origin <your-branch>
```

Then open/update your Pull Request on GitHub to reflect the latest changes.


## GitHub CI

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml` that installs dependencies, builds the client, and runs backend syntax checks on pushes and pull requests.
