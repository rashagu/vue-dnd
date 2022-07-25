import {defineComponent, ref, h, Fragment} from 'vue'

interface TempProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const Temp = defineComponent<TempProps>((props, {slots}) => {


  return () => (
    <div>
      Temp
    </div>
  )
})

Temp.props = vuePropsType

export default Temp

