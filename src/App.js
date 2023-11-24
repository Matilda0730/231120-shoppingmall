import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Production from "./Components/ProductView/Production";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/production/:id" element={<Production />} />
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/not-found" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
