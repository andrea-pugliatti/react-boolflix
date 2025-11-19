import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function HomePage() {
	const [moviesList, setMoviesList] = useState([]);
	const [seriesList, setSeriesList] = useState([]);
	const [list, setList] = useState([]);
	const [query, setQuery] = useState("");

	const endpoint = import.meta.env.VITE_API_URL;
	const key = import.meta.env.VITE_API_KEY;
	const languageOption = "it-IT";

	const handleSubmit = (event) => {
		event.preventDefault();

		const urlMovies = `${endpoint}movie?api_key=${key}&language=${languageOption}&query=${query}`;
		const urlSeries = `${endpoint}tv?api_key=${key}&language=${languageOption}&query=${query}`;

		fetch(urlMovies)
			.then((res) => res.json())
			.then((res) => setMoviesList(res.results))
			.catch((err) => console.error(err));

		fetch(urlSeries)
			.then((res) => res.json())
			.then((res) => setSeriesList(res.results))
			.catch((err) => console.error(err));

		setQuery("");
	};

	useEffect(
		() => setList([...moviesList, ...seriesList]),
		[moviesList, seriesList],
	);

	return (
		<>
			<h1>Hello</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={query}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<button type="submit">Cerca</button>
			</form>

			<ul>
				{list.map((current) =>
					current.title ? (
						<li key={`${current.id}-${current.title}`}>
							<Card
								title={current.title}
								original_title={current.original_title}
								original_language={current.original_language}
								poster_path={current.poster_path}
								vote={current.vote_average}
							/>
						</li>
					) : (
						<li key={`${current.id}-${current.name}`}>
							<Card
								title={current.name}
								original_title={current.original_title}
								original_language={current.original_name}
								poster_path={current.poster_path}
								vote={current.vote_average}
							/>
						</li>
					),
				)}
			</ul>
		</>
	);
}
