import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";

function CartItem({ onContinueShopping }){
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // grand total for the whole cart (sum of cost x quantity for every item)
    const totalCartAmount = items.reduce((total, item) => total + item.cost * item.quantity, 0);

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    };

    const handleCheckout = () => {
        alert("Coming Soon!");
    };

    return(
        <div className="cart-total-container">
            <strong>Total Cart Amount: {totalCartAmount}£</strong>
            {items.length === 0 && <p className="empty-cart">Your cart is empty. Add some plants!</p>}
            <div className="cart-items-content-area">
                {items.map(item => {
                    const itemTotal = item.cost * item.quantity;
                    return (
                        <div className="cart-item" key={item.name}>
                            <img
                                src={`${import.meta.env.BASE_URL}${item.image}`}
                                alt={`A ${item.name} plant.`}
                            />
                            <div className="cart-item-details">
                                <h2>{item.name}</h2>
                                <h4>Cost: {item.cost}£</h4>
                                <div className="cart-item-quantity">
                                    {item.quantity > 1 &&
                                        <button onClick={() => handleDecrement(item)}>-</button>
                                    }
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrement(item)}>+</button>
                                </div>
                                <p>Total: {itemTotal} </p>
                                <button onClick={() => handleRemove(item)}>Delete</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default CartItem;
