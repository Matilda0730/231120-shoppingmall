import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Production from "./Components/ProductView/Production";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import Signup from "./Components/Auth/Signup";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/production" element={<Production />} />
					<Route path="/not-found" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/not-found" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/sign-up" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
