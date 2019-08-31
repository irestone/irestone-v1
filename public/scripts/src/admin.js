import { generateNav } from './admin/nav'

const panelElement = document.querySelector('.panel')

generateNav()
  .then((navElement) => panelElement.appendChild(navElement))
  .catch(console.error)
