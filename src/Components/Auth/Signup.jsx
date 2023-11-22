import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firebaseerror, setFirebaseError] = useState("");

	const signUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				dispatch(setUser(userCredential.user));
				navigate("/login");
			})
			.catch((error) => {
				return error && setFirebaseError("이메일 또는 비밀번호가 잘못되었습니다.");
			});
	};
	return (
		<div className="sign-in-container">
			<form onSubmit={signUp}>
				<h1>Create Account</h1>
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
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
};

export default SignUp;
