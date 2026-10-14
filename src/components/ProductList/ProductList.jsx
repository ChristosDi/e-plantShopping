import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/CartSlice";
import CartItems from "../Cart/CartItems/CartItems";
import NavBar from "../NavBar/NavBar";
import CategorySection from "../CategorySection/CategorySection";

function ProductList(){
    const [plantList, setPlantList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(()=>{
        fetch(`${import.meta.env.BASE_URL}plants.json`)
            .then(response => response.json())
            .then(data => setPlantList(data));
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