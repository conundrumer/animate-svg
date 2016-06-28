import {join} from 'path'
import fs from 'pn/fs'
import leftPad from 'left-pad'

import im from 'imagemagick'
import gifsicle from 'gifsicle'
import {execFile} from 'child_process'

function generateFns (fn, {frames, blurFrames, blurIntensity}) {
  let N = frames
  let I = blurIntensity
  let M, C
  if (blurFrames % 2 === 0) {
    M = blurFrames / 2
    C = 0.5
  } else {
    M = (blurFrames + 1) / 2
    C = 1
  }

  return Array(N).fill().map((_, i) =>
    Array(blurFrames).fill().map((_, j) =>
      () => fn((i + I * (j + C - M) / M) / N)
    )
  )
}

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

// range: [0, N - 1]
const hann = (N, n) => 0.5 * (1 - Math.cos(2 * Math.PI * (n + 1) / (N + 1))) / (0.5 * N + 0.5)

export default function generateGif (fn, {frames, blurFrames = 1, blurIntensity = 1, delay = 4, name = 'animated'} = {}) {
  let makeSvgsFns = generateFns(fn, {frames, blurFrames, blurIntensity})
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

    let win = Array(makeSvgs.length).fill()
      .map((_, j) => hann(makeSvgs.length, j))
    // console.log(win)

    return Promise.all(makeSvgs.map((makeSvg, j) => {
      let m = leftPad(j, M, 0)
      let svgFilename = join(OUT_DIR, 'svg', `${name}-${n}-${m}.svg`)
      return fs.writeFile(svgFilename, makeSvg())
    }))
      .then(() => convert(
        '-poly', win.map((y) => `${y},1`).join(' '),
        // '-average',
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
