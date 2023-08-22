import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import { useGlobalContext } from './AppProvider';

function SearchBox() {
	const { query, searchPost } = useGlobalContext();

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="hidden col-start-2 col-end-4 lg:block"
		>
			<div className="flex items-center">
				<input
					type="text"
					value={query}
					onChange={(e) => searchPost(e.target.value)}
					placeholder="Search for business, markets, sports etc"
					className="relative w-full px-12 rounded-full outline-none bg-skin-muted sm:h-14 placeholder:text-skin-muted"
				/>
				<IconSearch
					className="absolute mx-4 cursor-pointer text-skin-muted"
					// onClick={() => searchPost()}
				/>
			</div>
		</form>
	);
}

export default SearchBox;
