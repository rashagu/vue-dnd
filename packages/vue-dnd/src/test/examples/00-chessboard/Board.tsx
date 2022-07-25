
import { BoardSquare } from './BoardSquare'
import type { Game, Position } from './Game'
import { Piece } from './Piece'
import {CSSProperties, onMounted, ref, watchEffect} from "vue";

export interface BoardProps {
	game: Game
}

/** Styling properties applied to the board element */
const boardStyle: CSSProperties = {
	width: '100%',
	height: '100%',
	display: 'flex',
	flexWrap: 'wrap',
}
/** Styling properties applied to each square element */
const squareStyle: CSSProperties = { width: '12.5%', height: '12.5%' }

/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }:BoardProps) => {
	const knight = ref<Position>(
		game.knightPosition,
	)
	function setKnightPos(val:any) {
		knight.value = val
	}

	watchEffect(() => game.observe(setKnightPos))

	function renderSquare(i: number) {
		const x = i % 8
		const y = Math.floor(i / 8)

		const [knightX, knightY] = knight.value
		return (
			<div key={i} style={squareStyle}>
				<BoardSquare x={x} y={y} game={game}>
					<Piece isKnight={x === knightX && y === knightY} />
				</BoardSquare>
			</div>
		)
	}

	const squares = []
	for (let i = 0; i < 64; i += 1) {
		squares.push(renderSquare(i))
	}
	return <div style={boardStyle}>{squares}</div>
}
