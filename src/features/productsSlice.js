import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (categoryId, thunkAPI) => {
		const response = await fetch(
			`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
		);
		const data = await response.json();
		return data;
	}
);

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

	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setProducts, setLoading } = productsSlice.actions;

export default productsSlice.reducer;
