import React, { useState } from 'react';
import { useGlobalContext } from '../components/AppProvider';
import {
	IconBookFilled,
	IconBookmark,
	IconBookmarkFilled,
	IconShare,
} from '@tabler/icons-react';
import formattedDate from '../utils/formattedDate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookmark() {
	const { state, dispatch } = useGlobalContext();
	const { isLoading } = state;

	// For notification

	const notifyUnbookmark = () => {
		toast.success('News is successfully unsaved');
	};

	// For share modal
	const [shareModal, setShareModal] = useState(false);

	let bookmarkData = JSON.parse(localStorage.getItem('news') || '[]');

	const handleBookmarks = (news) => {
		if (state.bookMarks.includes(news.url)) {
			notifyUnbookmark();
			bookmarkData = bookmarkData.filter((m) => m.url !== news.url);
		}

		localStorage.setItem('news', JSON.stringify(bookmarkData));
		// console.log(bookmarkData)
		bookmarkState();
	};

	const bookmarkState = () => {
		let temp = bookmarkData.map((news) => news.url);
		dispatch({
			type: 'BOOKMARKS_POST',
			payload: {
				bookMarks: [...temp],
			},
		});
	};

	// Loader
	// if (isLoading) {
	//   return (
	//     <div className="flex justify-center h-full">
	//       <span class="loader"></span>
	//     </div>
	//   )
	// }

	return (
		<div className="mt-8 mb-32 lg:mt-16 bg-skin-muted dark:dark-theme">
			<div className="mb-8 responsiveNavFooter text-skin-base">
				<h1 className="text-[27px] lg:text-4xl font-medium lg:mb-1">
					Saved Stories
				</h1>
			</div>

			<div className="bg-skin-base lg:w-[90%] w-[80%] m-auto md:px-4 md:py-8 py-4 flex flex-col items-center rounded-lg  col-start-1 col-end-4">
				{bookmarkData?.map((article) => {
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
						<div key={title} className="px-4 py-2 lg:py-2 lg:px-16">
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
													{
														<IconBookmarkFilled className="w-6 h-6 lg:h-8 lg:w-8" />
													}
												</button>
												<ToastContainer />
											</div>

											<div className="share">
												<IconShare
													className="w-6 h-6 cursor-pointer lg:h-8 lg:w-8"
													onClick={() => setShareModal(true)}
												/>
												{shareModal && (
													<SocialModal
														link={url}
														setShareModal={setShareModal}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>

							<hr className="w-full mt-6 border-[1.5px] border-gray-200 rounded-sm" />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Bookmark;
