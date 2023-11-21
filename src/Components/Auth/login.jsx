import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";

const Login = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	const signIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				dispatch(
					setUser({
						uid: userCredential.user.uid,
						email: userCredential.user.email,
					})
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (currentUser) {
		return <Logout />;
	}

	return (
		<div className="sign-in-container">
			<form onSubmit={signIn}>
				<h1>Log in</h1>
				<input
					type="email"
					placeholder="Enter your Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button type="submit">Log in</button>
				<Link to="/sign-up">회원가입</Link>
			</form>
		</div>
	);
};

export default Login;
