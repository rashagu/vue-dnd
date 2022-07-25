import {defineComponent, ref, h, Fragment, useSlots, withMemo,withCtx,RendererOptions} from 'vue'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider, useDrag} from "./dnd";
import Container from "./test/Container";
import Chessboard from './test/examples/00-chessboard'
import CopyOrMove from './test/examples/01-dustbin/copy-or-move'
import CancelOnDropOutside from './test/examples/04-sortable/cancel-on-drop-outside'
import DragSources from './test/examples/03-nesting/drag-sources'
import DropTargets from './test/examples/03-nesting/drop-targets'
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const App = defineComponent<ExampleProps>((props, {}) => {

  return (_ctx:any, _cache:any) => {
    console.log(_ctx)
    return (
      <DndProvider backend={HTML5Backend}>
        {/*<Container />*/}
        {/*<Chessboard />*/}
        {/*<CopyOrMove />*/}
        {/*<CancelOnDropOutside />*/}
        {/*<DragSources />*/}
        <DropTargets />
      </DndProvider>
    )
  }
})

App.props = vuePropsType

export default App

