import React from 'react'

import WaveEnvelope from './WaveEnvelope.jsx'

const pixels = (`
22222222222222222222222222222222222222
0 d   d  d   d   dcca    acc8  ccba  0
0 d   d  d   d   d   d  f      d   e 0
0 da9ad  da9ad   d   d   dad   dcba  0
0 d   d  d   d   d   d      f  d     0
0 d   d  d   d   ddda   8dda   d     0
33333333333333333333333333333333333333
`).split('\n')
  .filter(row => row.length > 0)
  .map(row =>
    Array.from(row).map(c => c === ' ' ? 0 : parseInt(c, 16) / 15)
  )

const TAU = 2 * Math.PI
let cos = (x) => Math.cos(TAU * x)
let fadeIn = (x) => 0.5 - 0.5 * cos(0.5 * x)

export default function WaveEnvelopeRows ({s, x, w, phase, rev = 4, freq = 30, oct = 1.5}) {
  phase = phase % 1
  phase = rev * (0.5 * fadeIn(phase) + 0.5 * fadeIn(fadeIn(phase)))
  let N = pixels.length
  return (
    <g>
      <rect
        fill='#111'
        x={s * x}
        y={0}
        width={s * w}
        height={s * 1}
      />
      {pixels.map((row, i) =>
        <WaveEnvelope
          key={i}
          s={s}
          phase={phase}
          freq={freq * Math.pow(2, oct * ((N - i - 1) / N))}
          n={8}
          array={row}
          x={x}
          y={i / N}
          w={w}
          h={1 / N}
        />
      )}
    </g>
  )
}
