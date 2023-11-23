import React from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProductCard = ({ product }) => {
	const onAddToCart = () => {
		console.log(product);
	};

	return (
		<div className="item-card">
			<Link to={`/production/${product.id}`} className="product-link">
				<Card style={{ width: "16rem" }}>
					<Card.Img variant="top" src={product.images} alt={product.title} />
					<Card.Body>
						<Card.Title className="text">{product.title}</Card.Title>
						<Card.Text className="text">
							<h5>{`${product.price}$`}</h5>
							{product.description}
						</Card.Text>
						<Button variant="primary" onClick={() => onAddToCart(product)}>
							Add to Cart
						</Button>
					</Card.Body>
				</Card>
			</Link>
		</div>
	);
};

export default ProductCard;
