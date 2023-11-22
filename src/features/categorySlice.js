import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
	name: "category",
	initialState: {
		selectedCategory: "all",
	},
	reducers: {
		setCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
	},
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
