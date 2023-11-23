import React, { useEffect } from "react";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../../features/productsSlice";
import { addToCart } from "../../features/cartSlice";
import CategorySelector from "./CategorySelector";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.items);
	const loading = useSelector((state) => state.products.loading);
	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
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
			<CategorySelector />
			<div className="products-container">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Home;
