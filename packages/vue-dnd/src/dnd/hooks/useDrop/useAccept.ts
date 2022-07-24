import { invariant } from '@react-dnd/invariant'
import type { Identifier } from 'dnd-core'

import type { DropTargetHookSpec } from '../types'
import {computed} from "vue";

/**
 * Internal utility hook to get an array-version of spec.accept.
 * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
 * @param spec
 */
export function useAccept<O, R, P>(
	spec: DropTargetHookSpec<O, R, P>,
): Identifier[] {
	const { accept } = spec
	return computed(() => {
		invariant(spec.accept != null, 'accept must be defined')
		return Array.isArray(accept) ? accept : [accept]
	}).value
}
