import { parseHTML } from '../../../utils/dom'

export const items = ({ items }) => {
  const itemsElement = parseHTML(`<div class='panel__drawer__items'></div>`)

  items.forEach(({ name, data: { posterURL, link = '#' } }) => {
    itemsElement.appendChild(
      parseHTML(`
        <div class='panel__drawer__item'>
          <div class='panel__drawer__item__poster'>
            <img src='${posterURL}' title='${name}'>
          </div>
          <a class='panel__drawer__item__link' href='${link}'>${name}</a>
        </div>
      `)
    )
  })

  return itemsElement
}
