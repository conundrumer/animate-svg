import React from 'react'

export default ({phase, s}) => (
  <circle
    cx={s * 0.5}
    cy={s * (0.5 + 0.25 * Math.cos(2 * Math.PI * phase))}
    r={s * 0.25}
  />
)
