import React from 'react'

import Grapher from './Grapher.jsx'

const TAU = 2 * Math.PI

let sin = (x) => Math.sin(TAU * x)
let cos = (x) => Math.cos(TAU * x)
// let hann = (x) => 0.5 - 0.5 * cos(x)
let fade = (x) => 0.5 + 0.5 * cos(0.5 * x)
let dfade = (x) => -0.25 * TAU * sin(0.5 * x)

export default function WaveEnvelope ({s, phase, freq, array, n = 16}) {
  let N = Math.ceil(freq * n)
  let M = array.length
  let getFades = (x) => {
    x = x * (M - 1)
    let i = Math.min(M - 2, Math.floor(x))
    let k = x - i
    let a0 = array[i]
    let a1 = array[i + 1]
    return [k, a0, a1]
  }

  let C = 0.5

  let wav = (x) => 0.5 * sin(freq * x - phase)
  let dwav = (x) => 0.5 * TAU * freq * cos(freq * x - phase)

  let env = (x) => {
    let [k, a0, a1] = getFades(x)
    return a0 * fade(k) + a1 * fade(1 - k)
  }
  let denv = (x) => {
    let [k, a0, a1] = getFades(x)
    return a0 * dfade(k) - a1 * dfade(1 - k)
  }

  let f = (x) => C + wav(x) * env(x)
  let df = (x) => dwav(x) * env(x) + wav(x) * denv(x)

  // let f = (x) => env(x)
  // let df = (x) => denv(x)

  let path = Array(N + 1).fill()
    .map((_, i) => i / N)
    .map((x) => [x, f(x), df(x)])

  // console.log(path)
  return (
    <g>
      <Grapher d={path} s={s} fill='none' stroke='black' strokeWidth={s * 0.01} />
    </g>
  )
}
