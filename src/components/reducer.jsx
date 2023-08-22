const reducer = (state, action) => {
	switch (action.type) {
		case 'GET_NEWS':
			return {
				...state,
				articles: action.payload.articles,
				totalResults: Math.floor(action.payload.totalResults / 10),
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

		case 'NEXT_PAGE':
			let pageNumInc = state.page + 1;
			if (pageNumInc >= state.totalResults) {
				pageNumInc = 1;
			}
			return {
				...state,
				page: pageNumInc,
			};
		case 'PREV_PAGE':
			let pageNum = state.page - 1;
			if (pageNum <= 0) {
				pageNum = state.totalResults;
			}
			return {
				...state,
				page: pageNum,
			};

		case 'BOOKMARKS_POST':
			return {
				...state,
				bookMarks: action.payload.bookMarks,
			};

		default:
			return state;
	}
};

export default reducer;
