import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import {useDrag} from "./dnd";

interface ExampleProps {
  name?: string
}
const style: any = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
export const vuePropsType = {
  name: String
}
const Comp1 = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'card',
      item: { text:'text' },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return () => (
    <div ref={dragRef} style={{ ...style, opacity }} data-testid={`box`}>
      {'text'}
    </div>
  )
})

Comp1.props = vuePropsType

export default Comp1

