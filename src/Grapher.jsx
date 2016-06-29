import React from 'react'

function makeControlPoint ([x1, y1, dy1], i, d) {
  if (i === 0) {
    return ['M', x1, y1]
  }
  let [x0, y0, dy0] = d[i - 1]
  let dx = x1 - x0
  /* eslint-disable space-infix-ops */
  return ['C',
    x0 * 2/3 + x1 * 1/3, y0 + dy0 * dx/3,
    x0 * 1/3 + x1 * 2/3, y1 - dy1 * dx/3,
    x1, y1
  ]
  /* eslint-enable space-infix-ops */
}

export default function Grapher (props) {
  let {s, d} = props

  let path = d
    .map(makeControlPoint)
    .reduce((a, b) => [...a, ...b])
    .map((x) => typeof x === 'number' ? s * x : x)
    .join(' ')
  return (
    <path {...props} d={path} />
  )
}
