import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Homepage from "./components/Homepage.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CardList from "./components/CardList.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {DeckProvider} from "./context/DeckContext.jsx";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <DeckProvider>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/cards" element={<CardList/>}/>
                    <Route path="/cart" element={<ShoppingCart/>}/>
                </Routes>
            </DeckProvider>
        </QueryClientProvider>
    );
};

export default App;

