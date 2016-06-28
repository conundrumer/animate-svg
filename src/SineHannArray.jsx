import React from 'react'

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

  function makeControlPoint (x1, i, x) {
    if (i === 0) {
      return ['M', x1, f(x1)]
    }
    let x0 = x[i - 1]
    let y0 = f(x0)
    let y1 = f(x1)
    let dy0 = df(x0)
    let dy1 = df(x1)
    let dx = x1 - x0
    /* eslint-disable space-infix-ops */
    return ['C',
      x0 * 2/3 + x1 * 1/3, y0 + dy0 * dx/3,
      x0 * 1/3 + x1 * 2/3, y1 - dy1 * dx/3,
      x1, y1
    ]
    /* eslint-enable space-infix-ops */
  }

  let N = Math.ceil(freq * n)

  let path = Array(N + 1).fill()
    .map((_, i) => i / N)
    .map(makeControlPoint)
    .reduce((a, b) => [...a, ...b])
    .map((x) => typeof x === 'number' ? s * x : x)
    .join(' ')
  return (
    <g>
      <path d={path} fill='none' stroke='black' strokeWidth={s * 0.01} />
    </g>
  )
}
