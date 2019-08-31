import { parseHTML } from '../../../utils/dom'

import { header } from './layout.view/header.view'

export const layout = (data, handlers) => {
  const innerElement = parseHTML(`
    <div class='panel__drawer__inner'>
      <div class='panel__drawer__content-holder'>
        <div class='panel__drawer__content'>
          <div class='panel__drawer__body'></div>
        </div>
      </div>
      <div class='panel__drawer__handle'>
        <div class='panel__drawer__handle__label'>${data.category.name}</div>
      </div>
    </div>
  `)

  innerElement
    .querySelector('.panel__drawer__content')
    .insertAdjacentElement('afterbegin', header(data, handlers))

  innerElement
    .querySelector('.panel__drawer__handle')
    .addEventListener('click', handlers.handleOpenDrawer.bind(null))

  return innerElement
}
