import React, { createContext, useContext, useMemo, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
	isLoading: true,
	query: '',
	articles: [],
	category: '',
	bookMarks: [],
	// For pagination
	pagination: 0,
	limit: 0,
	offset: 0,
	count: 0,
	total: 0
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

	const memoizedValue = useMemo(
		() => ({
			state,
			...state,
			dispatch,
			searchPost,
		}),
		[state, dispatch, searchPost]
	);

	return (
		<AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
	);
}

// Custom hook create
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
