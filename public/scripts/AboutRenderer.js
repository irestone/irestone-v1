import Highway from '@dogstudio/highway/src/highway'

export class AboutRenderer extends Highway.Renderer {
  onEnter() {
    console.log('onEnter about page')
  }

  onEnterCompleted() {
    console.log('onEnterCompleted about page')
  }
}
