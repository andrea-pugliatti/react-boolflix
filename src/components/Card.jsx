export default function Card({
	title,
	original_title,
	original_language,
	poster_path,
	vote,
	overview,
}) {
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
		return stars;
	};

	return (
		<div className="card">
			<img src={`${imageUrl}w342${poster_path}`} alt={title} />
			<div className="card-body">
				<p className="card-title">
					<span className="text-bold">{title}</span>
				</p>
				<p className="card-original-title">
					Titolo originale: <span className="text-bold">{original_title}</span>
				</p>
				<p className="card-language">
					Lingua: {flags[original_language] ? flags[original_language] : "🏴‍☠️"}
				</p>
				<p className="card-rating">Voto: {handleVote(Math.ceil(vote / 2))}</p>
				<p className="card-description">{overview}</p>
			</div>
		</div>
	);
}
