import Highway from '@dogstudio/highway/src/highway'

export class DefaultRenderer extends Highway.Renderer {
  onEnter() {
    const md = window.markdownit({ breaks: true })
    const pageBody = this.wrap.querySelector('.page__body')
    const markdown = pageBody.dataset.markdown
    const html = md.render(markdown)
    pageBody.innerHTML = html
    pageBody.dataset.markdown = '[rendered]'
  }
}
