const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return {
				...state,
				articles: action.payload.articles,

				pagination: action.payload.pagination,

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

		case 'SET_PAGE':
			return {
				...state,
				offset: action.payload,
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
