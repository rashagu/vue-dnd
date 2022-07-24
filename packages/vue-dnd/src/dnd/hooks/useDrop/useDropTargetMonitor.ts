
import { DropTargetMonitorImpl } from '../../internals/index'
import type { DropTargetMonitor } from '../../types/index'
import { useDragDropManager } from '../useDragDropManager'
import {computed, ComputedRef} from "vue";

export function useDropTargetMonitor<O, R>():  ComputedRef<DropTargetMonitor<O, R>> {
	const manager = useDragDropManager().value.dragDropManager!
	return computed(() => new DropTargetMonitorImpl(manager ))
}
