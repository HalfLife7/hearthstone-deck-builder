import ShoppingCartIcon from "../icons/shopping-cart.jsx";
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="flex flex-row w-full h-14 bg-gray-200">
            <Link className="h-14 flex items-center justify-center mx-4" to="/">Home</Link>
            <Link className="h-14 flex items-center justify-center mx-4" to="/cards">Cards</Link>
            <Link className="absolute right-0 top-0 w-14 h-14 flex items-center" to="/cart"><ShoppingCartIcon/></Link>
        </div>
    )
}

export default Navigation;