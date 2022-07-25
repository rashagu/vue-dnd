

import { ItemTypes } from './ItemTypes'
import {CSSProperties, defineComponent, ref, useSlots} from "vue";
import {useDrop} from "../../../../dnd";

function getStyle(backgroundColor: string): CSSProperties {
	return {
		border: '1px solid rgba(0,0,0,0.2)',
		minHeight: '8rem',
		minWidth: '8rem',
		color: 'white',
		backgroundColor,
		padding: '2rem',
		paddingTop: '1rem',
		margin: '1rem',
		textAlign: 'center',
		float: 'left',
		fontSize: '1rem',
	}
}

export interface DustbinProps {
	greedy?: boolean
}

export interface DustbinState {
	hasDropped: boolean
	hasDroppedOnChild: boolean
}

export const vuePropsType = {
	name: String
}
const Dustbin = defineComponent<DustbinProps>((props) => {

	const { greedy } = props

	const hasDropped = ref(false)
	const hasDroppedOnChild = ref(false)

	const [dropState, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOX,
			drop(_item: unknown, monitor) {
				const didDrop = monitor.didDrop()
				if (didDrop && !greedy) {
					return
				}
				hasDropped.value = true
				hasDroppedOnChild.value = didDrop
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				isOverCurrent: monitor.isOver({ shallow: true }),
			}),
		}),
		[greedy, (val:boolean)=>hasDropped.value = val, (val:boolean)=>hasDroppedOnChild.value = val],
	)




	const slots = useSlots()
	return () => {
		const { isOver, isOverCurrent } = dropState.value
		const text = greedy ? 'greedy' : 'not greedy'
		let backgroundColor = 'rgba(0, 0, 0, .5)'

		if (isOverCurrent || (isOver && greedy)) {
			backgroundColor = 'darkgreen'
		}
		return (
			<div ref={drop} style={getStyle(backgroundColor)}>
				{text}
				<br />
				{hasDropped.value && <span>dropped {hasDroppedOnChild.value && ' on child'}</span>}
				<div>{slots.default?.()}</div>
			</div>
		)
	}
})

Dustbin.props = vuePropsType

export {
	Dustbin
}

