
import {defineComponent, provide, ref} from "vue";
import {DndContextType} from "../core";



const DndContextProvider = defineComponent<{value:any}>((props, {slots}) => {
    //console.log(props)
    const DndContext = ref<DndContextType>(props.value || {});

    provide('DndContext', DndContext)
    return ()=>slots.default?slots.default(DndContext.value):null
})
DndContextProvider.props = {
    value:Object
}
export default DndContextProvider;
