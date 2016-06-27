import {renderToString} from './renderSvg.jsx'
import Circle from './Circle.jsx'
import generateGif from './generateGif.js'

const delay = 2
const N = 100
const width = 100
const height = 100

let fns = Array(N).fill().map((_, i) =>
  () => renderToString(
    {width, height},
    Circle, {
      width, height,
      phase: i / N
    }
  )
)

console.log('start')
Promise.all([
  generateGif(fns, delay, 'test'),
  generateGif(fns, delay, 'test2')
])
.then(() => console.log('done'))
