
import { DragSourceMonitorImpl } from '../../internals/index'
import type { DragSourceMonitor } from '../../types/index'
import { useDragDropManager } from '../useDragDropManager'
import {withMemo} from "vue";

export function useDragSourceMonitor<O, R>(): DragSourceMonitor<O, R> {
	const manager = useDragDropManager().value.dragDropManager!
	//console.log(manager)
	return new DragSourceMonitorImpl(manager)
}
