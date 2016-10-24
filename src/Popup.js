import React from 'react'
import ReactDOM from 'react-dom'
import invar from 'invariant'
import Overlay from './Overlay'

var _strategies = { }

function calculate (vp, lp, lc, kp, kc, Δv) {
  return vp + kp * lp - kc * lc + Δv
}

function calculateWithFallback (vp, lp, lc, kp, kc, vm, Δv) {

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
*
*/
export function getActualPosition(parentRect, childRect, gap) {

    var actualStrategy = 'tw-position-'

    var childLeft = Math.floor(childRect.left)
    var childTop = Math.floor(childRect.top)

    // todo: loop all parent properties and apply math.floor to them

    console.log('parentRect', parentRect)

    Object.keys(parentRect).map(function(key) {
        parentRect[key] = Math.abs(parentRect[key])
    })

    console.log('parentRect', parentRect)

    var left_ = childLeft + childRect.width + gap.x == Math.floor(parentRect.left);
    var _left = childLeft === Math.floor(parentRect.left);

    var right_ = childLeft - gap.x === Math.floor(parentRect.right);
    var _right = childLeft + childRect.width === Math.floor(parentRect.right);

    var bottom_ = childTop - gap.y === Math.floor(parentRect.bottom);
    var _bottom = childTop + childRect.height === Math.floor(parentRect.bottom);

    var top_ = childTop + childRect.height + gap.y === Math.floor(parentRect.top);
    var _top = childTop === Math.floor(parentRect.top);

    if (bottom_) {
        actualStrategy += 'bottom';
    }

    if(right_) {
        actualStrategy += 'right';
    }

    if(left_) {
        actualStrategy += 'left';
    }

    if(top_) {
        actualStrategy += 'top';
    }

    if (_bottom) {
        actualStrategy += '-bottom';
    }

    if(_right) {
        actualStrategy += '-right';
    }

    if(_left) {
        actualStrategy += '-left';
    }

    if(_top) {
        actualStrategy += '-top';
    }

    console.log('actualStrategy', actualStrategy)

    return actualStrategy
}

function createStrategy (parentX, childX, parentY, childY, gapX, gapY) {
  return function (parent, child, options) {
    var rect = parent.getBoundingClientRect()
    var childWidth = child.offsetWidth
    var childHeight = child.offsetHeight

    var left = calculateWithFallback(rect.left, rect.width, childWidth, parentX, childX, window.innerWidth, gapX * options.gap)
    var top = calculateWithFallback(rect.top, rect.height, childHeight, parentY, childY, window.innerHeight, gapY * options.gap)

    child.className = 'tw-popup ' + getActualPosition(rect,
            {top, left, width: childWidth, height: childHeight},
            {x: Math.abs(gapX * options.gap), y: Math.abs(gapY * options.gap)});

    setPosition(child, left, top)
  }
}

function createStrategyFromFunction (positionFunc) {
  return function (parent, child, options) {
    var position = positionFunc(parent, child, options)
    setPosition(child, position.left, position.top)
  }
}

function setPosition (child, left, top) {
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
