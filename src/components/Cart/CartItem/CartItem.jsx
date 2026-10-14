function CartItem({ item, onIncrement, onDecrement, onRemove }){
    const itemTotal = item.cost * item.quantity;

    return(
        <div className="cart-item">
            <img
                src={`${import.meta.env.BASE_URL}${item.image}`}
                alt={`A ${item.name} plant.`}
            />
            <div className="cart-item-details">
                <h2>{item.name}</h2>
                <h4>Cost: {item.cost}£</h4>
                <div className="cart-item-quantity">
                    {item.quantity > 1 &&
                        <button onClick={() => onDecrement(item)}>-</button>
                    }
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrement(item)}>+</button>
                </div>
                <p>Total: {itemTotal} </p>
                <button onClick={() => onRemove(item)}>Delete</button>
            </div>
        </div>
    );
}

export default CartItem;