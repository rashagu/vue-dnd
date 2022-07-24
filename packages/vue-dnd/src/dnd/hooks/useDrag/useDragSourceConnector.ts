
import { SourceConnector } from '../../internals/index'
import type {
	DragPreviewOptions,
	DragSourceOptions,
} from '../../types/index'
import { useDragDropManager } from '../useDragDropManager'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

export function useDragSourceConnector(
	dragSourceOptions: DragSourceOptions | undefined,
	dragPreviewOptions: DragPreviewOptions | undefined,
): SourceConnector {
	const manager = useDragDropManager().value.dragDropManager!
	const connector = new SourceConnector(manager.getBackend())
	useIsomorphicLayoutEffect(() => {
		connector.dragSourceOptions = dragSourceOptions || null
		connector.reconnect()
		return () => connector.disconnectDragSource()
	})
	useIsomorphicLayoutEffect(() => {
		connector.dragPreviewOptions = dragPreviewOptions || null
		connector.reconnect()
		return () => connector.disconnectDragPreview()
	})
	return connector
}
