import React from 'react'

import Grapher from './Grapher.jsx'

const TAU = 2 * Math.PI

let sin = (x) => Math.sin(TAU * x)
let cos = (x) => Math.cos(TAU * x)
let hann = (x) => 0.5 - 0.5 * cos(x)

export default function SineHannArray ({s, phase, freq, n = 16}) {
  let f = (x) => 0.5 + 0.5 * sin(freq * x - phase) * hann(x)
  let df = (x) => 0.5 * (
    TAU * freq * cos(freq * x - phase) * hann(x) +
    sin(freq * x - phase) * 0.5 * TAU * sin(x)
  )

  let N = Math.ceil(freq * n)

  let path = Array(N + 1).fill()
    .map((_, i) => i / N)
    .map((x) => [x, f(x), df(x)])
  return (
    <g>
      <Grapher d={path} s={s} fill='none' stroke='black' strokeWidth={s * 0.01} />
    </g>
  )
}
