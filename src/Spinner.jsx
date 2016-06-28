import React from 'react'

const osc = (phase) => (0.5 + 0.5 * Math.sin(2 * Math.PI * phase))

export default ({phase, revolutions, s}) => (
  <g transform={`rotate(${osc(phase) * revolutions * 360} ${s * 0.5} ${s * 0.5})`}>
    <line
      x1={s * 0.5}
      y1={s * 0.5}
      x2={s * 0.5}
      y2={s * 0.95}
      stroke='black'
      strokeWidth={s * 0.05}
      strokeLinecap='round'
    />
  </g>
)
