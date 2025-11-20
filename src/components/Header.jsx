import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
	return (
		<header>
			<div className="container">
				<Link to={"/"}>
					<h1>BoolFlix</h1>
				</Link>
				<SearchBar />
			</div>
		</header>
	);
}
