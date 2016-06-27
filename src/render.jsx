import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Svg from './Svg.jsx'

export function renderToString (phase) {
  return ReactDOMServer.renderToStaticMarkup(<Svg phase={phase} />)
}
