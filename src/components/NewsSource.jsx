import React from 'react';
import NewsCard from './NewsCard';

function NewsSource({ category }) {
	const date = new Date();

	const options = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	};

	const formattedDate = date.toLocaleDateString('en-US', options);

	return (
		<div className="mt-8 mb-32 lg:mt-16 bg-skin-muted dark:dark-theme">
			<div className="mb-8 responsiveNavFooter text-skin-base">
				<h1 className="text-[27px] lg:text-4xl font-medium lg:mb-1">
					Today Stories,
				</h1>
				<p className="text-xs tracking-wider lg:text-base">{formattedDate}</p>
			</div>
			<NewsCard category={category} />
		</div>
	);
}

export default NewsSource;
