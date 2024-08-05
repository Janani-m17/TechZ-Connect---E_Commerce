import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({

    name:'wishlist',
    initialState:{
        items:[]
    },
    reducers:{
        addToWishlist: (state, action) => {
              state.items.push(action.payload);
          },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        }
    }
})

export default wishlistSlice.reducer;
export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions;