// components/CategorySelector.js
import React from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../../features/productsSlice";

const CategorySelector = () => {
	const dispatch = useDispatch();

	const fetchProducts = (categoryId) => {
		fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
			.then((res) => res.json())
			.then((data) => {
				dispatch(setProducts(data));
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
			});
	};
	const categories = {
		Clothes: "1",
		Electronics: "2",
		Furniture: "3",
		Shoes: "4",
		Miscellaneous: "5",
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
