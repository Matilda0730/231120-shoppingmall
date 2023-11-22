import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProductCard = ({ product, onAddToCart }) => {
	return (
		<div className="item-card">
			<Link to={`/product-details/${product.id}`} className="product-link">
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
