import {join} from 'path'
import fs from 'pn/fs'
import leftPad from 'left-pad'

import im from 'imagemagick'
import gifsicle from 'gifsicle'
import {execFile} from 'child_process'

const OUT_DIR = join(process.env.PWD, 'out')

function convert (...args) {
  return new Promise((resolve, reject) => {
    im.convert(args, (err, stdout) => {
      if (err) return reject(err)
      if (stdout) console.log('stdout:', stdout)
      resolve()
    })
  })
}

function optimize (...args) {
  return new Promise((resolve, reject) => {
    execFile(gifsicle, args, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export default function generateGif (makeSvgFns, delay = 2, name = 'animated') {
  let N = Math.ceil(Math.log10(makeSvgFns.length))

  const pngBlob = join(OUT_DIR, 'png', `${name}-${'?'.repeat(N)}.png`)
  const gifFilename = join(OUT_DIR, 'gif', `${name}.gif`)

  return Promise.all(makeSvgFns.map((makeSvg, i) => {
    let index = leftPad(i, N, 0)
    let svgFilename = join(OUT_DIR, 'svg', `${name}-${index}.svg`)
    let pngFilename = join(OUT_DIR, 'png', `${name}-${index}.png`)

    return fs.writeFile(svgFilename, makeSvg())
      .then(() => convert(
        svgFilename,
        pngFilename
      ))
  }))
    .then(() => convert(
      '-delay', delay,
      '-loop', 0,
      pngBlob,
      gifFilename
    ))
    .then(() => optimize(
      '--batch', '-O3', gifFilename
    ))
    .catch(e => console.error(e))
}
