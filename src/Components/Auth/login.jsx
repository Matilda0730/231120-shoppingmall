import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";
import { useForm } from "react-hook-form";
import { setUserId } from "../../features/cartSlice";

const Login = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ mode: "onBlur" });

	const userEmail = {
		required: "필수 필드입니다",
		pattern: {
			value: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
			message: "입력하신 이메일 주소가 올바르지 않습니다.",
		},
	};

	const userPassword = {
		required: "필수 필드입니다",
		minLength: {
			value: 4,
			message: "최소 4자입니다",
		},
		maxLength: {
			value: 13,
			message: "최대 13자입니다.",
		},
		pattern: {
			value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm,
			message: `최소 8자, 영문 1자, 숫자 1자`,
		},
	};

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	const signIn = (data) => {
		const { email, password } = data;
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				dispatch(
					setUser({
						uid: userCredential.user.uid,
						email: userCredential.user.email,
					})
				);
				dispatch(setUserId(userCredential.user.uid));
				navigate("/");
			})
			.catch((error) => {
				alert("아이디나 비밀번호가 다릅니다.");
			});
	};

	if (currentUser) {
	}

	return (
		<div className="sign-in-container">
			<form onSubmit={handleSubmit(signIn)}>
				<h1>Log in</h1>
				<div>
					<input
						type="email"
						placeholder="Enter your Email"
						{...register("email", userEmail)}
					/>
					{errors.email && (
						<div className="styles.form_error">{errors.email.message}</div>
					)}
				</div>
				<div>
					<input
						type="password"
						placeholder="Enter your password"
						{...register("password", userPassword)}
					/>
					{errors.password && (
						<div className="styles.form_error">{errors.password.message}</div>
					)}
				</div>
				<button type="submit">Log in</button>
				<Link to="/sign-up">회원가입</Link>
			</form>
		</div>
	);
};

export default Login;
