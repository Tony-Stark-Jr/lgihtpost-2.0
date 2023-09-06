import {
	IconBookmark,
	IconBookmarkFilled,
	IconShare,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useGlobalContext } from './AppProvider';
import SocialModal from './SocialModal';
import formattedDate from '../utils/formattedDate';
import todayDate from '../utils/todayDate';
import Pagination from './Pagination';
import 'react-toastify/dist/ReactToastify.css';

function NewsCard({ category }) {
	if (category === undefined) {
		category = 'general';
	}

	// For share modal
	const [shareModal, setShareModal] = useState(false);

	// For notification
	const notifyBookmark = () => {
		toast.success('News is successfully saved');
	};

	const notifyUnbookmark = () => {
		toast.success('News is successfully unsaved');
	};

	// API
	let API = 'http://api.mediastack.com/v1/news?';
	const API_KEY = import.meta.env.VITE_ACCESS_KEY;

	const { state, dispatch } = useGlobalContext();
	const { isLoading, query, articles, offset } = state;


	// To set api to user interface

	const fetchApiData = async (url) => {
		dispatch({ type: 'SET_LOADING' });

		try {
			let res = await fetch(url);
			res = await res.json();
			const art = res.data;
			// console.log(res.pagination);
			dispatch({
				type: 'SET_NEWS',
				payload: {
					articles: art,
					pagination: res.pagination,
				},

			});
			// console.log(pagination);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			// mediastack.com
			fetchApiData(`${API}keywords=${query}&countries=us,gb,in,au&categories=${category}&access_key=${API_KEY}&languages = en&date=${todayDate}`)
		}, 1000);
		return () => clearTimeout(timeOut);
	}, [query, category, offset]);

	const handleBookmarks = (news) => {
		let oldData = JSON.parse(localStorage.getItem('news') || '[]');

		// console.log(oldData)
		// console.log(news.url);
		if (state.bookMarks.includes(news.url)) {
			notifyUnbookmark();
			oldData = oldData.filter((m) => m.url !== news.url);
		} else {
			notifyBookmark();
			oldData.push(news);
		}
		localStorage.setItem('news', JSON.stringify(oldData));
		// console.log(oldData)
		bookmarkState();
	};

	const bookmarkState = () => {
		const oldData = JSON.parse(localStorage.getItem('news') || '[]');
		dispatch({
			type: 'BOOKMARKS_POST',
			payload: {
				bookMarks: oldData.map((news) => news.url),
			},
		});
	};

	const categoryTitle = category;
	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// Loader
	if (isLoading) {
		return (
			<div className="flex justify-center h-full">
				<span className="loader" />
			</div>
		);
	}

	return (
		<div className="bg-skin-base lg:w-[90%] w-[80%] m-auto md:px-4 md:py-8 py-4 flex flex-col items-center rounded-lg  col-start-1 col-end-4">
			<h2 className="text-[21px] md:text-[27px] text-skin-accent">
				{capitalizeFirstLetter(categoryTitle)}
			</h2>
			{articles?.map((article) => {
				const {
					author,
					title,
					url,
					source,
					image,
					published_at,
					description,
				} = article;
				return (
					<div key={title} className="px-4 py-2 lg:py-8 lg:px-16">
						<hr className="w-full mb-6 border-[1.5px] border-gray-200 rounded-sm" />

						<div className="items-center gap-8 lg:grid lg:grid-cols-3 lg:h-full ">
							<div>
								<p className="mb-2 text-xs tracking-wider md:text-base text-skin-muted">
									Source: {source}
								</p>
								<img
									src={image}
									alt=""
									className="lg:w-[400px] 2xl:max-h-[320px]  rounded-lg  "
								/>
							</div>
							<div className="flex flex-col col-start-2 col-end-4 gap-5 mt-5 lg:grid">
								<h2 className="lg:text-[21px] font-medium text-skin-base text-lg">
									{title}
								</h2>

								<p className="text-sm lg:text-base text-skin-muted">
									{description}
								</p>

								<div className="flex items-center justify-between gap-1 text-base text-skin-muted">
									<p className="text-xs tracking-wider lg:text-xm">
										{formattedDate(published_at)}
									</p>
									<p className="text-xs tracking-wider lg:text-xm">
										Author: {author}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<button type="submit" className="btn-readMore">
										<a href={url} target="noopener">
											Read more
										</a>
									</button>
									<div className="flex gap-4 text-skin-muted">
										<div>
											<button
												type="button"
												onClick={() => handleBookmarks(article)}
											>
												{state.bookMarks.includes(url) ? (
													<IconBookmarkFilled className="w-6 h-6 lg:h-8 lg:w-8" />
												) : (
													<IconBookmark className="w-6 h-6 lg:h-8 lg:w-8" />
												)}
											</button>
											<ToastContainer theme="colored" />
										</div>

										<div className="share">
											<IconShare
												className="w-6 h-6 cursor-pointer lg:h-8 lg:w-8"
												onClick={() => setShareModal(true)}
											/>
											{shareModal && (
												<SocialModal link={url} setShareModal={setShareModal} />
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<hr className="w-full my-2 border-[1.5px] border-gray-200 rounded-sm" />
			<Pagination />
		</div>
	);
}

export default NewsCard;
