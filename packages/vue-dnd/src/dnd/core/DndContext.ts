import type { DragDropManager } from 'dnd-core'

import DndContextProvider from "../CreateContextVueVNode/DndContextProvider";

/**
 * The React context type
 */
export interface DndContextType {
	dragDropManager: DragDropManager | undefined
}

/**
 * Create the React Context
 */
export const DndContext = {
	Provider: DndContextProvider
}
