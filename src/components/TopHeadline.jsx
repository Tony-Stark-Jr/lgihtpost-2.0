import { IconBookmark, IconShare } from '@tabler/icons-react';

function TopHeadline() {
	const results = [
		{
			title:
				'Horizon Forbidden West – Új előzetesen a nyugati vidékek kihívásai',
			link: 'https://www.pcguru.hu/hirek/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai/69101',
			keywords: null,
			creator: null,
			video_url: null,
			description:
				'Aloy kalandjának folytatásában úgy tűnik nem sok alkalmunk lesz tétlenül, malmozva ücsörögni.',
			content: null,
			pubDate: '2022-02-04 07:07:01',
			image_url:
				'http://www.pcguru.hu/uploads/news/mid/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai-hirek-4acebfe659a8326cb803-mid.jpg',
			source_id: 'pcguru',
			country: ['hungary'],
			category: ['entertainment'],
			language: 'hungarian',
		},
		{
			title:
				'Horizon Forbidden West – Új előzetesen a nyugati vidékek kihívásai',
			link: 'https://www.pcguru.hu/hirek/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai/69101',
			keywords: null,
			creator: null,
			video_url: null,
			description:
				'Aloy kalandjának folytatásában úgy tűnik nem sok alkalmunk lesz tétlenül, malmozva ücsörögni.',
			content: null,
			pubDate: '2022-02-04 07:07:01',
			image_url:
				'http://www.pcguru.hu/uploads/news/mid/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai-hirek-4acebfe659a8326cb803-mid.jpg',
			source_id: 'pcguru',
			country: ['hungary'],
			category: ['entertainment'],
			language: 'hungarian',
		},
		{
			title:
				'Horizon Forbidden West – Új előzetesen a nyugati vidékek kihívásai',
			link: 'https://www.pcguru.hu/hirek/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai/69101',
			keywords: null,
			creator: null,
			video_url: null,
			description:
				'Aloy kalandjának folytatásában úgy tűnik nem sok alkalmunk lesz tétlenül, malmozva ücsörögni.',
			content: null,
			pubDate: '2022-02-04 07:07:01',
			image_url:
				'http://www.pcguru.hu/uploads/news/mid/horizon-forbidden-west-uj-elozetesen-a-nyugati-videkek-kihivasai-hirek-4acebfe659a8326cb803-mid.jpg',
			source_id: 'pcguru',
			country: ['hungary'],
			category: ['entertainment'],
			language: 'hungarian',
		},
	];

	return (
		<div className="hidden bg-skin-base lg:w-[500px] lg:h-[408px]  overflow-x-auto m-auto px-4 py-8 lg:flex lg:flex-col lg:items-center lg:rounded-lg lg:col-start-4 lg:col-end-5">
			<h2 className="text-[21px] text-skin-accent custom-scrollbar">
				Top Headline
			</h2>
			{results.map((news) => {
				const { title, link, source_id, image_url, pubDate } = news;
				return (
					<div
						key={link}
						className="flex flex-col items-center lg:py-4 lg:px-8"
					>
						<hr className="w-full mb-6 border-[1.5px] border-gray-200 rounded-sm" />

						<div className="items-center gap-8 lg:flex">
							<div className="flex flex-col gap-2">
								<p className="text-xs tracking-wider text-skin-muted ">
									Source: {source_id}
								</p>

								<h2 className="text-base font-medium text-skin-base">
									{title}
								</h2>
								<div className="flex items-center justify-between text-xs text-skin-muted">
									{/* <p>{() => pubDate(pubDate)}</p> */}
									<p className="text-xs tracking-wider">{pubDate}</p>
									<div className="flex gap-2">
										<IconBookmark className="w-6 h-6" />
										<IconShare className="w-6 h-6" />
									</div>
								</div>
							</div>

							<div>
								<img
									src={image_url}
									alt="news-img"
									className="object-cover w-[100%] rounded-lg h-64px"
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TopHeadline;
