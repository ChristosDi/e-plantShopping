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
        decrementQuantity:(state, action) =>{
            const existing = state.items.find(item=>item.name === action.payload.name);
            if (existing){
                if (existing.quantity>1){
                    existing.quantity--;
                }else{
                    state.items = state.items.filter(item=>item.name !== action.payload.name);
                }
            }
        }
    }
})

export const { addItem, removeItem, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;