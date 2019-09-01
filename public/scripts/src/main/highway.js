import Highway from '@dogstudio/highway/src/highway'

import { DefaultTransition } from './highway/DefaultTransition'
import { DefaultRenderer } from './highway/DefaultRenderer'

const hw = new Highway.Core({
  transitions: {
    default: DefaultTransition,
  },
  renderers: {
    default: DefaultRenderer,
  },
})

console.log(hw.toString())
