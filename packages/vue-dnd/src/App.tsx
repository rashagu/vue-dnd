import {defineComponent, ref, h, Fragment, useSlots, withMemo,withCtx,RendererOptions} from 'vue'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider, useDrag} from "./dnd";
import Container from "./test/Container";

interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const App = defineComponent<ExampleProps>((props, {}) => {
  const slots = useSlots()



  return (_ctx:any, _cache:any) => {
    console.log(_ctx)
    return (
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    )
  }
})

App.props = vuePropsType

export default App

