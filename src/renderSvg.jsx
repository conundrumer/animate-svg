import React from 'react'
import ReactDOMServer from 'react-dom/server'

export const makeSvg = (svgProps, Child, childProps) => (
  <svg {...svgProps}>
    <Child {...childProps} />
  </svg>
)

export function renderToString (svgProps, Child, childProps) {
  return ReactDOMServer.renderToStaticMarkup(makeSvg(svgProps, Child, childProps))
    .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
}
