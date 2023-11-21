import React, { useState, useEffect } from "react";

const CategoryProducts = ({ categoryId }) => {
	const [products, setProducts] = useState([]);

	// 카테고리 ID에 따라 제품 목록을 가져오는 함수
	const fetchProducts = async (categoryId) => {
		try {
			const response = await fetch(
				`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
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
			<h1>Products</h1>
			<div className="products-container">
				{products.map((product) => (
					<div key={product.id} className="product-card">
						<img src={product.images[0]} alt={product.title} />
						<h5>{product.title}</h5>
						<p>${product.price}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryProducts;
