import React from 'react';

const generateGrid = (rows, columns, mapper) => {
	return Array(rows).fill().map(() => Array(columns).fill().map(mapper));
};

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

function App() {
	const grid = newTicTacToeGrid();
	console.log(grid);

	return (
		<div className="App">
			<div>Game</div>
		</div>
	);
}

export default App;
