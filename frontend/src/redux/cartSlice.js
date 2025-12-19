import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // This will hold the books added to cart
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item._id || item.id;
      const existingItem = state.cartItems.find((i) => (i._id || i.id) === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, id: itemId, quantity: 1 });
      }

      // Simple price calculation
      state.totalPrice += item.price;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => (i._id || i.id) === id);

      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => (i._id || i.id) !== id);
      }
    },

    // ✅ New Clear Cart Reducer
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
