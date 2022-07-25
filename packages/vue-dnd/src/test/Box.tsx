import {defineComponent, ref, h, Fragment, useSlots, CSSProperties} from 'vue'
import {ItemTypes} from "./ItemTypes";
import {useDrag} from "../dnd";


const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export interface BoxProps {
  name: string
}

interface DropResult {
  name: string
}

export const vuePropsType = {
  name: String
}
const Box = defineComponent<BoxProps>((props, {}) => {
  const slots = useSlots()
  const {name} = props

  const [dragState, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {name},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => {
      // console.log(monitor)
      return ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      })
    },
  }))
  return () => {
    const {isDragging} = dragState.value
    const opacity = isDragging ? 0.4 : 1
    return <div ref={drag} style={{...style, opacity}} data-testid={`box`}>
      {name}
    </div>
  }
})

Box.props = vuePropsType

export default Box

