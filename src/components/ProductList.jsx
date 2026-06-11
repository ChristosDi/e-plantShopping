import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";
import CartItem from "./CartItem";
import ePlantShop_logo from "../assets/ePlantShop_logo.png";
import emptyCart from "../assets/shopping_card/emptyCart.png";
import fullCart from "../assets/shopping_card/fullCart.png";

function ProductList(){
    const [plantList, setPlantList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(()=>{
        fetch(`${import.meta.env.BASE_URL}plants.json`)
            .then(response => response.json())
            .then(data => setPlantList(data));
    },[]);

    // unique categories, kept in the order they first appear in the data
    const categories = [...new Set(plantList.map(plant => plant.category))];

    // is this plant already in the cart? (used to disable its Add button)
    const isInCart = (name) => cartItems.some(item => item.name === name);

    // dispatch the clicked plant to the Redux store
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return(
        <div className="layout_page" id="layout">
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
                        <h3 onClick={() => setShowCart(false)}>Plants</h3>
                    </li>
                    <li>
                        <a onClick={() => setShowCart(true)} className="cart-link">
                            <img
                                src={cartItems.length > 0 ? fullCart : emptyCart}
                                alt={cartItems.length > 0 ? "Cart with items" : "Empty cart"}
                                className="cart-icon"
                            />
                            {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="content-area">
                {showCart ? (
                    <CartItem onContinueShopping={() => setShowCart(false)} />
                ) : plantList.length === 0 ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <div className="product-page">
                        {categories.map(category => (
                            <section key={category} className="category-section">
                                <h2 className="category-title">{category}</h2>
                                <div className="product-grid">
                                    {plantList
                                        .filter(plant => plant.category === category)
                                        .map(plant => (
                                            <div className="product-cart" key={plant.name}>
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${plant.image}`}
                                                    alt={`A ${plant.name} plant`}
                                                />
                                                <h2>{plant.name}</h2>
                                                <p>{plant.description}</p>
                                                <h4>Cost: {plant.cost}£</h4>
                                                <button
                                                    className="product-button"
                                                    onClick={() => handleAddToCart(plant)}
                                                    disabled={isInCart(plant.name)}
                                                >
                                                    {isInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
