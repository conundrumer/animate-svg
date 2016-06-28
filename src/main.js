import render from './render.jsx'
import App from './App.jsx'

const container = document.getElementById('root')

render(App, container)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    render(App, container)
  })
}
