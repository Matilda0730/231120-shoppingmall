import { House, ShoppingCartSimple, SignIn, SignOut } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../Auth/useLogout"; // 커스텀 훅 사용
import { useSelector } from "react-redux";

function Navbar() {
	const currentUser = useSelector((state) => state.auth.user);
	const logout = useLogout();
	return (
		<div className="nav-container">
			<Link to="/">
				<p>Platzi Fake Store</p>
			</Link>
			<div className="nav-right-container">
				<Link to="/">
					<div className="nav-home">
						<House size={32} />
					</div>
				</Link>

				<Link to="/cart">
					<div className="shopping-cart">
						<ShoppingCartSimple size={32} />
					</div>
				</Link>

				{currentUser ? (
					<div className="logout" onClick={logout}>
						<SignOut size={32} />
					</div>
				) : (
					<Link to="/login">
						<SignIn size={32} />
					</Link>
				)}
			</div>
		</div>
	);
}

export default Navbar;
