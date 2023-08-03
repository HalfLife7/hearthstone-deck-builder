import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Homepage from "./components/Homepage.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import Products from "./components/Products.jsx";

const App = () => {
    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<ShoppingCart/>} />
            </Routes>
        </div>
    );
};

export default App;

