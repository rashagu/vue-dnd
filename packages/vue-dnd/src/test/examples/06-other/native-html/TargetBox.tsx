import { NativeTypes } from 'react-dnd-html5-backend'
import {CSSProperties, defineComponent} from "vue";
import {useDrop} from "../../../../dnd";

const style: CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

export interface TargetBoxProps {
	onDrop: (arg: { html: any }) => void
}

export const vuePropsType = {
	onDrop: Function
}

const TargetBox = defineComponent<TargetBoxProps>((props) => {
	const { onDrop } = props
	const [dropState, drop] = useDrop(
		() => ({
			accept: [NativeTypes.HTML],
			drop(item: { html: any }) {
				if (onDrop) {
					onDrop(item)
				}
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[props],
	)

	return () => {
		const { canDrop, isOver } = dropState.value
		const isActive = canDrop && isOver
		return (
			<div ref={drop} style={style}>
				{isActive ? 'Release to drop' : 'Drag HTML here'}
			</div>
		)
	}
})

TargetBox.props = vuePropsType

export {
	TargetBox
}
