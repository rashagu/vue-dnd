
import type { ConnectDragPreview } from '../types/index'
import {onMounted} from "vue";

export interface DragPreviewImageProps {
	connect: ConnectDragPreview
	src: string
}
/**
 * A utility for rendering a drag preview image
 */
export const DragPreviewImage = ({ connect, src }:any)=> {
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

	return null
}
