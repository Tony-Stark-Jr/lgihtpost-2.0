import React from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useGlobalContext } from './AppProvider';

function Pagination() {
	const { totalResults, page, getNextPage, getPrevPage } = useGlobalContext();

	return (
		<div className="container flex items-center justify-between mt-8 button-container">
			<button
				type="button"
				className="flex items-center justify-between p-2 sm:gap-1 btn-readMore"
				onClick={() => getPrevPage()}
			>
				{' '}
				<IconArrowLeft className="w-4 sm:w-6" /> Prev page{' '}
			</button>

			<p className="font-semibold text-skin-base">
				{page} of {totalResults}
			</p>

			<button
				type="button"
				className="flex items-center justify-between p-2 sm:gap-1 btn-readMore"
				onClick={() => getNextPage()}
			>
				Next page <IconArrowRight className="w-4 sm:w-6" />
			</button>
		</div>
	);
}

export default Pagination;
