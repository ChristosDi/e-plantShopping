# Paradise Nursery - Full-Stack Plant Shop

A full-stack e-commerce app for an online plant shop. The front end is a React and Redux Toolkit single-page app; the back end is an Express REST API backed by MongoDB. Users browse houseplants grouped by category, add them to a cart, adjust quantities and see a live running total.

The front end started as the capstone for the IBM "Developing Front-End Apps with React" course. It has since been extended with its own back end, so the product catalogue and images are served by an API instead of static files.

## Live Demo

https://christosdi.github.io/e-plantShopping/

The live demo currently runs the earlier front-end-only version. The API version runs locally (see [Running Locally](#running-locally)) until the API is deployed.

## Architecture

```
React app (Vite, port 5173)  ->  /api, /images  ->  Express API (port 3000)  ->  MongoDB Atlas
   UI + cart state (Redux)                          catalogue + images            plants collection
```

- **The database credentials never reach the browser.** Only the API holds the MongoDB connection string, loaded from an environment variable and kept out of Git.
- **One connection, opened at startup.** The API connects to MongoDB once before it starts listening, and fails fast if the database is unreachable.
- **Images are files, not database records.** Each plant document stores an image key (for example `plants/snakePlant.png`); the API serves the files as static assets and the front end builds the URL from a base path plus that key.
- **A development proxy instead of CORS.** In development, Vite forwards `/api` and `/images` requests to the API, so the browser only ever talks to one origin.

## What This Project Demonstrates

**Front end**

- **Component-driven architecture.** The UI is split into small, focused components (LandingPage, NavBar, ProductList, CategorySection, ProductCard, CartItems, CartItem, AboutUs) that each do one job.
- **Global state with Redux Toolkit.** A single `CartSlice` holds the cart. Its reducers (`addItem`, `removeItem`, `updateQuantity`) are the only way the cart changes, and components read it with `useSelector` instead of passing props through the tree.
- **Resilient data fetching.** The catalogue is fetched from the API with explicit handling of failures: non-2xx responses are treated as errors, requests are cancelled after 10 seconds with `AbortSignal.timeout`, and the user sees a friendly message while full details go to the console.
- **Data-driven rendering.** Plants are rendered with `.map()`, grouped by category with `.filter()` and totalled with `.reduce()`. No hard-coded product markup.

**Back end**

- **REST API with Express 5.** Read-only endpoints for the catalogue, a health check, and static image serving.
- **MongoDB with the official Node.js driver.** Database and collection access without an ORM, to keep the queries explicit.
- **An idempotent seed script.** `npm run seed` loads the catalogue with a single `bulkWrite` of upserts keyed on the plant name, so it can be run any number of times without creating duplicates.
- **Configuration through environment variables.** Settings are read from `process.env` and loaded with Node's built-in `--env-file`, so the same code runs locally and in production with different values.

## Key Features

- Landing page with a background video and a "Get Started" call to action
- Product catalogue served by the API, split into three categories with six plants each
- "Add to Cart" buttons that disable once an item is in the cart
- Navigation bar with a live cart-item counter
- Cart page with quantity controls, per-item subtotals, item removal and a grand total
- Clear loading, error and timeout states when the catalogue cannot be fetched

## Tech Stack

| Area | Technology |
|------|------------|
| Front end | React 19 (functional components and hooks) |
| State | Redux Toolkit, React-Redux |
| Build tool | Vite |
| Back end | Node.js, Express 5 |
| Database | MongoDB Atlas, official MongoDB Node.js driver |
| Styling | Plain CSS (Grid and Flexbox) |
| Tooling | ESLint (browser rules for `src`, Node rules for `server`) |

## API Endpoints

| Method | Path | Returns |
|--------|------|---------|
| GET | `/api/health` | `{ "status": "ok" }` when the API is running |
| GET | `/api/plants` | Every plant in the catalogue, as a JSON array |
| GET | `/images/plants/<file>` | A plant image |

Example plant document:

```json
{
  "_id": "6721f0c4e1b2a3c4d5e6f701",
  "name": "Snake Plant",
  "image": "plants/snakePlant.png",
  "description": "Hardy upright succulent with tall variegated leaves.",
  "cost": 22,
  "category": "Cacti & Easy-Care"
}
```

## Project Structure

```
src/
  components/
    LandingPage/        Hero section with video and About Us
    AboutUs/            Company description
    NavBar/             Logo, navigation, live cart counter
    ProductList/        Fetches plants from the API, handles loading and errors
    CategorySection/    One category heading and its plant cards
    ProductCard/        A single plant tile with Add to Cart
    Cart/
      CartItems/        Cart page: list, totals, checkout
      CartItem/         A single cart row with quantity controls
  redux/
    CartSlice.jsx       Cart state, reducers and actions
    store.jsx           Redux store configuration
server/
  index.js              Express API
  scripts/seed.js       Loads data/plants.json into MongoDB
  data/plants.json      Plant catalogue (seed source)
  images/plants/        Plant images served at /images
  .env.example          Template for the required environment variables
public/
  plants/               Background banner (design asset)
  videos/               Landing page video
vite.config.js          Base path and development proxy
```

## How the Cart Works

The cart lives in a Redux store created in `store.jsx` and made available to the whole app by a `<Provider>` in `main.jsx`.

- **Add to Cart** dispatches `addItem`. If the plant is already in the cart its quantity increases; otherwise it is added with a quantity of one.
- The **+** and **-** buttons dispatch `updateQuantity`. Reducing a quantity to zero removes the item.
- **Delete** dispatches `removeItem`, which filters the plant out of the cart.
- The navbar counter and totals are read from the store with `useSelector`, so they stay in sync everywhere.

## Running Locally

**Prerequisites**

- Node.js 22 or newer (the API uses Node's built-in `--env-file` and `--watch`)
- A MongoDB database: a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local MongoDB install

**1. Install dependencies**

```bash
npm install
cd server
npm install
```

**2. Configure the API**

Copy the template and add your connection string:

```bash
cp server/.env.example server/.env
```

On Windows PowerShell: `Copy-Item server\.env.example server\.env`

If you use MongoDB Atlas, also add your IP address under **Security > Network Access**.

**3. Load the catalogue into MongoDB**

```bash
cd server
npm run seed
```

The seed is safe to run again: existing plants are updated, not duplicated.

**4. Start both servers** (in two terminals)

```bash
# Terminal 1: the API, on http://localhost:3000
cd server
npm run dev

# Terminal 2: the website, from the project root
npm run dev
```

Then open http://localhost:5173/e-plantShopping/

To create and preview a production build (the API must be running):

```bash
npm run build
npm run preview
```

## Roadmap

- Deploy the API and point the front end at it with a `VITE_API_URL` setting
- Production hardening: a custom error handler that never sends stack traces to clients, and a CORS policy for the deployed front end
- Checkout with `POST /api/orders`, with prices validated on the server rather than trusted from the cart
- Automated tests for the API and the main user flows

## Author

Christos Dimitriou
