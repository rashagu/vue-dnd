import type { HandlerManager, MonitorEventEmitter } from '../types/index'
import { useCollector } from './useCollector'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import {Ref} from "vue";

export function useMonitorOutput<Monitor extends HandlerManager, Collected>(
	monitor: Monitor & MonitorEventEmitter,
	collect: (monitor: Monitor) => Collected,
	onCollect?: () => void,
): Ref<Collected> {
	const [collected, updateCollected] = useCollector(monitor, collect, onCollect)

	useIsomorphicLayoutEffect(
		function subscribeToMonitorStateChange() {
			const handlerId = monitor.getHandlerId()
			if (handlerId == null) {
				return
			}
			return monitor.subscribeToStateChange(updateCollected.value, {
				handlerIds: [handlerId],
			})
		}
	)

	return collected
}
