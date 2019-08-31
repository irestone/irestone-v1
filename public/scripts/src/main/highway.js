import Highway from '@dogstudio/highway/src/highway'

import { DefaultTransition } from './highway/DefaultTransition'

const hw = new Highway.Core({
  transitions: {
    default: DefaultTransition,
  },
})

console.log(hw.toString())
