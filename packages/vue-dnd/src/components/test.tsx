/* Analyzed bindings: {
  "ref": "setup-const",
  "Comp": "setup-const",
  "msg": "setup-ref",
  "a": "setup-ref",
  "b": "setup-ref"
} */
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createVNode as _createVNode, withMemo as _withMemo, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

import { ref } from 'vue'
import Comp from './Comp.vue'


const __sfc__ = {
  __name: 'App',
  setup(__props) {

    const msg = ref('Hello World!')
    const a = ref('Hello World!')
    const b = ref('Hello World!')

    return (_ctx, _cache) => {
      return (_openBlock(), _createElementBlock("div", null, [
        _createElementVNode("h1", {
          onClick: _cache[0] || (_cache[0] = $event => (b.value = 'asd'))
        }, _toDisplayString(msg.value), 1 /* TEXT */),
        _withMemo([b.value], () => _createVNode(Comp, { name: b.value }, null, 8 /* PROPS */, ["name"]), _cache, 1)
      ]))
    }
  }

}
__sfc__.__file = "App.vue"
export default __sfc__
