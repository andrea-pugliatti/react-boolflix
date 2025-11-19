import { useEffect, useState } from "react";

export default function HomePage() {
	const [moviesList, setMoviesList] = useState([]);
	const [seriesList, setSeriesList] = useState([]);
	const [list, setList] = useState([]);
	const [query, setQuery] = useState("");

	const endpoint = import.meta.env.VITE_API_URL;
	const key = import.meta.env.VITE_API_KEY;
	const languageOption = "it-IT";

	const flags = {
		en: "🇺🇸",
		es: "🇪🇸",
		fr: "🇫🇷",
		de: "🇩🇪",
		it: "🇮🇹",
		pt: "🇧🇷",
		ru: "🇷🇺",
		hi: "🇮🇳",
		pl: "🇵🇱",
		nl: "🇳🇱",
		sv: "🇸🇪",
		tr: "🇹🇷",
		el: "🇬🇷",
		ja: "🇯🇵",
		ko: "🇰🇷",
		zh: "🇨🇳",
		ar: "🇸🇦",
		he: "🇮🇱",
		id: "🇮🇩",
		th: "🇹🇭",
		vi: "🇻🇳",
	};

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
							<p>Titolo: {current.title}</p>
							<p>Titolo originale: {current.original_title}</p>
							<p>
								Lingua:{" "}
								{flags[current.original_language]
									? flags[current.original_language]
									: "🏴‍☠️"}
							</p>
							<p>Voto: {current.vote_average}</p>
						</li>
					) : (
						<li key={`${current.id}-${current.name}`}>
							<p>Titolo: {current.name}</p>
							<p>Titolo originale: {current.original_name}</p>
							<p>
								Lingua:{" "}
								{flags[current.original_language]
									? flags[current.original_language]
									: "🏴‍☠️"}
							</p>
							<p>Voto: {current.vote_average}</p>
						</li>
					),
				)}
			</ul>
		</>
	);
}
