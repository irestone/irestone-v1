export class Drawer {
  constructor(node) {
    this.node = node
  }

  setMode(mode) {
    this.mode = mode
    this.node.dataset.mode = mode
    if (mode !== 'closed' && !this.items) this.setActiveTab(this.topics[0])
  }

  setActiveTab(topic) {
    if (this.activeTab) {
      this.node
        .querySelector(`.panel__drawer__tab[data-topic='${this.activeTab}']`)
        .classList.remove('--active')
    }
    this.activeTab = topic.slug
    this.node
      .querySelector(`.panel__drawer__tab[data-topic='${this.activeTab}']`)
      .classList.add('--active')
    this.renderItems(topic)
  }

  async fetchMetaData() {
    this.category = await fetch(
      `/api/categories/${this.node.dataset.category}?slug=true`
    )
      .then((res) => res.json())
      .then((json) => json.data)

    this.topics = await fetch(`/api/topics?category=${this.category._id}`)
      .then((res) => res.json())
      .then((json) => json.data)

    this.tags = await fetch(`/api/tags?category=${this.category._id}`)
      .then((res) => res.json())
      .then((json) => json.data)
  }

  async fetchItems(topic = this.topics[0]) {
    if (!this.items) this.items = {}
    if (!this.items[topic.slug]) {
      this.items[topic.slug] = await fetch(
        `/api/${this.category.slug}?topic=${topic._id}`
      )
        .then((res) => res.json())
        .then((json) => json.data)
    }
    return this.items[topic.slug]
  }

  generateLayout() {
    const drawerInner = document.createElement('div')
    drawerInner.classList.add('panel__drawer__inner')

    const contentHolder = document.createElement('div')
    contentHolder.classList.add('panel__drawer__content-holder')
    const content = document.createElement('div')
    content.classList.add('panel__drawer__content')
    const header = this.generateHeader()
    const body = document.createElement('div')
    body.classList.add('panel__drawer__body')

    const handle = this.generateHandle()

    drawerInner.appendChild(contentHolder)
    contentHolder.appendChild(content)
    content.appendChild(header)
    content.appendChild(body)
    drawerInner.appendChild(handle)

    return drawerInner
  }

  generateHeader() {
    const header = document.createElement('div')
    header.classList.add('panel__drawer__header')

    const title = document.createElement('div')
    title.classList.add('panel__drawer__title')
    title.innerText = this.category.name
    header.appendChild(title)

    const tabs = document.createElement('div')
    tabs.classList.add('panel__drawer__tabs')
    this.topics.forEach((topic) => {
      const tab = document.createElement('div')
      tab.classList.add('panel__drawer__tab')
      tab.innerText = topic.name
      tab.dataset.topic = topic.slug
      tab.addEventListener('click', this.setActiveTab.bind(this, topic))
      tabs.appendChild(tab)
    })
    header.appendChild(tabs)

    const tags = document.createElement('div')
    tags.classList.add('panel__drawer__tags')
    this.tags.forEach(({ name }) => {
      const tag = document.createElement('div')
      tag.classList.add('panel__drawer__tag')
      tag.innerText = name
      tags.appendChild(tag)
    })
    header.appendChild(tags)

    const close = document.createElement('div')
    close.classList.add('panel__drawer__close-drawer')
    close.innerText = '_'
    close.addEventListener('click', this.setMode.bind(this, 'closed'))
    header.appendChild(close)

    header.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('panel__drawer__tab') ||
        e.target.classList.contains('panel__drawer__tag') ||
        e.target.classList.contains('panel__drawer__close-drawer')
      )
        return
      this.setMode(this.mode === 'opened' ? 'ajar' : 'opened')
    })

    return header
  }

  generateHandle() {
    const handle = document.createElement('div')
    handle.classList.add('panel__drawer__handle')
    const handleLabel = document.createElement('div')
    handleLabel.classList.add('panel__drawer__handle__label')
    handleLabel.innerText = this.category.name
    handle.appendChild(handleLabel)
    handle.addEventListener('click', this.setMode.bind(this, 'ajar'))
    return handle
  }

  generateItem(item) {
    const itemElement = document.createElement('div')
    itemElement.classList.add('panel__drawer__item')

    const posterElement = document.createElement('div')
    posterElement.classList.add('panel__drawer__item__poster')
    const imgElement = document.createElement('img')
    imgElement.src = item.data.posterURL

    const linkElement = document.createElement('a')
    linkElement.classList.add('panel__drawer__item__link')
    linkElement.href = item.data.link || '#'
    linkElement.innerText = item.name

    itemElement.appendChild(posterElement)
    posterElement.appendChild(imgElement)
    itemElement.appendChild(linkElement)

    return itemElement
  }

  async render() {
    await this.fetchMetaData()
    this.node.appendChild(this.generateLayout())
    this.setMode('closed')
  }

  async renderItems(topic) {
    const itemsElement = document.createElement('div')
    itemsElement.classList.add('panel__drawer__items')
    const items = await this.fetchItems(topic)
    items.forEach((item) => itemsElement.appendChild(this.generateItem(item)))

    const bodyElement = this.node.querySelector('.panel__drawer__body')
    const prevItemsElement = bodyElement.querySelector('.panel__drawer__items')
    if (prevItemsElement) prevItemsElement.remove()
    bodyElement.appendChild(itemsElement)
  }
}
