import Highway from '@dogstudio/highway/src/highway'
import { TimelineMax } from 'gsap'

export class DefaultTransition extends Highway.Transition {
  out({ from, trigger, done }) {
    const tlm = new TimelineMax({
      onComplete: () => {
        from.remove()
        done()
      },
    })

    tlm.to(from, 0.2, { opacity: 0 })
  }

  in({ from, to, trigger, done }) {
    const els = to.querySelectorAll('[data-router-view] > *')
    const tlm = new TimelineMax({ onComplete: done })

    tlm.staggerFromTo(
      els,
      0.2,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      0.1
    )
  }
}
