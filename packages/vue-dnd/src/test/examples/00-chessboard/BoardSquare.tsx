import type {Game} from './Game'
import {ItemTypes} from './ItemTypes'
import {Overlay, OverlayType} from './Overlay'
import {Square} from './Square'
import {useDrop} from "../../../dnd";
import {defineComponent, useSlots} from "vue";

export interface BoardSquareProps {
  x: number
  y: number
  game: Game
}

export const vuePropsType = {
  x: Number,
  y: Number,
  game: Object,
}

const BoardSquare = defineComponent<BoardSquareProps>(({ x, y, game, }) => {

  const [obj, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => game.canMoveKnight(x, y),
      drop: () => game.moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [game],
  )
  const black = (x + y) % 2 === 1


  const slots = useSlots()
  return () => {
    const {isOver, canDrop} = obj.value
    return (
      <div
        ref={drop}
        role="Space"
        data-testid={`(${x},${y})`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Square black={black}>{slots.default?.()}</Square>
        {isOver && !canDrop && <Overlay type={OverlayType.IllegalMoveHover}/>}
        {!isOver && canDrop && <Overlay type={OverlayType.PossibleMove}/>}
        {isOver && canDrop && <Overlay type={OverlayType.LegalMoveHover}/>}
      </div>
    )
  }
})

BoardSquare.props = vuePropsType

export {
  BoardSquare
}
