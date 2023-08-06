import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Homepage from "./components/Homepage.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CardList from "./components/CardList.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/cards" element={<CardList/>} />
                <Route path="/cart" element={<ShoppingCart/>} />
            </Routes>
        </QueryClientProvider>
    );
};

export default App;

