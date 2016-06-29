import React from 'react'

import Grapher from './Grapher.jsx'

const TAU = 2 * Math.PI

let sin = (x) => Math.sin(TAU * x)
let cos = (x) => Math.cos(TAU * x)
let hann = (x) => 0.5 - 0.5 * cos(x)

export default function WaveEnvelope ({s, phase, freq, array, n = 16}) {
  let N = Math.ceil(freq * n)
  let M = array.length

  let C = 0.5

  let wav = (x) => 0.5 * sin(freq * x - phase)
  let dwav = (x) => 0.5 * TAU * freq * cos(freq * x - phase)

  let env = (x) => hann(x)
  let denv = (x) => 0.5 * TAU * sin(x)

  let f = (x) => C + wav(x) * env(x)
  let df = (x) => dwav(x) * env(x) + wav(x) * denv(x)


  let path = Array(N + 1).fill()
    .map((_, i) => i / N)
    .map((x) => [x, f(x), df(x)])
  return (
    <g>
      <Grapher d={path} s={s} fill='none' stroke='black' strokeWidth={s * 0.01} />
    </g>
  )
}
