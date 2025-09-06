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


// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },   // default route
      { path: 'about', element: <About /> }, // /about
      { path: "menu", element: <Menu />},
      { path: "cart", element: <Cart />},
            { path: "settings", element: <Settings />}


    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
