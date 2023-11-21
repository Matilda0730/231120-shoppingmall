import React, { useEffect } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../../features/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.items);
	// const loading = useSelector((state) => state.products.loading);
	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};
	const fetchProducts = (category) => {
		dispatch(setLoading(true));
		let url = "https://api.escuelajs.co/api/v1/products";
		if (category !== "all") {
			url = `https://api.escuelajs.co/api/v1/categories/${category}/products`;
		}

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data);
				dispatch(setProducts(data));
				dispatch(setLoading(false));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setLoading(false));
			});
	};
	useEffect(() => {
		dispatch(setLoading(true));
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((res) => res.json())
			.then((data) => {
				dispatch(setProducts(data));
				dispatch(setLoading(false));
			})
			.catch((error) => {
				console.error("Error:", error);
				dispatch(setLoading(false));
			});
	}, [dispatch]);
	return (
		<div>
			<div className="button-container">
				<button className="button-57" onClick={() => fetchProducts("1")}>
					Clothes <span>Clothes</span>
				</button>
				<button className="button-57" onClick={() => fetchProducts("2")}>
					Electronics <span>Electronics</span>
				</button>
				<button className="button-57" onClick={() => fetchProducts("3")}>
					Furniture <span>Furniture</span>
				</button>
				<button className="button-57" onClick={() => fetchProducts("4")}>
					Shoes <span>Shoes</span>
				</button>
				<button className="button-57" onClick={() => fetchProducts("5")}>
					Miscellaneous <span>Miscellaneous</span>
				</button>
			</div>

			<div className="products-container">
				{products.map((product) => (
					<div key={product.id} className="item-card">
						<Link to={`/product-details/${product.id}`} className="product-link">
							<Card style={{ width: "16rem" }}>
								<Card.Img variant="top" src={product.images} alt={product.title} />
								<Card.Body>
									<Card.Title className="text">{product.title}</Card.Title>
									<Card.Text className="text">
										<h5>{`${product.price}$`}</h5>
										{product.description}
									</Card.Text>
									<Button variant="primary" onClick={handleAddToCart}>
										Add to Cart
									</Button>
								</Card.Body>
							</Card>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
