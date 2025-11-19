import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

import { useMoviesList } from "../contexts/MoviesListContext";

export default function HomePage() {
	const { list } = useMoviesList();

	return (
		<>
			<h1>Hello</h1>
			<SearchBar />
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
