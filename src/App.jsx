import React from 'react'

import timer from './timer.js'

export default class App extends React.Component {

  constructor () {
    super()
    this.state = {
      phase: 0,
      inc: 1 / (1 << 6),
      delay: 4,
      skipFrames: false
    }

    this.timer = timer((frames) => {
      this.setState({
        phase: this.state.phase + frames * this.state.inc
      })
    }, () => ({
      fps: 100 / this.state.delay,
      skipFrames: this.state.skipFrames
    }))

    this._setInc = this._setInc.bind(this)
    this._setDelay = this._setDelay.bind(this)
  }

  componentWillUnmount () {
    this.timer.stop()
  }

  _setInc ({target: {value}}) {
    this.setState({inc: value})
  }

  _setDelay ({target: {value}}) {
    this.setState({delay: value})
  }

  render () {
    return (
      <div>
        <div>
          <label>increment</label>
          <input
            type='range'
            min={-1}
            max={1}
            step={0.00001}
            value={this.state.inc}
            onChange={this._setInc}
          />
          {this.state.inc}
        </div>
        <div>
          <label>delay</label>
          <input
            type='range'
            min={1}
            max={10}
            step={1}
            value={this.state.delay}
            onChange={this._setDelay}
          />
          {this.state.delay}
        </div>
        phase: {this.state.phase}
      </div>
    )
  }
}
