import { invariant } from '@react-dnd/invariant'
import type { DragDropManager } from 'dnd-core'

import {DndContextType} from '../core/index'
import {inject, Ref, ref} from "vue";

/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager(): Ref<DndContextType> {
	const DndContext = inject('DndContext', ref<DndContextType>({dragDropManager: undefined}))
	// invariant(dragDropManager != null, 'Expected drag drop context')
	return DndContext
}
