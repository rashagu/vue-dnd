
import { ItemTypes } from './ItemTypes'
import {defineComponent} from "vue";
import {useDrag} from "../../../../dnd";

const style = {
	display: 'inline-block',
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	backgroundColor: 'white',
	cursor: 'move',
}

interface TempProps {
	name?: string
}

export const vuePropsType = {
	name: String
}
const Box = defineComponent<TempProps>((props, {slots}) => {
	const [, drag] = useDrag(() => ({ type: ItemTypes.BOX }))


	return () => {
		return (
			<div ref={drag} style={style}>
				Drag me
			</div>
		)
	}
})

Box.props = vuePropsType

export {
	Box
}
