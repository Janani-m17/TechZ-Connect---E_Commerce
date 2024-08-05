import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
    },
    incrementItem: (state,action) => {
      state.items = state.items.map((item) => {
        if(item.id === action.payload.id)
          return ({...item,quantity: item.quantity+1})
        else
        return item
      })
    },
    decrementItem: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          };
        } else 
          return item;
      });
    },  
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    }  
  }
});

export default cartSlice.reducer;
export const { addToCart, incrementItem,decrementItem,removeItem } = cartSlice.actions;
