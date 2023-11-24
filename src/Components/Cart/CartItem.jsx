import React from "react";
import { useDispatch } from "react-redux";
import { decrementProduct, deleteFromCart, incrementProduct } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem = (item) => {
	const dispatch = useDispatch();

	//prb 2 : 이경우 item.item.id처럼 두번 배열로 들어가야 한다. 왜인진 모르겠다...

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
		<div className="Styles.cart_item">
			<Link to={`/production/${item.item.id}`}>
				<img src={item.item.image} alt="product card" />
			</Link>
			<div className="styles.cart_description">
				<h3>{item.item.category.name}</h3>
				<h2>{item.item.title}</h2>
				<span>
					{item.item.price} x {item.item.quantity} = $ {item.item.total.toFixed(2)}
				</span>
			</div>
			<div className="styles.cart_count">
				<div>
					<button disabled={item.item.quantity === 1} onClick={decrementCount}>
						-
					</button>
					<span>{item.item.quantity}</span>
					<button disabled={item.item.quantity === 10} onClick={incrementCount}>
						+
					</button>
				</div>
			</div>

			<button onClick={deleteProduct} className="styles.cart_delete">
				<AiOutlineDelete />
			</button>
		</div>
	);
};

export default CartItem;
