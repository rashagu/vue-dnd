
import type { SourceConnector } from '../../internals/index'

export function useConnectDragSource(connector: SourceConnector) {
	return connector.hooks.dragSource()
}

export function useConnectDragPreview(connector: SourceConnector) {
	return connector.hooks.dragPreview()
}
