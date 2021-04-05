import React, { useReducer } from 'react';
import { FaReact } from 'react-icons/fa';

const generateGrid = (rows, columns, mapper) => {
	return Array(rows).fill().map(() => Array(columns).fill().map(mapper));
};

const newTicTacToeGrid = () => generateGrid(3, 3, () => null);

function checkThree(a, b, c) {
	if (!a || !b || !c) return false;
	return a === b && b === c;
}

const flatten = (arr) => arr.reduce((acc, cur) => [ ...acc, ...cur ], []);

function checkForWin(flatGrid) {
	const [ nw, n, ne, w, c, e, sw, s, se ] = flatGrid;

	return (
		checkThree(nw, n, ne) ||
		checkThree(w, c, e) ||
		checkThree(sw, s, se) ||
		checkThree(nw, w, sw) ||
		checkThree(n, c, s) ||
		checkThree(ne, e, se) ||
		checkThree(nw, c, se) ||
		checkThree(ne, c, sw)
	);
}

function checkForDraw(flatGrid) {
	return !checkForWin(flatGrid) && flatGrid.filter(Boolean).length === flatGrid.length;
}

const NEXT_TURN = {
	O: 'X',
	X: 'O'
};

const clone = (x) => JSON.parse(JSON.stringify(x));

const getInitialState = () => ({
	grid: newTicTacToeGrid(),
	turn: 'X',
	status: 'in progress'
});

const reducer = (state, action) => {
	if (state.status === 'success' && action.type !== 'RESET') {
		return state;
	}

	switch (action.type) {
		case 'RESET': {
			return getInitialState();
		}
		case 'CLICK': {
			const { x, y } = action.payload;
			const { grid, turn } = state;

			if (grid[y][x]) {
				return state;
			}

			const nextState = clone(state);

			nextState.grid[y][x] = turn;

			const flatGrid = flatten(nextState.grid);

			if (checkForWin(flatGrid)) {
				nextState.status = 'success';
				return nextState;
			}

			if (checkForDraw(flatGrid)) {
				return getInitialState();
			}

			nextState.turn = NEXT_TURN[turn];

			return nextState;
		}

		default:
			return state;
	}
};

function Grid({ handleClick, grid }) {
	return (
		<div style={{ display: 'inline-block' }}>
			<div
				style={{
					backgroundColor: '#444',
					display: 'grid',
					gridTemplateRows: `repeat(${grid.length}, 1fr)`,
					gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
					gridGap: 2,
					border: '2px solid black'
				}}
			>
				{grid.map((row, rowIdx) =>
					row.map((value, colIdx) => (
						<Cell
							key={`${colIdx} - ${rowIdx}`}
							value={value}
							onClick={() => {
								handleClick(colIdx, rowIdx);
							}}
						/>
					))
				)}
			</div>
		</div>
	);
}

function Cell({ onClick, value }) {
	return (
		<div style={{ backgroundColor: '#fff', width: 150, height: 150 }}>
			<button
				type="button"
				style={{
					width: '150px',
					height: '150px',
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer'
				}}
				onClick={onClick}
			>
				<span style={{ fontWeight: '700', fontSize: '48px' }}>{value}</span>
			</button>
		</div>
	);
}

function App() {
	const [ state, dispatch ] = useReducer(reducer, getInitialState());
	const { grid, status, turn } = state;

	const handleClick = (x, y) => {
		dispatch({ type: 'CLICK', payload: { x, y } });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<div style={{ display: 'inline-block', textAlign: 'center' }}>
				<FaReact style={{ width: '64px', height: '64px' }} />
				<h1 style={{ fontSize: '48px' }}>React Tic Tac Toe</h1>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						Next turn: <strong>{turn}</strong>
					</div>
					<div>
						<strong>{status === 'success' ? `${turn} won! 🎉` : null}</strong>
					</div>
					<button
						type="button"
						onClick={reset}
						style={{
							border: 'none',
							backgroundColor: 'black',
							color: 'white',
							fontSize: '18px',
							cursor: 'pointer'
						}}
					>
						Reset
					</button>
				</div>
				<Grid grid={grid} handleClick={handleClick} />
				<p>* The game automatically restarts in case of a draw.</p>
			</div>
		</div>
	);
}

export default App;
