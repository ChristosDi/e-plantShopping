import ProductCard from "../ProductCard/ProductCard";

function CategorySection({ category, plants, isInCart, onAddToCart }){
    return(
        <section className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="product-grid">
                {plants.map(plant => (
                    <ProductCard
                        key={plant.name}
                        plant={plant}
                        inCart={isInCart(plant.name)}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategorySection;