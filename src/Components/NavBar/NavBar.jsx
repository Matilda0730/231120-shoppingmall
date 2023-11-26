import { House, ShoppingCartSimple, SignIn, SignOut } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../Auth/useLogout"; // 커스텀 훅을 사용, 로그아웃 버튼을 누르면 로그아웃 되게 만듦
import { useSelector } from "react-redux";
import Modals from "./Modals";

function Navbar() {
	const { products } = useSelector((state) => state.cart);
	const currentUser = useSelector((state) => state.auth.user);
	const logout = useLogout();
	const [isCartModalOpen, setIsCartModalOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsCartModalOpen(true);
	};

	const handleMouseLeave = () => {
		setIsCartModalOpen(false);
	};

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
					<div
						className="cart-modal-container"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className="shopping-cart">
							<ShoppingCartSimple size={32} />
						</div>

						<Modals
							isOpen={isCartModalOpen}
							onRequestClose={() => setIsCartModalOpen(false)}
							products={products}
						/>
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
