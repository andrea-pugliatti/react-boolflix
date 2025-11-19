import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MoviesListProvider } from "./contexts/MoviesListContext";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";

function App() {
	return (
		<MoviesListProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<DefaultLayout />}>
						<Route index element={<HomePage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</MoviesListProvider>
	);
}

export default App;
