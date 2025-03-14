import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            //Mutating the state
          state.items = [...state.items,action.payload];
        },
        removeItem:(state,action)=>{
            state.items.pop();
        },
        existingItem: (state, action) => {
            const index = action.payload;
            if (state.items[index]) {
                state.items[index].quantity += 1;
            }
        },
        
        
        clearCart:(state)=>{
            state.items.length=0;
        }
    }
});
export const {addItem,removeItem,clearCart,existingItem} = cartSlice.actions
export default cartSlice.reducer;

