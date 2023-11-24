import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
	"product/fetchProduct",
	async (categoryId, thunkAPI) => {
		try {
			const response = await fetch(
				`https://fakestoreapi.com/products/category/${categoryId}`
			);
			const data = await response.json();
			return data;
		} catch (e) {
			return thunkAPI.rejectWithValue("Error loading product");
		}
	}
);

export const productSlice = createSlice({
	name: "product",
	initialState: {
		product: [],
		isLoading: false,
		error: "",
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
			.addCase(fetchProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { setProducts, setLoading } = productSlice.actions;

export default productSlice.reducer;
