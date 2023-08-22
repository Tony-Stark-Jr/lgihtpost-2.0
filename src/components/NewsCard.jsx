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
import Pagination from './Pagination';
import 'react-toastify/dist/ReactToastify.css';

function NewsCard({ category }) {
	if (category === undefined) {
		category = '';
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
	let API = 'https://newsapi.org/v2/top-headlines?';
	const API_KEY = import.meta.env.VITE_API_KEY;

	const { state, dispatch } = useGlobalContext();
	const { isLoading, query, articles, page } = state;

	// Dummy data for development purpose
	// const articles = [
	//     {
	//         "source": {
	//             "id": "reuters",
	//             "name": "Reuters"
	//         },
	//         "author": "Stella Qiu",
	//         "title": "Asian shares stumble as US yields advance, dollar buoyant - Reuters",
	//         "description": "Asian shares stumbled on Thursday as U.S. bonds yields hit nine-month peaks and pushed the dollar higher, while investors waited anxiously to see if results from Apple and Amazon justified the tech sector's sky-high valuations.",
	//         "url": "https://www.reuters.com/markets/global-markets-wrapup-1-pix-2023-08-03/",
	//         "urlToImage": "https://www.reuters.com/resizer/tsBLNxhHax2lB8C1kxnuC3WZ-ek=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/RZMV5XSY2BN6BNXMCATQDOJV7Y.jpg",
	//         "publishedAt": "2023-08-03T06:04:32Z",
	//         "content": "SYDNEY, Aug 3 (Reuters) - Asian shares stumbled on Thursday as U.S. bonds yields hit nine-month peaks and pushed the dollar higher, while investors waited anxiously to see if results from Apple and A… [+4239 chars]"
	//     },
	//     {
	//         "source": {
	//             "id": "cnn",
	//             "name": "CNN"
	//         },
	//         "author": "Stephen Collinson",
	//         "title": "Trump set to return to Washington for monumental court date – but a national catharsis is unlikely - CNN",
	//         "description": "Former President Donald Trump on Thursday is expected to return to the epicenter of his alleged bid to overthrow the 2020 election to answer historic charges, including conspiracy to defraud the United States.",
	//         "url": "https://www.cnn.com/2023/08/03/politics/trump-returns-to-washington-arraignment/index.html",
	//         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230803104158-donald-trump-0624.jpg?c=16x9&q=w_800,c_fill",
	//         "publishedAt": "2023-08-03T06:01:00Z",
	//         "content": "Former President Donald Trump on Thursday is expected to return to the epicenter of his alleged bid to overthrow the 2020 election to answer historic charges, including conspiracy to defraud the Unit… [+7880 chars]"
	//     },
	//     {
	//         "source": {
	//             "id": "reuters",
	//             "name": "Reuters"
	//         },
	//         "author": "Stella Qiu",
	//         "title": "Asian shares stumble as US yields advance, dollar buoyant - Reuters",
	//         "description": "Asian shares stumbled on Thursday as U.S. bonds yields hit nine-month peaks and pushed the dollar higher, while investors waited anxiously to see if results from Apple and Amazon justified the tech sector's sky-high valuations.",
	//         "url": "https://www.reuters.com/markets/global-markets-wrapup-1-pix-2023-08-03/",
	//         "urlToImage": "https://www.reuters.com/resizer/tsBLNxhHax2lB8C1kxnuC3WZ-ek=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/RZMV5XSY2BN6BNXMCATQDOJV7Y.jpg",
	//         "publishedAt": "2023-08-03T06:04:32Z",
	//         "content": "SYDNEY, Aug 3 (Reuters) - Asian shares stumbled on Thursday as U.S. bonds yields hit nine-month peaks and pushed the dollar higher, while investors waited anxiously to see if results from Apple and A… [+4239 chars]"
	//     },
	// ]

	// To set api to user interface
	
	const fetchApiData = async (url) => {
		dispatch({ type: 'SET_LOADING' });

		try {
			let res = await fetch(url);
			res = await res.json();
			const art = res.articles;
			dispatch({
				type: 'GET_NEWS',
				payload: {
					articles: art,
					totalResults: res.totalResults,
				},
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			// newsapi.org
			fetchApiData(`${API}q=${query}&country=us&category=${category}&apikey=${API_KEY}&page=${page}`)
		}, 1000);
		return () => clearTimeout(timeOut);
	}, [query, category, page]);

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
					urlToImage,
					publishedAt,
					description,
				} = article;
				return (
					<div key={title} className="px-4 py-2 lg:py-8 lg:px-16">
						<hr className="w-full mb-6 border-[1.5px] border-gray-200 rounded-sm" />

						<div className="items-center gap-8 lg:grid lg:grid-cols-3 lg:h-full ">
							<div>
								<p className="mb-2 text-xs tracking-wider md:text-base text-skin-muted">
									Source: {source.name}
								</p>
								<img
									src={urlToImage}
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
										{formattedDate(publishedAt)}
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
