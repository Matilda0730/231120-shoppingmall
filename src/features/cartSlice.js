import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	products: localStorage.getItem("cartProducts")
		? JSON.parse(localStorage.getItem("cartProducts") || "")
		: [],
	totalPrice: 0,
	userID: localStorage.getItem("userId"),
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
			localStorage.setItem("userId", JSON.stringify(state.userId));
		},
		removeUserId: (state) => {
			state.userId = "";
			localStorage.setItem("userId", JSON.stringify(state.userId));
		},
		addToCart: (state, action) => {
			//findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환. 만족하는 요소가 없으면 -1을 반환.
			const existingIndex = state.products.findIndex((item) => item.id === action.payload.id);

			if (existingIndex >= 0) {
				state.products[existingIndex] = {
					...state.products[existingIndex],
					quantity: state.products[existingIndex].quantity + 1,
					total:
						(state.products[existingIndex].quantity + 1) *
						state.products[existingIndex].price,
				};
				toast.info("Increased product quantity", {
					position: "bottom-left",
				});
			} else {
				let newProduct = {
					...action.payload,
					quantity: 1,
					total: action.payload.price,
				};
				state.products.push(newProduct);
				toast.success("Product added to cart", {
					position: "bottom-left",
				});
			}

			localStorage.setItem("cartProducts", JSON.stringify(state.products));
		},

		deleteFromCart: (state, action) => {
			state.products = state.products.filter((item) => item.id !== action.payload);
			localStorage.setItem("cartProducts", JSON.stringify(state.products));
			toast.error("Product removed from cart", {
				position: "bottom-left",
			});
		},
		incrementProduct: (state, action) => {
			state.products = state.products.map((item) =>
				item.id === action.payload
					? {
							...item,
							quantity: item.quantity + 1,
							total: item.price * (item.quantity + 1),
					  }
					: item
			);
			localStorage.setItem("cartProducts", JSON.stringify(state.products));
		},
		decrementProduct: (state, action) => {
			state.products = state.products.map((item) =>
				item.id === action.payload
					? {
							...item,
							quantity: item.quantity - 1,
							total: item.price * (item.quantity - 1),
					  }
					: item
			);
			localStorage.setItem("cartProducts", JSON.stringify(state.products));
		},

		getTotalPrice: (state) => {
			state.totalPrice = state.products.reduce((acc, item) => (acc += item.total), 0);
			return state;
		},

		clearCart(state) {
			state.cartItems = [];
			localStorage.setItem("cartProducts", JSON.stringify(state.cartItems));
			toast.error("Cart cleared", { position: "bottom-left" });
		},
		sendOrder: (state) => {
			state.products = [];
			localStorage.setItem("cartProducts", JSON.stringify(state.products));
		},
	},
});
export default cartSlice.reducer;

export const {
	setUserId,
	removeUserId,
	addToCart,
	deleteFromCart,
	incrementProduct,
	decrementProduct,
	getTotalPrice,
	clearCart,
	sendOrder,
} = cartSlice.actions;
