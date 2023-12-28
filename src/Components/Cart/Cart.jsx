import React from "react";
import { useSelector } from "react-redux";
import CartEmpty from "./CartEmpty";
import CartList from "./CartList";
import CheckOut from "./CheckOut";
import styles from "./Cart.module.scss";

const Cart = () => {
	const { products } = useSelector((state) => state.cart);
	return (
		<div className="page">
			{!products.length ? (
				<CartEmpty title={"Cart"} />
			) : (
				<div className={styles.Cart_container}>
					<CartList />
					<CheckOut />
				</div>
			)}
		</div>
	);
};

export default Cart;
