function ProductCard({ name, image, description, cost, clicked, added }){
    return(
        <div className="product-cart">
            <img
                src={image}
                alt={`A ${name} plant`}
            />
            <h2>{name}</h2>
            <p>{description}</p>
            <h4>Cost: {cost}£</h4>
            <button
                className="product-button"
                onClick={clicked}
                disabled={added}
            >
                {added ? "Added to Cart" : "Add to Cart"}
            </button>
        </div>
    );
}

export default ProductCard;
