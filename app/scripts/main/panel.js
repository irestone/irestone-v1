import { Drawer } from './panel/Drawer'

const drawerElements = document.querySelectorAll('.panel__drawer')
const drawers = Array.from(drawerElements).map((node) => new Drawer(node))
drawers.forEach((drawer) => drawer.render())

for (let i = 0, j = drawers.length - 1; i < drawers.length; i++, j--) {
  drawers[i].node.style.zIndex = j
}
