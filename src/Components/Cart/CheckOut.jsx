import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, sendOrder } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";

const CheckOut = () => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTotalPrice());
	}, [cart]);

	return (
		<div className={styles.checkout_container}>
			<div>
				<p>
					{""}
					<span>합계:</span> $ {cart.totalPrice.toFixed(2)}
				</p>
				<button className={styles.button_28} onClick={() => sendOrder()}>
					계산하기
				</button>

				<Link to={"/login"}>
					<button className={styles.button_28}>로그인</button>
				</Link>
			</div>
		</div>
	);
};

export default CheckOut;
