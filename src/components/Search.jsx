import { IconSearch, IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { useGlobalContext } from "./AppProvider";

function Search() {
	const { query, searchPost } = useGlobalContext();
	// console.log(query)

	// For toggle between search mode
	const [activeSearch, setActiveSearch] = useState(false);

	const toggleVisibility = () => {
		setActiveSearch(true);
	};

	const backToNavbar = () => {
		setActiveSearch(false);
	};

	return (
		<>
			<IconSearch size={32} onClick={toggleVisibility} className="lg:hidden" />

			{activeSearch && (
				<div className="modal">
					<IconSearch
						size={32}
						className=" lg:hidden text-skin-muted open-button"
					/>
					<div className="fixed top-0 right-0 z-10 flex items-center justify-between w-full h-20 px-4 overflow-y-hidden shadow-2xl dark:dark-theme bg-skin-base">
						<IconArrowLeft
							className="cursor-pointer text-skin-base"
							onClick={backToNavbar}
						/>
						<form onSubmit={(e) => e.preventDefault()} className="">
							<div className="flex items-center">
								<input
									type="text"
									value={query}
									onChange={(e) => searchPost(e.target.value)}
									placeholder="Search for business, markets, sports etc"
									className="relative w-full py-2 rounded-full outline-none px-9 bg-skin-muted text-skin-muted"
								/>

								<IconSearch className="absolute mx-2 cursor-pointer text-skin-muted" />
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default Search;
