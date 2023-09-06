import React from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useGlobalContext } from './AppProvider';

function Pagination() {
	const { pagination, dispatch } = useGlobalContext();

	const totalPages = Math.floor(pagination.total / pagination.limit);
	console.log(totalPages)

	const handlePageChange = (newOffset) => {
		console.log(newOffset);
		if (newOffset >= 0 && newOffset <= pagination.total) {
			dispatch({ type: 'SET_PAGE', payload: newOffset });
		}
		console.log("hello");
	};

	console.log(pagination.offset - pagination.limit);
	console.log(pagination.offset + pagination.limit);





	return (
		<div className="container flex items-center justify-between mt-8 button-container">
			<button
				type="button"
				className="flex items-center justify-between p-2 sm:gap-1 btn-readMore"

				onClick={() => handlePageChange(pagination.offset - 1)}
			>
				{' '}
				<IconArrowLeft className="w-4 sm:w-6" /> Prev page{' '}
			</button>

			<p className="font-semibold text-skin-base">
				{Math.floor(pagination.offset / pagination.limit) + 1} of {totalPages}
			</p>

			<button
				type="button"
				className="flex items-center justify-between p-2 sm:gap-1 btn-readMore"

				onClick={() => handlePageChange(pagination.offset + 1)}
			>
				Next page <IconArrowRight className="w-4 sm:w-6" />
			</button>
		</div>
	);
}

export default Pagination;
