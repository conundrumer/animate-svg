import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

export default (App, container) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    container
  )
}
