import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items:[],
    },
    reducers:{
        addItem:(state, action) =>{
            const existing = state.items.find(item=>item.name === action.payload.name);
            if (!existing){
                state.items.push({...action.payload, quantity: 1})
            }else{
                existing.quantity++;
            }
        },
        removeItem:(state, action) =>{
            state.items = state.items.filter(item=>item.name !== action.payload.name);
        },
        updateQuantity:(state, action) =>{
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item){
                if (quantity > 0){
                    item.quantity = quantity;
                }else{
                    state.items = state.items.filter(item => item.name !== name);
                }
            }
        }
    }
})

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;