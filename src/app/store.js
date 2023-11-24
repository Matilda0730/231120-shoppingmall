import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		auth: authReducer,
		cart: cartReducer,
		product: productReducer,
	},
});
