import type { ConnectDropTarget } from '../../types/index'
import type { DropTargetHookSpec, FactoryOrInstance } from '../types'
import { useCollectedProps } from '../useCollectedProps'
import { useOptionalFactory } from '../useOptionalFactory'
import { useConnectDropTarget } from './connectors'
import { useDropTargetConnector } from './useDropTargetConnector'
import { useDropTargetMonitor } from './useDropTargetMonitor'
import { useRegisteredDropTarget } from './useRegisteredDropTarget'
import {Ref} from "vue";

/**
 * useDropTarget Hook
 * @param specArg
 * @param deps The memoization deps array to use when evaluating spec changes
 */
export function useDrop<
	DragObject = unknown,
	DropResult = unknown,
	CollectedProps = unknown,
>(
	specArg: FactoryOrInstance<
		DropTargetHookSpec<DragObject, DropResult, CollectedProps>
	>,
	deps?: unknown[],
): [Ref<CollectedProps>, any] {
	const spec = useOptionalFactory(specArg, deps)
	const monitor = useDropTargetMonitor<DragObject, DropResult>()
	const connector = useDropTargetConnector(spec.options)
	useRegisteredDropTarget(spec, monitor.value, connector)



	console.log(spec.collect, monitor.value)
	return [
		useCollectedProps(spec.collect, monitor.value, connector),
		useConnectDropTarget(connector),
	]
}
