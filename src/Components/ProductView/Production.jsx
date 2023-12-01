import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../features/productSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { addToCart } from "../../features/cartSlice";
import styles from "./production.module.scss";

const Production = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const productId = Number(id);
	const { product, isLoading } = useSelector((state) => state.product);
	const { products } = useSelector((state) => state.cart);
	const productMatching = products.some((el) => el.id === product.id);
	const handleAddToCart = () => {
		if (!productMatching) {
			dispatch(addToCart(product));
		}
	};
	useEffect(() => {
		dispatch(fetchProduct(productId));
	}, [productId, dispatch]);
	//prb3 : productslice에서 이름을 맞추지 않아서 문제가 생겼던 것이었다...

	return (
		<div className={styles.page_parent}>
			<div className={styles.page}>
				{isLoading ? (
					<Loader />
				) : (
					<div className={styles.card_wrapper}>
						<img className={styles.img} src={product.image} alt="product's title" />
						<div className={styles.card_wrapper_description}>
							<div className={styles.card_description}>
								<h3>{product.category}</h3>
								<h1>{product.title}</h1>
							</div>

							<h4>$ {product.price}</h4>
							<p>{product.description}</p>
							<div>
								<button disabled={productMatching} onClick={handleAddToCart}>
									{productMatching ? "Already in Cart" : "Add to cart"}
								</button>
								<Link to={"/cart"}>Go to cart</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Production;
