import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../../redux/CartSlice";
import CartItem from "../CartItem/CartItem";

function CartItems({ onContinueShopping }){
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

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
                {items.map(item => (
                    <CartItem
                        key={item.name}
                        item={item}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onRemove={handleRemove}
                    />
                ))}
            </div>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default CartItems;