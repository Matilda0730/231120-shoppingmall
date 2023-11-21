import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = {
				uid: action.payload.uid,
				email: action.payload.email,
			};
		},
		clearUser: (state) => {
			state.user = null;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
