import React from 'react'

const osc = (phase) => (0.5 + 0.5 * Math.sin(2 * Math.PI * phase))

export default ({phase, revolutions}) => (
  <g transform={`rotate(${osc(phase) * revolutions * 360})`}>
    <line
      x1={0}
      y1={0}
      x2={0}
      y2={0.9}
      stroke='black'
      strokeWidth={0.1}
      strokeLinecap='round'
    />
  </g>
)
