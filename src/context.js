import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import useFetch from './useFetch';

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();
const initialValue = {
	error: false,
	loading: false,
	cartItems: [],
	total: 0,
	amount: 0,
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialValue);
	const { data, loading, error } = useFetch(url);

	function emptyCart() {
		dispatch({ type: 'EMPTY_CART' });
	}

	function removeItem(id) {
		dispatch({ type: 'REMOVE_ITEM', payload: id });
	}

	function toggleAmount(id, type) {
		dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } });
	}

	useEffect(() => {
		dispatch({ type: 'UPDATE_TOTAL' });
	}, [state.cartItems]);

	useEffect(() => {
		if (loading) {
			return dispatch({ type: 'LOADING' });
		} else if (error) {
			return dispatch({ type: 'ERROR' });
		} else if (data) {
			return dispatch({ type: 'FETCH_DATA', payload: data });
		}
	}, [loading, error, data]);

	return (
		<AppContext.Provider
			value={{
				...state,
				emptyCart,
				removeItem,
				toggleAmount,
			}}>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
