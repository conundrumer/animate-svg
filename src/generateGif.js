import {join} from 'path'
import fs from 'pn/fs'
import leftPad from 'left-pad'

import im from 'imagemagick'
import gifsicle from 'gifsicle'
import {execFile} from 'child_process'

const OUT_DIR = join(process.env.PWD, 'out')

export default function generateGif (generateSvgFns, delay = 2, name = 'animated') {
  let numDigits = Math.ceil(Math.log10(generateSvgFns.length))

  const outGif = join(OUT_DIR, 'gif', `${name}.gif`)
  const svgBlob = join(OUT_DIR, 'svg', `${name}-${'?'.repeat(numDigits)}.svg`)
  const makeSvgName = (i) =>
    join(OUT_DIR, 'svg', `${name}-${leftPad(i, numDigits, 0)}.svg`)

  let imArgs = ['-delay', delay, '-loop', 0, svgBlob, outGif]
  let gifsicleArgs = ['--batch', '-O3', outGif]

  let generateSvgs = generateSvgFns.map((fn, i) =>
    fs.writeFile(makeSvgName(i), fn())
  )

  return Promise.all(generateSvgs)
    .then(() => new Promise((resolve, reject) => {
      im.convert(imArgs, (err, stdout) => {
        if (err) return reject(err)
        if (stdout) console.log('stdout:', stdout)
        resolve()
      })
    }))
    .then(() => new Promise((resolve, reject) => {
      execFile(gifsicle, gifsicleArgs, (err) => {
        if (err) return reject(err)
        resolve()
      })
    }))
    .catch(e => console.error(e))
}
