import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import Box from './Box'
import Dustbin from './Dustbin'

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Container = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  return () =>  (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  )
})

Container.props = vuePropsType

export default Container

