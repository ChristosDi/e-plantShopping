function CartItem({ image, name, cost, quantity, onClickMinus, onClickPlus, onClickDelete }){
    const total= cost * quantity
    //const totalCartAmount FINISH THIS 
    return(
        <div className="cart-item">
            <img
                src={`${import.meta.env.BASE_URL}${image}`}
                alt ={`A ${name} plant.`}
            />
            <div className="cart-item-details">
                <h2>{name}</h2>
                <h4>Cost: {cost}£</h4>
                <div className="cart-item-quantity">
                    {quantity>1 &&
                        <button
                        onClick={onClickMinus}
                        >
                            -
                        </button>
                    }
                    <span>{quantity}</span>
                    <button
                        onClick={onClickPlus}
                    >
                        +
                    </button>
                </div>
                <p>Total: {total} </p>
                <button
                    onClick={onClickDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default CartItem;