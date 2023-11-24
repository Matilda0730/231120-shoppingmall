// components/CategorySelector.js
import React from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../features/productsSlice";
import { setLoading } from "../../features/productSlice";

const CategorySelector = () => {
	const dispatch = useDispatch();

	const fetchProducts = (category) => {
		dispatch(setLoading(true));
		let url = `https://fakestoreapi.com/products`;
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
	const categories = {
		all: "all",
		Electronics: "electronics",
		Jewelery: "jewelery",
		MensClothing: `men's clothing`,
		WomenClothing: `women's clothing`,
	};
	const categoriesArray = Object.entries(categories).map(([name, id]) => ({ name, id }));
	return (
		<div className="button-container">
			{categoriesArray.map((category) => (
				<button
					key={category.id}
					className="button-57"
					onClick={() => fetchProducts(category.id)}
				>
					{category.name} <span>{category.name}</span>
				</button>
			))}
		</div>
	);
};

export default CategorySelector;
