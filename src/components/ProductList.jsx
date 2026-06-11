import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { addItem } from "../redux/CartSlice";

function ProductList(){
    const [plantList, setPlantList] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    useEffect(()=>{
        fetch(`${import.meta.env.BASE_URL}plants.json`)
            .then(response => response.json())
            .then(data => setPlantList(data));
    },[]);

    // unique categories, kept in the order they first appear in the data
    const categories = [...new Set(plantList.map(plant => plant.category))];

    // is this plant already in the cart? (used to disable its Add button)
    const isInCart = (name) => cartItems.some(item => item.name === name);

    if (plantList.length === 0){
        return <p className="loading">Loading...</p>;
    }

    return(
        <div className="product-page">
            {categories.map(category => (
                <section key={category} className="category-section">
                    <h2 className="category-title">{category}</h2>
                    <div className="product-grid">
                        {plantList
                            .filter(plant => plant.category === category)
                            .map(plant => (
                                <ProductCard
                                    key={plant.name}
                                    name={plant.name}
                                    image={plant.image}
                                    description={plant.description}
                                    cost={plant.cost}
                                    added={isInCart(plant.name)}
                                    clicked={() => dispatch(addItem(plant))}
                                />
                            ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductList;
