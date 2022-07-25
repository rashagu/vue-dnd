
import { ItemTypes } from './ItemTypes'
import {CSSProperties, defineComponent} from "vue";
import {useDrop} from "../../../../dnd";

const style: CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

export interface DustbinProps {
	allowedDropEffect: string
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
	if (isActive) {
		return 'darkgreen'
	} else if (canDrop) {
		return 'darkkhaki'
	} else {
		return '#222'
	}
}



export const vuePropsType = {
	allowedDropEffect: String
}
const Dustbin = defineComponent<DustbinProps>((props, {slots}) => {
	const {allowedDropEffect} = props
	const [dropState, drop] = useDrop(
		() => ({
			accept: ItemTypes.BOX,
			drop: () => ({
				name: `${allowedDropEffect} Dustbin`,
				allowedDropEffect,
			}),
			collect: (monitor: any) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[allowedDropEffect],
	)

	return () => {
		const { canDrop, isOver } = dropState.value
		const isActive = canDrop && isOver
		const backgroundColor = selectBackgroundColor(isActive, canDrop)
		return (
			<div ref={drop} style={{ ...style, backgroundColor }}>
				{`Works with ${allowedDropEffect} drop effect`}
				<br />
				<br />
				{isActive ? 'Release to drop' : 'Drag a box here'}
			</div>
		)
	}
})

Dustbin.props = vuePropsType

export {
	Dustbin
}
