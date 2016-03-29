import assert from 'assert'
import React from 'react'
import { mount } from 'enzyme'

import { Overlay, Popup } from '../src'

describe('react-overlay-popup', function () {
  describe('<Overlay />', function () {
    it('puts overlay in detached DOM node', function () {
      mount(
        <div id='b'>
          <Overlay>
            <div id='a'></div>
          </Overlay>
        </div>,
        { attachTo: document.body }
      )
      assertElementExists('#a')
      assertElementExists('#b')
      assertElementNotExists('#b #a')
    })
  })

  //           x=120
  //            | x=150
  //            |  |
  //
  //          +---+  -- y=100
  //          |   |:
  //          |   |:
  //          |   |:
  //          +---+:
  //           ::::: -- y = 150
  //            +-+  -- y = 150
  //            | |:
  //            +-+:
  //             :::
  describe('<Popup />', function () {
    it('sets position relative to element', function () {
      mount(
        <div id='x' style={{ position: 'fixed', top: 100, left: 100, width: 50, height: 50 }}>
          <Popup strategy='bottom right' gap={10}>
            <div id='y' style={{ width: 30, height: 30 }}></div>
          </Popup>
        </div>,
        { attachTo: document.body }
      )
      assertElementExists('#x')
      assertElementExists('#y')
      const y = document.querySelector('#y')
      const container = y.parentNode
      assert.equal(container.style.top, '160px')
      assert.equal(container.style.left, '120px')
    })
  })
})

function assertElementNotExists (selector) {
  assert(!document.querySelector(selector), 'Element "' + selector + '" must not exist')
}
function assertElementExists (selector) {
  assert(document.querySelector(selector), 'Element "' + selector + '" must exist')
}
