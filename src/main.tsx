// main.jsx
import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home';
import About from './pages/about';
import Menu from './pages/menu';
import Cart from './pages/cart';

import "./fonts"
import Settings from "./pages/settings";
import Product from "./pages/product";


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // no Layout for home
  },
  {
    path: "/",
    element: <Layout />, // wrap all others
    children: [
      { path: "about", element: <About /> },
      { path: "menu", element: <Menu /> },
      { path: "cart", element: <Cart /> },
      { path: "settings", element: <Settings /> },
            { path: "products/:category/:name", element: <Product /> }, // <-- param route

    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
