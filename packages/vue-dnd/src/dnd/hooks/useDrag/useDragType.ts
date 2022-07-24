import { invariant } from '@react-dnd/invariant'
import type { Identifier } from 'dnd-core'

import type { DragSourceHookSpec } from '../types'
import {computed} from "vue";

export function useDragType(
	spec: DragSourceHookSpec<any, any, any>,
): Identifier {
	return computed(() => {
		const result: Identifier = spec.type
		invariant(result != null, 'spec.type must be defined')
		return result
	}).value
}
