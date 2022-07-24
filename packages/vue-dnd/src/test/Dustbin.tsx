import {defineComponent, ref, h, Fragment, useSlots, CSSProperties} from 'vue'

import {ItemTypes} from './ItemTypes'
import {useDrop} from "../dnd";

const style: CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Dustbin = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()
  const [obj, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({name: 'Dustbin'}),
    collect: (monitor) => {
      console.log(monitor)
      return ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
    },
  }))


  return () => {
    const {canDrop, isOver} = obj.value
    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }

    return (
      <div ref={drop} style={{...style, backgroundColor}} data-testid="dustbin">
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    )
  }
})

Dustbin.props = vuePropsType

export default Dustbin

