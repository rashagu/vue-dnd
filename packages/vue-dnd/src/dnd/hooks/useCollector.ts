import equal from 'fast-deep-equal'

import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {computed, ComputedRef, Ref, ref, unref} from "vue";

/**
 *
 * @param monitor The monitor to collect state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
export function useCollector<T, S>(
  monitor: T,
  collect: (monitor: T) => S,
  onUpdate?: () => void,
): [ Ref<S>, ComputedRef<() => void>] {
  const collected = ref<S>(collect(monitor))

  function setCollected(val: any) {
    collected.value = val
  }

  const updateCollected = computed(() => {
    return () => {
      const nextValue = collect(monitor)
      // This needs to be a deep-equality check because some monitor-collected values
      // include XYCoord objects that may be equivalent, but do not have instance equality.
      // 这需要进行深度相等检查，因为一些监视器收集的值
      // 包括可能等效但不具有实例相等性的 XYCoord 对象。
      console.log(collected.value, nextValue,equal(collected.value, nextValue))
      if (!equal(collected.value, nextValue)) {
        setCollected(nextValue)
        if (onUpdate) {
          onUpdate()
        }
      }
    }
  })

  // update the collected properties after react renders.
  // Note that the "Dustbin Stress Test" fails if this is not
  // done when the component updates
  useIsomorphicLayoutEffect(updateCollected.value)

  return [collected as Ref<S>, updateCollected]
}
