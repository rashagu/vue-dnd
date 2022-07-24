import {defineComponent, ref, h, Fragment, useSlots} from 'vue'
import {useDrag} from "./dnd";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const CompBox = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return ()=>{
    return <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1}}>
      {/* The drag ref marks this node as being the "pick-up" node */}
      <div role="Handle" ref={drag}>qweqwe</div>
    </div>
  }


})

CompBox.props = vuePropsType

export default CompBox

