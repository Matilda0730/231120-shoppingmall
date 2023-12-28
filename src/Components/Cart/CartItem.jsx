import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cart.module.scss";
import { useDispatch } from "react-redux";
import { decrementProduct, deleteFromCart, incrementProduct } from "../../features/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = (item) => {
	const dispatch = useDispatch();
	const deleteProduct = () => {
		dispatch(deleteFromCart(item.item.id));
	};
	const incrementCount = () => {
		dispatch(incrementProduct(item.item.id));
	};
	const decrementCount = () => {
		dispatch(decrementProduct(item.item.id));
	};
	return (
		<div className={styles.ItemAllContainer}>
			<div className={styles.ItemContainer}>
				<div className={styles.cart_item}>
					<Link to={`/production/${item.item.id}`}>
						<img src={item.item.image} alt="product card" />
					</Link>
				</div>
				<div className={styles.cart_introduction}>
					<div className={styles.cart_description}>
						<h3>{item.item.category.name}</h3>
						<h2>{item.item.title}</h2>
						<span>
							{item.item.price} x {item.item.quantity} = ${" "}
							{item.item.total.toFixed(2)}
						</span>
					</div>
					<div className={styles.cart_count}>
						<div></div>
					</div>
				</div>

				<div className={styles.item_button_container}>
					<button disabled={item.item.quantity === 1} onClick={decrementCount}>
						-
					</button>
					<span>{item.item.quantity}</span>
					<button disabled={item.item.quantity === 10} onClick={incrementCount}>
						+
					</button>
					<button onClick={deleteProduct} className={styles.cart_delete}>
						<AiOutlineDelete />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
