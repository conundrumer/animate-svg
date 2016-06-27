import fs from 'pn/fs'
import leftPad from 'left-pad'

import {renderToString} from './render.jsx'

const OUT_DIR = 'out'
const N = 20
const numDigits = Math.ceil(Math.log10(N))

for (let i = 0; i < N; i++) {
  fs.writeFile(`${OUT_DIR}/${leftPad(i, numDigits, 0)}.svg`, renderToString(i / N))
    .catch(e => console.error(e))
}
