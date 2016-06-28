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

const getNumDigits = (len) => Math.max(1, Math.ceil(Math.log10(len)))

export default function generateGif (makeSvgsFns, delay = 2, name = 'animated') {
  let N = getNumDigits(makeSvgsFns.length)

  const pngBlob = join(OUT_DIR, 'png', `${name}-${'?'.repeat(N)}.png`)
  const gifFilename = join(OUT_DIR, 'gif', `${name}.gif`)

  return Promise.all(makeSvgsFns.map((makeSvgs, i) => {
    if (!(makeSvgs instanceof Array)) {
      makeSvgs = [makeSvgs]
    }

    let M = getNumDigits(makeSvgs.length)
    let n = leftPad(i, N, 0)
    let pngFilename = join(OUT_DIR, 'png', `${name}-${n}.png`)
    let svgBlob = join(OUT_DIR, 'svg', `${name}-${n}-${'?'.repeat(M)}.svg`)

    return Promise.all(makeSvgs.map((makeSvg, j) => {
      let m = leftPad(j, M, 0)
      let svgFilename = join(OUT_DIR, 'svg', `${name}-${n}-${m}.svg`)
      return fs.writeFile(svgFilename, makeSvg())
    }))
      .then(() => convert(
        '-average',
        svgBlob,
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
