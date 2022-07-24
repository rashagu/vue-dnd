
import type { DropTargetMonitor } from '../../types/index'
import type { DropTargetHookSpec } from '../types'
import { DropTargetImpl } from './DropTargetImpl'
import {computed, onMounted} from "vue";

export function useDropTarget<O, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
	monitor: DropTargetMonitor<O, R>,
) {
	const dropTarget = computed(() => new DropTargetImpl(spec, monitor))
	onMounted(() => {
		dropTarget.value.spec = spec
	})
	return dropTarget.value
}
