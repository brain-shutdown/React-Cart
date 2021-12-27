export const reducer = (state, action) => {
	switch (action.type) {
		case 'EMPTY_CART':
			return {
				...state,
				cartItems: [],
			};
		case 'REMOVE_ITEM':
			const cart = state.cartItems.filter((item) => item.id !== action.payload);
			return {
				...state,
				cartItems: cart,
			};
		case 'TOGGLE_AMOUNT':
			const amountCart = state.cartItems
				.map((item) => {
					if (action.payload.id === item.id) {
						if (action.payload.type === 'INC') {
							return { ...item, amount: item.amount + 1 };
						}
						if (action.payload.type === 'DEC') {
							return { ...item, amount: item.amount - 1 };
						}
					}
					return item;
				})
				.filter((item) => item.amount !== 0);
			return {
				...state,
				cartItems: amountCart,
			};
		case 'UPDATE_TOTAL':
			let { total, amount } = state.cartItems.reduce(
				(cartTotal, cartItem) => {
					const { amount, price } = cartItem;
					cartTotal.total += amount * price;
					cartTotal.amount += amount;
					return cartTotal;
				},
				{
					total: 0,
					amount: 0,
				}
			);
			total = parseFloat(total.toFixed(2));
			return {
				...state,
				total,
				amount,
			};
		case 'LOADING':
			return {
				...state,
				loading: true,
				error: false,
				cartItems: [],
			};
		case 'ERROR':
			return {
				...state,
				error: true,
				loading: false,
				cartItems: [],
			};
		case 'FETCH_DATA':
			return {
				...state,
				cartItems: action.payload,
				loading: false,
				error: false,
			};
		default:
			throw new Error('No matching action type!');
	}
};

export default reducer;
