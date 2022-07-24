import {VNode} from "vue";
import type { DragPreviewOptions, DragSourceOptions } from './options'

export type ConnectableElement = any | VNode | Element | null

export type DragElementWrapper<Options> = (
	elementOrNode: ConnectableElement,
	options?: Options,
) => VNode | null

export type ConnectDragSource = DragElementWrapper<DragSourceOptions>
export type ConnectDropTarget = DragElementWrapper<any>
export type ConnectDragPreview = DragElementWrapper<DragPreviewOptions>
