import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import {useDrop} from "./dnd";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Comp2 = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return ()=>(
    <div
      ref={drop}
      role={'Dustbin'}
      style={{ backgroundColor: isOver ? 'red' : 'white' }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
})

Comp2.props = vuePropsType

export default Comp2

