# MERN Minimal E-commerce Website

A full-stack MERN e-commerce project using **MongoDB, Express, React, and Node.js** with a **minimalist UI** and **skeleton shimmer loading**.

## What is implemented

- **Auth**: register, login, profile (JWT)
- **Catalog**: product list + product detail API
- **Cart**: add/remove/update quantity, local persistence
- **Orders**: place order + view my orders
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

## Demo account

- Email: `demo@store.com`
- Password: `password123`

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
