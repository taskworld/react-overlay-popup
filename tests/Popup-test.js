import assert from 'assert'

import { getActualPosition, calculate, calculateWithFallback } from '../src/Popup'

describe('Testing output css class of getActualPosition function', function() {

  // not accounting for gap. x/y can't be same values except when 0
  var noGap = {x: 0, y: 0}

  it('Given positions where the child is left (and center) of parent, returns the left-center position class', function() {
    var actual = getActualPosition({top: 25, left: 70, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-left-center', actual)
  })

  it('Given positions where the child is right (and center) of parent, returns the right-center position class', function() {
    var actual = getActualPosition({top: 25, left: 100, bottom: 10, right: 30}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-right-center', actual)
  })

  it('Given positions where the child is top (and center) of parent, returns the top-center position class', function() {
    var actual = getActualPosition({top: 60, left: 75, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-top-center', actual)
  })

  it('Given positions where the child is at bottom (and center) of parent, returns the bottom-center position class', function() {
    var actual = getActualPosition({top: 25, left: 25, bottom: 20, right: 15}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-bottom-center', actual)
  })

  it('Given positions where the child starts on left side of parent and aligned with its top, returns the left-top position class', function() {
    var actual = getActualPosition({top: 20, left: 70, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-left-top', actual)
  })

  it('Given positions where the child starts on right side of parent and aligned with its top, returns the right-top position class', function() {
    var actual = getActualPosition({top: 20, left: 75, bottom: 10, right: 30}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-right-top', actual)
  })

  it('Given positions where the child aligns with parent bottom and starts on left side of parent, returns the left-bottom position class', function() {
    var actual = getActualPosition({top: 21, left: 70, bottom: 60, right: 12}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-left-bottom', actual)
  })

  it('Given positions where the child is aligned with parent bottom and starts on right side of parent, returns the right-bottom position class', function() {
    var actual = getActualPosition({top: 10, left: 75, bottom: 60, right: 30}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-right-bottom', actual)
  })

  it('Given positions where the child is on top and starts on left side of parent, returns the top-left position class', function() {
    var actual = getActualPosition({top: 60, left: 70, bottom: 12, right: 12}, {top: 20, left: 70, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-top-left', actual)
  })

  it('Given positions where the child is on top and starts on right side of parent, returns the top-right position class', function() {
    var actual = getActualPosition({top: 60, left: 55, bottom: 12, right: 60}, {top: 20, left: 20, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-top-right', actual)
  })

  it('Given positions where the child is at bottom and starts on right of parent, returns the bottom-right position class', function() {
    var actual = getActualPosition({top: 26, left: 55, bottom: 20, right: 70}, {top: 20, left: 30, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-bottom-right', actual)
  })

  it('Given positions where the child is at bottom and starts on left of parent, returns the bottom-left position class', function() {
    var actual = getActualPosition({top: 26, left: 55, bottom: 20, right: 78}, {top: 20, left: 55, width: 40, height: 40} , noGap)
    assert(actual === 'tw-position-bottom-left', actual)
  })
})


describe('testing calculate', function() {
  it('Given multiple combinations of args to calculate, assert that it returns expected values', function() {
    var actual = calculate(142.5, 36, 56, 1, 0, 4)
     assert(182.5 === actual, actual)

    actual = calculate(631.5, 60.5, 162, 1, 1, 0)
    assert(530 === actual, actual)

    actual = calculate(21, 95.5, 162, 0.5, 0.5, 0)
    assert(-12.25 === actual, actual)

  })
})

describe('testing calculateWithFallback', function() {
  it('Given multiple combinations of args to calculateWithFallback, assert that it returns expected values', function(){
    var actual = calculateWithFallback(648.5, 55.75, 162, 0.5, 0.5, 692, 0)
    assert(542.25 === actual, actual)

    actual = calculateWithFallback(145, 36, 56, 1, 0, 796, 4)
    assert(185 === actual, actual)

    actual = calculateWithFallback(229.5, 95.5, 162, 0.5, 0.5, 692, 0)
    assert(196.25 === actual, actual)

    actual = calculateWithFallback(0.5, 21, 56, 1, 0, 796, 4)
    assert(25.5 === actual, actual)

    actual = calculateWithFallback(71.5, 95.5, 162, 0.5, 0.5, 692, 0)
    assert(38.25 === actual, actual)
  })
})
