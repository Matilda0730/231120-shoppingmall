import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { clearUser } from "../../features/authSlice";

export const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth();

	return () => {
		const user = auth.currentUser;
		if (user) {
			signOut(auth)
				.then(() => {
					dispatch(clearUser());
					navigate("/");
				})
				.catch((error) => {
					console.error("Logout failed: ", error);
				});
		}
	};
};
