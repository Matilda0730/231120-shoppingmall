import React from "react";
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import CartList from "./CartList";
import CheckOut from "./CheckOut";

const Cart = () => {
	const { products } = useSelector((state) => state.cart);
	return (
		<div className="page">
			{!products.length ? (
				<CartEmpty title={"Cart"} />
			) : (
				<div className="container">
					<h1>장바구니</h1>
					<CartList />
					<CheckOut />
				</div>
			)}
		</div>
	);
};

export default Cart;
