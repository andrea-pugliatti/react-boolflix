import { useState } from "react";

export default function HomePage() {
	const [moviesList, setMoviesList] = useState([]);
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

		const url = `${endpoint}?api_key=${key}&language=${languageOption}&query=${query}`;

		fetch(url)
			.then((res) => res.json())
			.then((res) => setMoviesList(res.results))
			.catch((err) => console.error(err));

		setQuery("");
	};

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
				{moviesList.map((current) => (
					<li key={current.id}>
						<p>Titolo: {current.title}</p>
						<p>Titolo originale: {current.original_title}</p>
						<p>Lingua: {flags[current.original_language]}</p>
						<p>Voto: {current.vote_average}</p>
					</li>
				))}
			</ul>
		</>
	);
}
