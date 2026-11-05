import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CartSlice";
import CartItems from "../Cart/CartItems/CartItems";
import NavBar from "../NavBar/NavBar";
import CategorySection from "../CategorySection/CategorySection";

function ProductList(){
    const [plantList, setPlantList] = useState([]);
    const [error, setError] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(()=>{
        fetch("/api/plants", { signal: AbortSignal.timeout(10000) })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setPlantList(data))
            .catch(err => {
                console.error(err);
                setError(
                    err.name === "TimeoutError"
                        ? "The plants are taking too long to load. Please try again later."
                        : "Couldn't load the plants. Please try again later."
                );
            });
    },[]);

    // unique categories, kept in the order they first appear in the data
    const categories = [...new Set(plantList.map(plant => plant.category))];

    const isInCart = (name) => cartItems.some(item => item.name === name);

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return(
        <div className="layout_page" id="layout">
            <NavBar
                onShowPlants={() => setShowCart(false)}
                onShowCart={() => setShowCart(true)}
            />

            <div className="content-area">
                {showCart ? (
                    <CartItems onContinueShopping={() => setShowCart(false)} />
                ) : error ? (
                    <p className="loading">{error}</p>
                ) : plantList.length === 0 ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <div className="product-page">
                        {categories.map(category => (
                            <CategorySection
                                key={category}
                                category={category}
                                plants={plantList.filter(plant => plant.category === category)}
                                isInCart={isInCart}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;