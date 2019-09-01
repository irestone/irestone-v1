import { generateNav } from './admin.main/nav'

const panelElement = document.querySelector('.panel')

generateNav()
  .then((navElement) => panelElement.appendChild(navElement))
  .catch(console.error)
