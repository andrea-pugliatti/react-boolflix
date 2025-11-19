import { createContext, useContext, useState } from "react";

const MoviesListContext = createContext();

function MoviesListProvider({ children }) {
	const [list, setList] = useState([]);

	return (
		<MoviesListContext.Provider
			value={{
				list,
				setList,
			}}
		>
			{children}
		</MoviesListContext.Provider>
	);
}

function useMoviesList() {
	const context = useContext(MoviesListContext);
	return context;
}

export { MoviesListProvider, useMoviesList };
