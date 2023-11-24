import React from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	//prb 1 오류가 떠서 30분동안 헤맸는데 useSeclector로 리듀서를 끌어올 때엔 key값을 써야한다는 걸 알았다
	const { products } = useSelector((state) => state.cart);
	const productMatching = products.some((el) => el.id === product.id);
	const onAddToCart = () => {
		dispatch(addToCart(product));
	};
	return (
		<div className="item-card">
			<Card style={{ width: "16rem" }}>
				<Link to={`/production/${product.id}`} className="product-link">
					<Card.Img variant="top" src={product.image} alt={product.title} />
				</Link>
				<Card.Body>
					<Link to={`/production/${product.id}`} className="product-link">
						<Card.Title className="text">{product.title}</Card.Title>
					</Link>
					<Card.Text className="text">
						<h5>{`${product.price}$`}</h5>
						{product.description}
					</Card.Text>

					<Button variant="primary" onClick={() => onAddToCart()}>
						{productMatching ? "Already in Cart" : "Add to Cart"}
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ProductCard;
