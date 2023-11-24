import React from "react";
import { NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartList = () => {
	const { products } = useSelector((state) => state.cart);
	return (
		<div className="cart_list">
			{products.map((product) => (
				<CartItem key={product.id} item={product} />
			))}
		</div>
	);
};

export default CartList;
