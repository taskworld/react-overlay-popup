import React from 'react'
import ReactDOM from 'react-dom'
import invar from 'invariant'
import Overlay from './Overlay'

var _strategies = {}

export function calculate (vp, lp, lc, kp, kc, Δv) {
  return vp + kp * lp - kc * lc + Δv
}

export function calculateWithFallback (vp, lp, lc, kp, kc, vm, Δv) {
  var primary = kp !== kc
  var vc = calculate(vp, lp, lc, kp, kc, Δv)

  if (primary) {
    if ((kp > 0.5 && vc + lc > vm) || (kp < 0.5 && vc < 0)) {
      return calculate(vp, lp, lc, 1 - kp, 1 - kc, -Δv)
    } else {
      return vc
    }
  } else {
    if (vc < 0) {
      return calculate(vp, lp, lc, 0, 0, Δv)
    } else if (vc + lc > vm) {
      return calculate(vp, lp, lc, 1, 1, Δv)
    } else {
      return vc
    }
  }
}

/**
* Google Chrome returns floating values for a boundingRect when zooming in/out
* Unable to loop/reduce/get keys for properties of special DOMRect Object
*/
function floorRectangle(rect) {
  return {
    top: Math.floor(rect.top),
    right: Math.floor(rect.right),
    bottom: Math.floor(rect.bottom),
    left: Math.floor(rect.left),
    width: Math.floor(rect.width),
    height: Math.floor(rect.height)
  }
}

/**
 * getActualPosition -  positioning strategy only specifies the *preferred* strategy
 *                     of the child popup. When the popup is rendered, it might
 *                     reposition to the closest strategy that allows it to still
 *                     be rendered on screen.
 *                     This method returns a class which refers to the actual strategy used
 */
export function getActualPosition(parentRect, childRect, gap) {

  parentRect = floorRectangle(parentRect)
  childRect = floorRectangle(childRect)
  gap.x = Math.abs(gap.x)
  gap.y = Math.abs(gap.y)

  var classPrefix = 'tw-position-',
    base = childRect.top + childRect.height + gap.y === parentRect.top ? 'top' :
      childRect.left - gap.x === parentRect.right ? 'right' :
      childRect.top - gap.y === parentRect.bottom ? 'bottom' :
      childRect.left + childRect.width + gap.x === parentRect.left ? 'left' : '',
    complement = childRect.top === parentRect.top ? 'top' :
      childRect.left + childRect.width === parentRect.right ? 'right' :
      childRect.top + childRect.height === parentRect.bottom ? 'bottom' :
      childRect.left === parentRect.left ? 'left' : 'center'

  return classPrefix + base + '-' + complement
}

function createStrategy (parentX, childX, parentY, childY, gapX, gapY) {
  return function (parent, child, options) {
    var parentRect = parent.getBoundingClientRect()
    var childWidth = child.offsetWidth
    var childHeight = child.offsetHeight

    var left = calculateWithFallback(parentRect.left, parentRect.width, childWidth, parentX, childX, window.innerWidth, gapX * options.gap)
    var top = calculateWithFallback(parentRect.top, parentRect.height, childHeight, parentY, childY, window.innerHeight, gapY * options.gap)

    var positionClass = getActualPosition(parentRect,
        {top, left, width: childWidth, height: childHeight},
        {x: gapX * options.gap, y: gapY * options.gap})

    setPosition(child, left, top, positionClass)
  }
}

function createStrategyFromFunction (positionFunc) {
  return function (parent, child, options) {
    var position = positionFunc(parent, child, options)
    setPosition(child, position.left, position.top)
  }
}

function setPosition (child, left, top, positionClass) {
  child.className = Popup.POPUP_CLASS_NAME + ' ' + positionClass
  child.style.visibility = 'visible'
  child.style.left = left + 'px'
  child.style.top = top + 'px'
}

_strategies['top left'] = createStrategy(0, 0, 0, 1, 0, -1)
_strategies['top'] = _strategies['top center'] = createStrategy(0.5, 0.5, 0, 1, 0, -1)
_strategies['top right'] = createStrategy(1, 1, 0, 1, 0, -1)

_strategies['bottom left'] = createStrategy(0, 0, 1, 0, 0, 1)
_strategies['bottom'] = _strategies['bottom center'] = createStrategy(0.5, 0.5, 1, 0, 0, 1)
_strategies['bottom right'] = createStrategy(1, 1, 1, 0, 0, 1)

_strategies['left top'] = createStrategy(0, 1, 0, 0, -1, 0)
_strategies['left'] = _strategies['left center'] = createStrategy(0, 1, 0.5, 0.5, -1, 0)
_strategies['left bottom'] = createStrategy(0, 1, 1, 1, -1, 0)

_strategies['right top'] = createStrategy(1, 0, 0, 0, 1, 0)
_strategies['right'] = _strategies['right center'] = createStrategy(1, 0, 0.5, 0.5, 1, 0)
_strategies['right bottom'] = createStrategy(1, 0, 1, 1, 1, 0)

var Popup = React.createClass({
  propTypes: {
    strategy: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    children: React.PropTypes.node,
    gap: React.PropTypes.number
  },

  componentDidMount: function () {
    this.reposition()
    window.addEventListener('resize', this.reposition, true)
  },

  componentDidUpdate: function () {
    this.reposition()
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.reposition, true)
  },

  reposition: function () {
    var parent = ReactDOM.findDOMNode(this).parentNode
    var child = ReactDOM.findDOMNode(this.refs.popup)

    if (parent && child) {
      var strategy

      if (typeof this.props.strategy === 'function') {
        strategy = createStrategyFromFunction(this.props.strategy)
      }

      if (typeof this.props.strategy === 'string') {
        invar(
          _strategies.hasOwnProperty(this.props.strategy),
          'The strategy %s must exist.',
          this.props.strategy
        )
        strategy = _strategies[this.props.strategy]
      }

      invar(typeof strategy === 'function', 'Strategy must be a function.')
      strategy(parent, child, { gap: this.props.gap || 0 })
    }
  },

  render: function () {
    return (
      <Overlay>
        <div className={Popup.POPUP_CLASS_NAME} ref='popup' style={{ visibility: 'hidden', position: 'fixed' }}>
          {this.props.children}
        </div>
      </Overlay>
    )
  }
})

Popup.POPUP_CLASS_NAME = 'tw-popup'

export default Popup
