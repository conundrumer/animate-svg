import React from 'react'

import timer from './timer.js'
import {makeSvg} from './renderSvg.jsx'

import Spinner from './Spinner.jsx'
import Circle from './Circle.jsx'

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
          <input
            style={{width: 300}}
            type='range'
            min={-0.5}
            max={0.5}
            step={0.00001}
            value={this.state.inc}
            onChange={this._setInc}
          />
          <label>increment: </label>
          {this.state.inc}
        </div>
        <div>
          <input
            style={{width: 300}}
            type='range'
            min={1}
            max={20}
            step={1}
            value={this.state.delay}
            onChange={this._setDelay}
          />
          <label>delay: </label>
          {this.state.delay}
        </div>
        <div>
          phase: {this.state.phase}
        </div>
        {makeSvg(
          {width: 100, height: 100, style: {border: '1px solid black'}},
          Spinner, {
            revolutions: 1,
            phase: this.state.phase
          }
        )}
        {makeSvg(
          {width: 100, height: 100, style: {border: '1px solid black'}},
          Circle, {
            phase: this.state.phase
          }
        )}
      </div>
    )
  }
}
