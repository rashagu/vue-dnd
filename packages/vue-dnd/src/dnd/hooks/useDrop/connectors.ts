
import type { TargetConnector } from '../../internals/index'
import {computed} from "vue";

export function useConnectDropTarget(connector: TargetConnector) {
	return computed(() => {
		//console.log(connector.hooks.dropTarget())
		return connector.hooks.dropTarget()
	}).value
}
