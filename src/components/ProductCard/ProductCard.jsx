function ProductCard({ plant, inCart, onAddToCart }){
    return(
        <div className="product-cart">
            <img
                src={`${import.meta.env.BASE_URL}${plant.image}`}
                alt={`A ${plant.name} plant`}
            />
            <h2>{plant.name}</h2>
            <p>{plant.description}</p>
            <h4>Cost: {plant.cost}£</h4>
            <button
                className="product-button"
                onClick={() => onAddToCart(plant)}
                disabled={inCart}
            >
                {inCart ? "Added to Cart" : "Add to Cart"}
            </button>
        </div>
    );
}

export default ProductCard;