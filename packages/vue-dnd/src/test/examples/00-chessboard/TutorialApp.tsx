
import { Board } from './Board'
import { Game } from './Game'
import {CSSProperties} from "vue";

export interface ChessboardTutorialAppState {
	knightPosition: [number, number]
}

const containerStyle: CSSProperties = {
	width: '500px',
	height: '500px',
	border: '1px solid gray',
}

/**
 * The Chessboard Tutorial Application
 */
export const TutorialApp = () => {
	const game = new Game()

	return (
		<div style={containerStyle}>
			<Board game={game} />
		</div>
	)
}
