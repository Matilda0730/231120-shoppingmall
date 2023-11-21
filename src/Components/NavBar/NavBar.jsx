import { CoatHanger, House } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="nav-container">
			<Link to="/">
				<p>Platzi Fake Store</p>
			</Link>
			<div>
				<div className="nav-right-container">
					<Link to="/">
						<div className="nav-home">
							<House size={32} />
						</div>
					</Link>

					<Link to="/production">
						<div className="nav-production">
							<CoatHanger size={32} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
