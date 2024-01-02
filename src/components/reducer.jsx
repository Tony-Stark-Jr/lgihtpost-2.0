const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return {
				...state,
				articles: action.payload.articles,
				totalResults: action.payload.totalResults,
				isLoading: false,
			};

		case 'SET_LOADING':
			return {
				...state,
				isLoading: true,
			};
		case 'SEARCH_QUERY':
			return {
				...state,
				query: action.payload,
			};
		case 'BOOKMARKS_POST':
			return {
				...state,
				bookMarks: action.payload.bookMarks,
			};
		case 'NEXT_PAGE':
			let pageNumInc = state.page + 1;
			if (pageNumInc >= state.totalResults) {
				pageNumInc = 1;
			}
			return {
				...state,
				page: pageNumInc
			};
		case "PREV_PAGE":
			let pageNum = state.page - 1;
			if (pageNum <= 0) {
				pageNum = state.totalResults - 1;
			}
			return {
				...state,
				page: pageNum,
			}

		default:
			return state;
	}
};

export default reducer;
