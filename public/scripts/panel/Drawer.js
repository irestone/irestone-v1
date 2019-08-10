export class Drawer {
  constructor(node) {
    this.node = node

    this.setMode('closed')

    const drawer = this

    const header = node.querySelector('.panel__drawer__header')
    header.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('panel__drawer__tab') ||
        e.target.classList.contains('panel__drawer__tag') ||
        e.target.classList.contains('panel__drawer__close-drawer')
      )
        return
      drawer.setMode(drawer.mode === 'opened' ? 'ajar' : 'opened')
    })

    const handle = node.querySelector('.panel__drawer__handle')
    handle.addEventListener('click', (e) => {
      drawer.setMode('ajar')
    })

    const closeDrawer = node.querySelector('.panel__drawer__close-drawer')
    closeDrawer.addEventListener('click', (e) => {
      drawer.setMode('closed')
    })
  }

  setMode(mode) {
    this.mode = mode
    this.node.dataset.mode = mode
  }

  setItemsMode(mode) {
    this.itemsMode = mode
  }
}
