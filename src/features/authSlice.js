import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user") || "")
	: { email: "", token: "", id: "" };

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = {
				uid: action.payload.uid,
				email: action.payload.email,
				token: action.payload.token,
			};
			localStorage.setItem("user", JSON.stringify(state));
		},
		clearUser: (state) => {
			state.user = null;
			state.token = "";
			state.uid = "";

			localStorage.setItem("user", JSON.stringify(state));
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
