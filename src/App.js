import React from 'react';

const generateGrid = (rows, columns, mapper) => {
	return Array(rows).fill().map(() => Array(columns).fill().map(mapper));
};

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

function Grid({ grid }) {
	return (
		<div style={{ display: 'inline-block' }}>
			<div
				style={{
					backgroundColor: '#444',
					display: 'grid',
					gridTemplateRows: `repeat(${grid.length}, 1fr)`,
					gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
					gridGap: 2
				}}
			>
				{grid.map((row, rowIdx) =>
					row.map((value, colIdx) => <Cell key={`${colIdx} - ${rowIdx}`} value={value} />)
				)}
			</div>
		</div>
	);
}

function Cell({ value }) {
	return <div style={{ backgroundColor: '#fff', width: 100, height: 100 }} />;
}

function App() {
	const grid = newTicTacToeGrid();

	return (
		<div className="App">
			<div>Game</div>
			<Grid grid={grid} />
		</div>
	);
}

export default App;
