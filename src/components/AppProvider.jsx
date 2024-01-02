import React, { createContext, useContext, useMemo, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
	isLoading: true,
	query: '',
	articles: [],
	category: '',
	bookMarks: [],
	totalResults: 0,
	page: 1,
};

const AppContext = createContext();

function AppProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Search
	const searchPost = (searchQuery) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: searchQuery,
		});
	};

	// Pagination
	const getNextPage = () => {
		dispatch({
			type: "NEXT_PAGE",
		})
	}

	const getPrevPage = () => {
		dispatch({
			type: "PREV_PAGE",
		})
	}

	const memoizedValue = useMemo(
		() => ({
			state,
			...state,
			dispatch,
			searchPost,
			getPrevPage,
			getNextPage
		}),
		[state, dispatch, searchPost, getPrevPage,
			getNextPage]
	);

	return (
		<AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
	);
}

// Custom hook create
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
