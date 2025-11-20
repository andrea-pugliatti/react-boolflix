import { Link } from "react-router-dom";
import Card from "../components/Card";

import { useMoviesList } from "../contexts/MoviesListContext";

export default function HomePage() {
	const { list } = useMoviesList();

	return (
		<div className="container">
			<div className="row">
				{list.map((current) =>
					current.title ? (
						<div
							className="card-container"
							key={`${current.id}-${current.title}`}
						>
							<Link to={`/movies/movie/${current.id}`}>
								<Card
									title={current.title}
									original_title={current.original_title}
									original_language={current.original_language}
									poster_path={current.poster_path}
									vote={current.vote_average}
									overview={current.overview}
								/>
							</Link>
						</div>
					) : (
						<div
							className="card-container"
							key={`${current.id}-${current.name}`}
						>
							<Link to={`/movies/tv/${current.id}`}>
								<Card
									title={current.name}
									original_title={current.original_title}
									original_language={current.original_name}
									poster_path={current.poster_path}
									vote={current.vote_average}
									overview={current.overview}
								/>
							</Link>
						</div>
					),
				)}
			</div>
		</div>
	);
}
