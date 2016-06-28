import React from 'react'

const osc = (phase) => (0.5 + 0.5 * Math.sin(2 * Math.PI * phase))

export default ({width, height, phase}) => (
  <g transform={`rotate(${osc(phase) * 90})`}>
    <line
      x1={0}
      y1={0}
      x2={Math.min(width, height)}
      y2={0}
      stroke='black'
      strokeWidth={2}
    />
  </g>
)
