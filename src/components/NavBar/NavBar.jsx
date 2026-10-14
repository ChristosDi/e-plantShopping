import { useSelector } from "react-redux";
import ePlantShop_logo from "../../assets/ePlantShop_logo.png";
import emptyCart from "../../assets/shopping_card/emptyCart.png";
import fullCart from "../../assets/shopping_card/fullCart.png";

function NavBar({ onShowPlants, onShowCart }){
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const hasItems = cartItems.length > 0;

    return(
        <nav className="navBar">
            <ul>
                <li className="brand">
                    <a href="#home" className="brand-link">
                        <img src={ePlantShop_logo} alt="Paradise Nursery logo" className="logo" />
                        <div>
                            <span className="brand-name">Paradise Nursery</span>
                            <h3>Where Green Meets Serenity</h3>
                        </div>
                    </a>
                </li>
                <li className="nav-title">
                    <h3 onClick={onShowPlants}>Plants</h3>
                </li>
                <li>
                    <a onClick={onShowCart} className="cart-link">
                        <img
                            src={hasItems ? fullCart : emptyCart}
                            alt={hasItems ? "Cart with items" : "Empty cart"}
                            className="cart-icon"
                        />
                        {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;