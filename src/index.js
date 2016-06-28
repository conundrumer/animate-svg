import {renderToString} from './renderSvg.jsx'
import Spinner from './Spinner.jsx'
import generateGif from './generateGif.js'

const width = 100
const height = 100

let fn = (phase) => renderToString(
  {width, height, viewBox: '-1 -1 2 2'},
  Spinner, {
    revolutions: 6,
    phase
  }
)
let options = {
  frames: 100,
  blurFrames: 30,
  blurIntensity: 0.5,
  delay: 4,
  name: 'test'
}

generateGif(fn, options)
.then(() => console.log('done'))
