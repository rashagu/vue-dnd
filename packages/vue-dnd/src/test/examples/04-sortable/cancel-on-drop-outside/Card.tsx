import {ItemTypes} from './ItemTypes'
import {CSSProperties, defineComponent} from "vue";
import {useDrag, useDrop} from "../../../../dnd";

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: string
  text: string
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
}

interface Item {
  id: string
  originalIndex: number
}

export const vuePropsType = {
  id: String,
  text: String,
  moveCard: Function,
  findCard: Function
}

const Card = defineComponent<CardProps>((props, {slots}) => {

  const {id, text, moveCard, findCard,} = props

  const originalIndex = findCard(id).index
  const [dragState, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: {id, originalIndex},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {id: droppedId, originalIndex} = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveCard],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({id: draggedId}: Item) {
        if (draggedId !== id) {
          const {index: overIndex} = findCard(id)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findCard, moveCard],
  )

  return () => {
    const {isDragging} = dragState.value
    const opacity = isDragging ? 0 : 1
    return (
      <div ref={(node) => drag(drop(node))} style={{...style, opacity}}>
        {text}
      </div>
    )
  }
})

Card.props = vuePropsType

export {
  Card
}
