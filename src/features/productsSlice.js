import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
	name: "products",
	initialState: {
		items: [],
		loading: false,
	},
	reducers: {
		setProducts: (state, action) => {
			state.items = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setProducts, setLoading } = productsSlice.actions;

export default productsSlice.reducer;
