import React, { useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { decrementProduct, deleteFromCart, incrementProduct } from "../../features/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { Leaf } from "phosphor-react";

const Modals = ({ isOpen, onRequestClose }) => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.cart);

	const deleteProduct = (productId) => {
		dispatch(deleteFromCart(productId));
	};

	const incrementCount = (productId) => {
		dispatch(incrementProduct(productId));
	};

	const decrementCount = (productId) => {
		dispatch(decrementProduct(productId));
	};

	const modalContentRef = useRef(null);
	let isMouseInsideModal = false;

	const handleMouseEnter = () => {
		isMouseInsideModal = true;
	};

	const handleMouseLeave = () => {
		isMouseInsideModal = false;
		if (!isMouseInsideModal) {
			onRequestClose();
		}
	};

	return (
		<div>
			<Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.myModal}>
				<div
					ref={modalContentRef}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{products.map((product) => (
						<div key={product.id} className={styles.cart_item}>
							<Link to={`/production/${product.id}`}>
								<img src={product.image} alt="product" />
							</Link>
							<div className={styles.cart_description}>
								<h3>{product.category.name}</h3>
								<h2>{product.title}</h2>
								<span>
									{product.price} x {product.quantity} = ${" "}
									{product.total.toFixed(2)}
								</span>
							</div>
							<div className={styles.cart_count}>
								<div>
									<button
										disabled={product.quantity === 1}
										onClick={() => decrementCount(product.id)}
										className={styles.button_28}
									>
										-
									</button>
									<span>{product.quantity}</span>
									<button
										disabled={product.quantity === 10}
										onClick={() => incrementCount(product.id)}
										className={styles.button_28}
									>
										+
									</button>
								</div>
							</div>

							<button
								onClick={() => deleteProduct(product.id)}
								className={styles.cart_delete}
							>
								<AiOutlineDelete />
							</button>
							<Link to={`/cart`}>
								<button className={styles.button_27}>구매하러 가기</button>
							</Link>
						</div>
					))}
				</div>
			</Modal>
		</div>
	);
};

export default Modals;
