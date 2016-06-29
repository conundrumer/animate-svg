import {renderToString} from './renderSvg.jsx'
import WaveEnvelopeRows from './WaveEnvelopeRows.jsx'
import generateGif from './generateGif.js'

const width = 784 / (295 / 200)
const height = 200
const x = -(width - height) / height / 2
const w = width / height

let fn = (phase) => renderToString(
  {width: width, height: height},
  WaveEnvelopeRows, {
    x, w, phase,
    rev: 30,
    freq: 15
  }
)
let options = {
  frames: 100,
  blurFrames: 20,
  blurIntensity: 1,
  delay: 4,
  name: 'hhdsp3'
}

generateGif(fn, options)
.then(() => console.log('done'))
