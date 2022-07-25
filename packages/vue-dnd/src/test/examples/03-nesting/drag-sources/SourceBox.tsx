import {Colors} from './Colors'
import {computed, CSSProperties, defineComponent, ref, useSlots} from "vue";
import {DragSourceMonitor, useDrag} from "../../../../dnd";

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  color: string
  onToggleForbidDrag?: () => void
}

export const vuePropsType = {
  color: String,
  onToggleForbidDrag: Function
}
const SourceBox = defineComponent<SourceBoxProps>((props) => {
  const {color,} = props

  const forbidDrag = ref(false)

  const [dragState, drag] = useDrag(
    () => ({
      type: color,
      canDrag: !forbidDrag.value,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag.value, color],
  )


  const onToggleForbidDrag = () => {
    forbidDrag.value = !forbidDrag.value
  }


  const backgroundColor = computed(() => {
    switch (color) {
      case Colors.YELLOW:
        return 'lightgoldenrodyellow'
      case Colors.BLUE:
        return 'lightblue'
      default:
        return 'lightgoldenrodyellow'
    }
  })

  const containerStyle = computed<CSSProperties>(() => {
      const {isDragging} = dragState.value
      return {
        ...style,
        backgroundColor: backgroundColor.value,
        opacity: isDragging ? 0.4 : 1,
        cursor: forbidDrag.value ? 'default' : 'move',
      }
    }
  )
  const slots = useSlots()
  return () => {
    return (
      <div ref={drag} style={containerStyle.value} role="sourceBox" data-color={color}>
        <input
          type="checkbox"
          checked={forbidDrag.value}
          onChange={onToggleForbidDrag}
        />
        <small>Forbid drag</small>
        {slots.default?.()}
      </div>
    )
  }
})

SourceBox.props = vuePropsType

export {
  SourceBox
}
