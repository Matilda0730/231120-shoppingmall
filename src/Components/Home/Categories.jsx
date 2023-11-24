import React, { useState, useEffect } from "react";

const CategoryProducts = ({ categoryId }) => {
	const [products, setProducts] = useState([]);

	// 카테고리 ID에 따라 제품 목록을 가져오는 함수
	const fetchProducts = async (categoryId) => {
		try {
			const response = await fetch(
				`https://fakestoreapi.com/products/category/${categoryId}`
			);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	useEffect(() => {
		fetchProducts(categoryId);
	}, [categoryId]);

	return (
		<div>
			<div className="products-container">
				{products.map((product) => (
					<div key={product.id} className="product-card">
						<img src={product.image} alt={product.title} />
						<h5>{product.title}</h5>
						<p>${product.price}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryProducts;
