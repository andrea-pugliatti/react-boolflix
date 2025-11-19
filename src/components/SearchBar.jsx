/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <Bug> */
import { useEffect, useState } from "react";

import { useMoviesList } from "../contexts/MoviesListContext";

export default function SearchBar() {
	const [moviesList, setMoviesList] = useState([]);
	const [seriesList, setSeriesList] = useState([]);
	const [query, setQuery] = useState("");

	const { setList } = useMoviesList();

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
		<form onSubmit={handleSubmit}>
			<input value={query} onChange={(event) => setQuery(event.target.value)} />
			<button type="submit">Cerca</button>
		</form>
	);
}
