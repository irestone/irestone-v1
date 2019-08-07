import Highway from '@dogstudio/highway/src/highway'

export class HomeRenderer extends Highway.Renderer {
  onEnter() {
    console.log('onEnter home page')
  }

  onEnterCompleted() {
    console.log('onEnterCompleted home page')
  }
}
