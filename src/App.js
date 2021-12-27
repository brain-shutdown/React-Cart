import React from 'react';
import { useGlobalContext } from './context';

// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
// items

function App() {
	const { loading, error } = useGlobalContext();
	if (loading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}
	if (error) {
		return (
			<div className='loading'>
				<h1>Error...</h1>
			</div>
		);
	}
	return (
		<main>
			<Navbar />
			<CartContainer />
		</main>
	);
}

export default App;
