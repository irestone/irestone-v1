import { layout } from './drawer/layout.view'
import { items } from './drawer/items.view'

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

    return { category: this.category, topics: this.topics, tags: this.tags }
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

  handleToggleDrawerSize(e) {
    this.setMode(this.mode === 'opened' ? 'ajar' : 'opened')
  }

  async render() {
    const innerElement = layout(await this.fetchMetaData(), {
      handleOpenDrawer: this.setMode.bind(this, 'ajar'),
      handleToggleDrawerSize: this.handleToggleDrawerSize.bind(this),
      handleToggleTab: this.setActiveTab.bind(this),
      handleCloseDrawer: this.setMode.bind(this, 'closed'),
    })
    this.node.appendChild(innerElement)
    this.setMode('closed')
  }

  async renderItems(topic) {
    const bodyElement = this.node.querySelector('.panel__drawer__body')
    const prevItemsElement = bodyElement.querySelector('.panel__drawer__items')
    if (prevItemsElement) prevItemsElement.remove()
    const itemsElement = items({ items: await this.fetchItems(topic) })
    bodyElement.appendChild(itemsElement)
  }
}
