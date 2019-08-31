import { parseHTML } from '../../../../utils/dom'

export const header = (
  { category, topics, tags },
  { handleToggleDrawerSize, handleCloseDrawer, handleToggleTab }
) => {
  const headerElement = parseHTML(`
    <div class='panel__drawer__header'>
      <div class='panel__drawer__title'>${category.name}</div>
      <div class='panel__drawer__close-drawer'>_</div>
    </div>
  `)

  // Insert tabs and tags after title

  headerElement
    .querySelector('.panel__drawer__title')
    .insertAdjacentElement('afterend', createTabs(topics, handleToggleTab))

  headerElement
    .querySelector('.panel__drawer__tabs')
    .insertAdjacentElement('afterend', createTags(tags))

  // Listen events

  headerElement
    .querySelector('.panel__drawer__title')
    .addEventListener('click', handleToggleDrawerSize.bind(null))

  headerElement
    .querySelector('.panel__drawer__close-drawer')
    .addEventListener('click', handleCloseDrawer.bind(null))

  return headerElement
}

// =====================================
//  SUB-ELEMENTS
// =====================================

const createTabs = (topics, handleToggleTab) => {
  const tabsElement = parseHTML(`<div class='panel__drawer__tabs'></div>`)

  topics.forEach((topic) => {
    const { slug, name } = topic
    const tabElement = parseHTML(`
      <div class='panel__drawer__tab' data-topic='${slug}'>${name}</div>
    `)
    tabElement.addEventListener('click', handleToggleTab.bind(null, topic))
    tabsElement.appendChild(tabElement)
  })

  return tabsElement
}

const createTags = (tags) => {
  const tagsElement = parseHTML(`<div class='panel__drawer__tags'></div>`)

  tags.forEach(({ name }) => {
    const tagElement = parseHTML(`
      <div class='panel__drawer__tag'>${name}</div>
    `)
    tagsElement.appendChild(tagElement)
  })

  return tagsElement
}
