
import type { ConnectDragPreview } from '../types/index'
import {defineComponent, onMounted} from "vue";

export interface DragPreviewImageProps {
	connect: ConnectDragPreview
	src: string
}
export const vuePropsType = {
	connect: [Object, Function],
	src: String
}
/**
 * A utility for rendering a drag preview image
 */
const DragPreviewImage = defineComponent<DragPreviewImageProps>((props) => {
	const { connect, src } = props
	onMounted(() => {
		if (typeof Image === 'undefined') return

		let connected = false
		const img = new Image()
		img.src = src
		img.onload = () => {
			connect(img)
			connected = true
		}
		return () => {
			if (connected) {
				connect(null)
			}
		}
	})

	return () => null
})

DragPreviewImage.props = vuePropsType

export {
	DragPreviewImage
}
