
import type { DragLayerMonitor } from '../types/index'
import { useCollector } from './useCollector'
import { useDragDropManager } from './useDragDropManager'
import {onMounted} from "vue";

/**
 * useDragLayer Hook
 * @param collector The property collector
 */
export function useDragLayer<CollectedProps, DragObject = any>(
	collect: (monitor: DragLayerMonitor<DragObject>) => CollectedProps,
): CollectedProps {
	const dragDropManager = useDragDropManager().value.dragDropManager!
	const monitor = dragDropManager.getMonitor()
	const [collected, updateCollected] = useCollector(monitor, collect)

	onMounted(() => monitor.subscribeToOffsetChange(updateCollected.value))
	onMounted(() => monitor.subscribeToStateChange(updateCollected.value))
	return collected.value()
}
