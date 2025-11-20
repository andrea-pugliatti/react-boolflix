/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <Bug> */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
	const [movie, setMovie] = useState(null);
	const [credits, setCredits] = useState(null);

	const { type, id } = useParams();
	const endpoint = "https://api.themoviedb.org/3/";
	const key = import.meta.env.VITE_API_KEY;
	const languageOption = "it-IT";

	const movieUrl = `${endpoint}${type}/${id}?api_key=${key}&language=${languageOption}`;
	const creditsUrl = `${endpoint}${type}/${id}/credits?api_key=${key}&language=${languageOption}`;

	useEffect(() => {
		fetch(movieUrl)
			.then((res) => res.json())
			.then((res) => setMovie(res))
			.catch((err) => console.error(err));

		fetch(creditsUrl)
			.then((res) => res.json())
			.then((res) => setCredits(res))
			.catch((err) => console.error(err));
	}, []);

	const imageUrl = "https://image.tmdb.org/t/p/";

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

	const handleVote = (number) => {
		let stars = "";
		for (let i = 0; i < number; i++) {
			stars += "★";
		}
		for (let i = 0; i < 5 - number; i++) {
			stars += "☆";
		}
		return stars;
	};

	return movie ? (
		<div className="container">
			<img src={`${imageUrl}w342${movie.poster_path}`} alt={movie.title} />

			<div className="card-body">
				<p className="card-title">
					<span className="text-bold">{movie.title}</span>
				</p>
				<p className="card-original-title">
					Titolo originale:{" "}
					<span className="text-bold">{movie.original_title}</span>
				</p>
				<p className="card-language">
					Lingua:{" "}
					{flags[movie.original_language]
						? flags[movie.original_language]
						: "🏴‍☠️"}
				</p>
				<p className="card-rating">
					Voto: {handleVote(Math.ceil(movie.vote / 2))}
				</p>
				<p>
					{movie.genres.map((current, index) => (
						<li key={current.id}>
							Genere {index + 1}: {current.name}
						</li>
					))}
				</p>
				<p className="card-description">{movie.overview}</p>
				<p>
					{credits.cast.map((current) => (
						<li key={current.id}>{current.name}</li>
					))}
				</p>
			</div>
		</div>
	) : (
		""
	);
}
