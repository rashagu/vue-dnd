import {useSlots} from "vue";

export interface SquareProps {
	black: boolean
}

const squareStyle = {
	width: '100%',
	height: '100%',
}

export const Square = ({ black }:SquareProps) => {
	const backgroundColor = black ? 'black' : 'white'
	const color = black ? 'white' : 'black'

	const slots = useSlots()
	return (
		<div
			style={{
				...squareStyle,
				color,
				backgroundColor,
			}}
		>
			{slots.default?.()}
		</div>
	)
}
