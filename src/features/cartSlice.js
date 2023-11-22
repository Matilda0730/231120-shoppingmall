import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};
//초기화

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			const existingIndex = state.cartItems.findIndex(
				(item) => item.id === action.payload.id
			);
			if (existingIndex >= 0) {
				state.cartItems[existingIndex] = {
					...state.cartItems[existingIndex],
					cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
				};
				toast.info("Increased product quantity", {
					position: "top-center",
				});
			} else {
				let tempProductItem = { ...action.payload, cartQuantity: 1 };
				state.cartItems.push(tempProductItem);
				toast.success("Product added to cart", {
					position: "top-center",
				});
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
