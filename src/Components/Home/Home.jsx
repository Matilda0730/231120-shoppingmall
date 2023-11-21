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
			url += `/category/${category}`;
		}

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
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
				<button className="button-28" onClick={() => fetchProducts("Clothes")}>
					Clothes
				</button>
				<button className="button-28" onClick={() => fetchProducts("Electronics")}>
					Electronics
				</button>
				<button className="button-28" onClick={() => fetchProducts("Furniture")}>
					Furniture
				</button>
				<button className="button-28" onClick={() => fetchProducts("Shoes")}>
					Shoes
				</button>
				<button className="button-28" onClick={() => fetchProducts("Miscellaneous")}>
					Miscellaneous
				</button>
			</div>

			<div className="products-container">
				{products.map((product) => (
					<div key={product.id} className="item-card">
						<Link to={`/product-details/${product.id}`} className="product-link">
							<Card style={{ width: "16rem" }}>
								<Card.Img variant="top" src={product.images} alt={product.title} />
								<Card.Body>
									<Card.Title>{product.title}</Card.Title>
									<Card.Text>
										<h5>{`${product.price}$`}</h5>
										Some quick example text to build on the card title and make
										up the bulk of the card's content.
									</Card.Text>
									<Button variant="primary">장바구니에 담기</Button>
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
