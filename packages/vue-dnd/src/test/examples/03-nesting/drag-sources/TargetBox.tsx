import {Colors} from './Colors'
import type {DragItem} from './interfaces'
import {CSSProperties, defineComponent, ref} from "vue";
import {DropTargetMonitor, useDrop} from "../../../../dnd";

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

export interface TargetBoxProps {
  onDrop: (item: any) => void
  lastDroppedColor?: string
}

export const vuePropsType = {
  onDrop: Function,
  lastDroppedColor: String
}

const TargetBox = defineComponent<TargetBoxProps>((props) => {
  const {
    onDrop,
    lastDroppedColor,
  } = props
  const [dropState, drop] = useDrop(
    () => ({
      accept: [Colors.YELLOW, Colors.BLUE],
      drop(_item: DragItem, monitor) {
        onDrop(monitor.getItemType())
        return undefined
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    [onDrop],
  )


  return () => {
    const {isOver, draggingColor, canDrop} = dropState.value
    const opacity = isOver ? 1 : 0.7
    let backgroundColor = '#fff'
    switch (draggingColor) {
      case Colors.BLUE:
        backgroundColor = 'lightblue'
        break
      case Colors.YELLOW:
        backgroundColor = 'lightgoldenrodyellow'
        break
      default:
        break
    }
    return (
      <div
        ref={drop}
        data-color={lastDroppedColor || 'none'}
        style={{...style, backgroundColor, opacity}}
        role="TargetBox"
      >
        <p>Drop here.</p>

        {!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
      </div>
    )
  }
})

TargetBox.props = vuePropsType

export {
  TargetBox
}

export interface StatefulTargetBoxState {
  lastDroppedColor: string | null
}


export const StatefulTargetBox = (props: any) => {
  const lastDroppedColor = ref<string | null>(null)
  const handleDrop = (color: string) => lastDroppedColor.value = color

  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor.value as string}
      onDrop={handleDrop}
    />
  )
}
