import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const DndProviderVue = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => (
    <div>
      DndProviderVue
    </div>
  )
})

DndProviderVue.props = vuePropsType

export default DndProviderVue

