import {renderToString} from './renderSvg.jsx'
import Pendulum from './Pendulum.jsx'
import generateGif from './generateGif.js'

const delay = 2
const N = 20
const M = 40
const width = 100
const height = 100

let fns = Array(N).fill().map((_, i) =>
  Array(M).fill().map((_, j) =>
    () => renderToString(
      {width, height},
      Pendulum, {
        width, height,
        phase: (i + j / M) / N
      }
    )
  )
)

console.log('start')
generateGif(fns, delay, 'test')
.then(() => console.log('done'))
