import React from 'react'

const osc = (phase) => (0.5 + 0.5 * Math.sin(2 * Math.PI * phase))

export default ({width, height, phase}) => (
  <circle
    cx={width / 2}
    cy={height * (0.25 + 0.5 * osc(phase))}
    r={Math.min(width, height) / 4}
  />
)
