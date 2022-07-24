

import type { FactoryOrInstance } from './types'

export function useOptionalFactory<T>(
	arg: FactoryOrInstance<T>,
	deps?: unknown[],
): T {
	const memoDeps = [...(deps || [])]
	if (deps == null && typeof arg !== 'function') {
		memoDeps.push(arg)
	}
	return typeof arg === 'function' ? (arg as () => T)() : (arg as T)
}