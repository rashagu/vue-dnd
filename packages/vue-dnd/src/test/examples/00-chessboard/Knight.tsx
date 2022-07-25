
import { ItemTypes } from './ItemTypes'
import { knightImage } from './knightImage'
import {useDrag, DragPreviewImage} from "../../../dnd";
import {CSSProperties, defineComponent} from "vue";

const knightStyle: CSSProperties = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}

interface TempProps {
	name?: string
}

export const vuePropsType = {
	name: String
}
const Knight = defineComponent<TempProps>((props) => {

	const [dragObj, drag, preview] = useDrag(
		() => ({
			type: ItemTypes.KNIGHT,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[],
	)
	return () => {
		const { isDragging } = dragObj.value
		console.error(isDragging)
		return (
			<>
				<DragPreviewImage connect={preview} src={knightImage} />
				<div
					ref={drag}
					style={{
						...knightStyle,
						opacity: isDragging ? 0.5 : 1,
					}}
				>
					♘
				</div>
			</>
		)
	}
})

Knight.props = vuePropsType

export {
	Knight
}
