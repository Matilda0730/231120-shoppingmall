import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../features/productSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { addToCart } from "../../features/cartSlice";

const Production = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const productId = Number(id);

	const { product, isLoading } = useSelector((state) => state.product);
	const { products } = useSelector((state) => state.cart);
	const productMatching = products.some((el) => el.id === product.id);

	useEffect(() => {
		dispatch(fetchProduct(productId));
	}, [productId, dispatch]);
	//prb3 : 또 안 떠서 array 속 array를  해봤는데 안 뜬다 왜일까?
	// console.log(product)를 하면 빈 array만 반환된다...
	//products가 안이 차 있는 array인 것 같다. 근데 구조가 특이해서 뒤에 [0]을 붙이고 어레이에서 가지고 와야 하는 것 같다.
	// 서버가 불안정해서 콘솔 찍어오는것도 불안정한 것 같다 ㅠㅠ 제대로 출력됐는지도 확인이 불가능
	return (
		<div className="page">
			{console.log(products)}
			{isLoading ? (
				<Loader />
			) : (
				<div className="card_wrapper">
					<div className="card_img">
						<img src={products.images} alt="product title" />
					</div>
					<div className="card_description">
						<h3>{products.category}</h3>
						<h1>{products.title}</h1>
					</div>

					<h4>$ {products.price}</h4>
					<p>{products.description}</p>
					<div>
						<button
							disabled={productMatching}
							onClick={() => !productMatching && addToCart()}
						>
							{productMatching ? "Already in Cart" : "Add to cart"}
						</button>
						<Link to={"/cart"}>Go to cart</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Production;
