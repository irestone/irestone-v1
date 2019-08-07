import Highway from '@dogstudio/highway/src/highway'

import { AboutRenderer } from './AboutRenderer'
import { HomeRenderer } from './HomeRenderer'
import { DefaultTransition } from './DefaultTransition'

const hw = new Highway.Core({
  renderers: {
    about: AboutRenderer,
    home: HomeRenderer,
  },
  transitions: {
    default: DefaultTransition,
  },
})

console.log(`${hw}`)
