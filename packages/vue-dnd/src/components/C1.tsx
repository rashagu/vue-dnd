import {defineComponent, ref, h, Fragment, useSlots} from 'vue'

interface ExampleProps {
  name?: string | number
}

export const vuePropsType = {
  name: [String, Number]
}
const C1 = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () => {
    console.log('c1')
    return (
      <div>
        C1
      </div>
    )
  }
})

C1.props = vuePropsType

export default C1

