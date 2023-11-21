import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearUser } from "../../features/authSlice";

const LogoutComponent = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		const user = getAuth().currentUser;

		if (user) {
			signOut(auth)
				.then(() => {
					console.log("Logout successful");
					dispatch(clearUser());
					navigate("/");
				})
				.catch((error) => {
					console.error("Logout failed: ", error);
				});
		} else {
			console.log("No user is currently logged in.");
		}
	};

	return (
		<div>
			<h1>Logout</h1>
			<button onClick={handleLogout}>로그아웃</button>
		</div>
	);
};

export default LogoutComponent;
