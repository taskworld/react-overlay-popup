import React from 'react'
import ReactDOM, { render } from 'react-dom'
import './style.css'

import { Overlay, Popup } from '../../src'

var _strategies = [
  'bottom left', 'bottom center', 'bottom right',
  'top left', 'top center', 'top right',
  'left top', 'left center', 'left bottom',
  'right top', 'right center', 'right bottom'
]

const Demo = React.createClass({
  getInitialState: function () {
    return {
      x: 100,
      y: 100,
      strategy: _strategies[0]
    }
  },

  componentDidMount: function () {
    window.addEventListener('mousemove', this.move)
  },

  move: function (e) {
    var button = ReactDOM.findDOMNode(this.refs.button)
    this.setState({
      x: e.clientX - button.offsetWidth / 2,
      y: e.clientY - button.offsetHeight / 2
    })
  },

  nextStrategy: function () {
    this.setState({
      strategy: _strategies[(_strategies.indexOf(this.state.strategy) + 1) % _strategies.length]
    })
  },

  render: function () {
    return (
      <div className='Demo'>
        <h1>Taskworld Popup and Overlay component.</h1>
        <p><strong>react-overlay-popup</strong> is a simple component kit that helps with creating popup menus and stuff.</p>
        <ul>
          <li><strong>{'<Overlay>'}</strong> renders its children in a separate DOM node.</li>
          <li><strong>{'<Popup>'}</strong> renders its children in a separate DOM node with fixed position relative to the parent element.</li>
        </ul>

        <Overlay>
          <strong>{'<Overlay>'} example:</strong> I am plucked out to another layer!
        </Overlay>

        <button ref='button' style={{ position: 'absolute', left: this.state.x, top: this.state.y }} onClick={this.nextStrategy}>
          {this.state.strategy}
          <Popup strategy={this.state.strategy} gap={4}>
            <div style={{ background: '#def', border: '1px solid #ccc', width: '160px' }}>
              I am a menu!
              <br /> Edit
              <br /> Delete
              <br />
            </div>
          </Popup>
        </button>
      </div>
    )
  }
})

render(<Demo />, document.querySelector('#demo'))
