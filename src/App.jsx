import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Header';
import Bookmark from './pages/Bookmark';
import NewsSource from './components/NewsSource';
import Footer from './components/Footer';

function App() {
	return (
		<div className=" App bg-skin-muted dark:dark-theme">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route exact key="top" path="/" element={<NewsSource />} />
					<Route
						exact
						key="general"
						path="/general"
						element={<NewsSource category="general" />}
					/>
					<Route
						exact
						key="business"
						path="/business"
						element={<NewsSource category="business" />}
					/>
					<Route
						exact
						key="technology"
						path="/technology"
						element={<NewsSource category="technology" />}
					/>
					<Route
						exact
						key="science"
						path="/science"
						element={<NewsSource category="science" />}
					/>
					<Route
						exact
						key="entertainment"
						path="/entertainment"
						element={<NewsSource category="entertainment" />}
					/>
					<Route
						exact
						key="health"
						path="/health"
						element={<NewsSource category="health" />}
					/>
					<Route
						exact
						key="sports"
						path="/sports"
						element={<NewsSource category="sports" />}
					/>
					<Route exact key="bookmark" path="/bookmark" element={<Bookmark />} />
				</Routes>

				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
