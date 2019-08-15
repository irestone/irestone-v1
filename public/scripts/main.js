import Highway from '@dogstudio/highway/src/highway'

import { AboutRenderer } from './AboutRenderer'
import { HomeRenderer } from './HomeRenderer'
import { DefaultTransition } from './DefaultTransition'

import { Drawer } from './panel/Drawer'

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

const drawers = Array.from(document.querySelectorAll('.panel__drawer')).map(
  (node) => new Drawer(node)
)

drawers.forEach((d) => d.render())

for (let i = 0, j = drawers.length - 1; i < drawers.length; i++, j--) {
  const node = drawers[i].node
  node.style.zIndex = j
}
