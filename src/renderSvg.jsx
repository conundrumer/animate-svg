import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

const makeSvg = (svgProps, Child, childProps) => (
  <svg {...svgProps} viewBox={`0 0 ${svgProps.width} ${svgProps.height}`}>
    <Child {...childProps} />
  </svg>
)

export function makeRenderer (container) {
  return function render (svgProps, Child, childProps) {
    ReactDOM.render(makeSvg(svgProps, Child, childProps), container)
  }
}

export function renderToString (svgProps, Child, childProps) {
  return ReactDOMServer.renderToStaticMarkup(makeSvg(svgProps, Child, childProps))
    .replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
}
