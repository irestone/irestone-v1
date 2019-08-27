import { nav } from './admin/nav'

const panelElement = document.querySelector('.panel')

nav()
  .then((navElement) => panelElement.appendChild(navElement))
  .catch(console.error)
