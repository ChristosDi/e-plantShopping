# Paradise Nursery - Plant Shopping Cart App

A responsive e-commerce single-page application for an online plant shop, built with React and Redux Toolkit. Users browse houseplants grouped by category, add them to a cart, adjust quantities, and see a live running total. Built as the capstone for the IBM "Developing Front-End Apps with React" course.

## Live Demo

(Add your GitHub Pages link here once deployed.)

## What This Project Demonstrates

This app was built to practise and show the core skills needed for modern front-end React development:

- **Component-driven architecture.** The UI is broken into small, focused, reusable components (LandingPage, NavBar, ProductList, ProductCard, CartItems, CartItem, AboutUs) that each do one job and communicate through props.
- **Global state management with Redux Toolkit.** A single `CartSlice` holds the cart state. Reducers (`addItem`, `removeItem`, `decrementQuantity`) handle every cart operation, and any component can read or update the cart through the store rather than passing props up and down the tree.
- **React hooks.** `useState` for local component state, `useEffect` for loading the product data on mount, and `useRef` for direct DOM access on the landing-page video. From Redux, `useSelector` to read the cart and `useDispatch` to fire actions.
- **Data-driven rendering.** Plants are loaded from a JSON source and rendered dynamically with `.map()`, grouped into categories with `.filter()`, and totalled with `.reduce()`. No hard-coded product markup.
- **Controlled, reactive UI.** The cart icon badge, the empty-versus-full icon swap, the per-item subtotals, the grand total, and the disabling of an "Add to Cart" button after selection all update automatically the instant the store changes.
- **Clean, hand-written CSS.** Responsive product grid using CSS Grid with `auto-fill` and `minmax`, flexbox layouts for the cards and cart rows, and consistent theming, all without a UI framework.

## Key Features

- Landing page with a background video and a "Get Started" call to action
- Product catalogue split into three categories with six plants each
- "Add to Cart" buttons that disable once an item is in the cart
- Navigation bar with a live cart-item counter and a dynamic cart icon
- Cart page with quantity increment and decrement, per-item subtotals, item removal, and a grand total
- "Continue Shopping" and "Checkout" (Coming Soon) actions

## Tech Stack

| Area | Technology |
|------|------------|
| Library | React 19 (functional components and hooks) |
| State | Redux Toolkit, React-Redux |
| Build tool | Vite |
| Styling | Plain CSS (Grid and Flexbox) |
| Tooling | ESLint |

## Project Structure

```
src/
  components/
    LandingPage.jsx    Hero section with video and AboutUs
    AboutUs.jsx        Company description
    NavBar.jsx         Logo, navigation, live cart counter
    ProductList.jsx    Fetches data, groups by category, renders cards
    ProductCard.jsx    A single product tile with Add to Cart
    CartItems.jsx      Cart page: totals, list, checkout
    CartItem.jsx       A single cart row with quantity controls
  redux/
    CartSlice.jsx      Cart state, reducers and actions
    store.jsx          Redux store configuration
  App.jsx              Root layout
  App.css              Application styles
public/
  plants.json          Product data
  plants/              Product images
```

## How the Cart Works

The cart lives in a single Redux store created in `store.jsx` and made available to the whole app by wrapping it in a `<Provider>` in `main.jsx`.

- Clicking **Add to Cart** dispatches `addItem`. If the plant is already in the cart its quantity increases, otherwise it is added with a quantity of one.
- The **+** and **-** buttons dispatch `addItem` and `decrementQuantity`. Reducing the last unit removes the item from the cart.
- **Delete** dispatches `removeItem`, which filters the plant out of the cart.
- The navbar counter and the totals are derived from the store with `useSelector`, so they stay in sync everywhere with no manual wiring.

## Running Locally

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Author

Christos Dimitriou
