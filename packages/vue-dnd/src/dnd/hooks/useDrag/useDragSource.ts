

import type { Connector } from '../../internals/index'
import type { DragSourceMonitor } from '../../types/index'
import type { DragSourceHookSpec } from '../types'
import { DragSourceImpl } from './DragSourceImpl'
import {onMounted} from "vue";

export function useDragSource<O, R, P>(
	spec: DragSourceHookSpec<O, R, P>,
	monitor: DragSourceMonitor<O, R>,
	connector: Connector,
) {
	const handler = new DragSourceImpl(spec, monitor, connector)
	onMounted(() => {
		handler.spec = spec
	})
	return handler
}
