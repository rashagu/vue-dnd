import {defineComponent, ref, h, Fragment, useSlots, inject} from 'vue'
import {DndContextType} from "../core";

interface ExampleProps {
}

export const vuePropsType = {
}
const DndContextConsumer = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const config = inject('DndContext', ref<DndContextType>({dragDropManager: undefined}))
  return ()=>slots.default?slots.default(config):null
})

DndContextConsumer.props = vuePropsType

export default DndContextConsumer

