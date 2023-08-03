import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Products from "./components/Products.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import './index.css'

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/cart",
                element: <ShoppingCart />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
