import React, { useEffect } from "react";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "../../features/productsSlice";
import { addToCart } from "../../features/cartSlice";
import CategorySelector from "./CategorySelector";
import ProductCard from "./ProductCard";

const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.items);
	const loading = useSelector((state) => state.products.loading);
	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};

	return (
		<div>
			<CategorySelector />
			<div className="products-container">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
				))}
			</div>
		</div>
	);
};

export default Home;
