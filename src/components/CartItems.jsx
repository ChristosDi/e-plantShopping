import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { addItem, removeItem, decrementQuantity } from "../redux/CartSlice";

function CartItems({onShowPlants}){
    const items = useSelector(state=>state.cart.items);
    const dispatch = useDispatch()
    const totalCartAmount = items.reduce((total, item)=> total + item.cost* item.quantity,0)
    return(
        <div className="cart-total-container">
            <strong>Total Cart Amount: {totalCartAmount}£</strong>
            {items.length === 0 && <p className="empty-cart">Your cart is empty. Add some plants!</p>}
            <div className="cart-items-content-area" >
                {items.map(item =>{
                    return(
                        <CartItem
                            key={item.name}
                            image={item.image}
                            name={item.name}
                            cost={item.cost}
                            quantity={item.quantity}
                            onClickMinus={()=>{dispatch(decrementQuantity(item))}}
                            onClickPlus={()=>{dispatch(addItem(item))}}
                            onClickDelete={()=>{dispatch(removeItem(item))}}
                        />
                )})}

            </div>
            <button onClick={onShowPlants}>Continue Shopping</button>
            <button onClick={() => alert("Coming Soon!")}>Checkout</button>
        </div>
    );
}

export default CartItems;