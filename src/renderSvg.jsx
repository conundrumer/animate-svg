import React from 'react'
import ReactDOMServer from 'react-dom/server'

const SCALE_FACTOR = 100

export function makeSvg (svgProps, Child, childProps) {
  return (
    <svg {...svgProps} viewBox={`0 0 ${SCALE_FACTOR} ${SCALE_FACTOR}`}>
      <Child {...childProps} s={SCALE_FACTOR} />
    </svg>
  )
}

export function renderToString (svgProps, Child, childProps) {
  return ReactDOMServer.renderToStaticMarkup(makeSvg(svgProps, Child, childProps))
    .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
}
