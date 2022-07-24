

import { TargetConnector } from '../../internals/index'
import type { DropTargetOptions } from '../../types/index'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'
import {computed} from "vue";

export function useDropTargetConnector(
	options: DropTargetOptions,
): TargetConnector {
	const manager = useDragDropManager().value.dragDropManager!
	const connector = computed(
		() => new TargetConnector(manager.getBackend()),
	)
	useIsomorphicLayoutEffect(() => {
		connector.value.dropTargetOptions = options || null
		connector.value.reconnect()
		return () => connector.value.disconnectDropTarget()
	})
	return connector.value
}
