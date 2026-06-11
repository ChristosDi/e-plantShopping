import emptyCart from "../assets/shopping_card/emptyCart.png"
import fullCart from "../assets/shopping_card/fullCart.png"
import ePlantShop_logo from "../assets/ePlantShop_logo.png"
import { useSelector } from "react-redux";

function NavBar({onShowPlants, onShowCartItems}){
  const items = useSelector(state => state.cart.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

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
              <h3 onClick={onShowPlants}>Plants</h3>{/*THIS MUST BE FIXED LATER - ON CLICK TAKE ME TO THE PAGES CONTACT INFO*/}
            </li>
            <li>
              <a onClick={onShowCartItems} className="cart-link">
              <img
                src={ items.length>0 ? fullCart: emptyCart }
                alt={ items.length>0 ? "Cart with items" : "Empty cart"}
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