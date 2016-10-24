import assert from 'assert'

import { getActualPosition } from '../src/Popup'

describe('Testing output class of getActualPosition function', function() {

        var noGap = {x: 0, y: 0}

        it('Given positions where the child is left (and center) of parent, returns the left position class', function() {
            var actual = getActualPosition({top: 25, left: 70.856, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
            assert(actual === 'tw-position-left', actual)
        })

        it('Given positions where the child is right (and center) of parent, returns the right position class', function() {
            var actual = getActualPosition({top: 25, left: 100, bottom: 10, right: 30}, {top: 20, left: 30, width: 40, height: 40} , noGap)
            assert(actual === 'tw-position-right', actual)
        })

        it('Given positions where the child is top (and center) of parent, returns the top position class', function() {
            var actual = getActualPosition({top: 60, left: 75, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
            assert(actual === 'tw-position-top', actual)
        })

        it('Given positions where the child is at bottom (and center) of parent, returns the bottom position class', function() {
            var actual = getActualPosition({top: 25.33, left: 25.7777, bottom: 20, right: 15}, {top: 20.98, left: 30.55, width: 40, height: 40} , noGap)
            assert(actual === 'tw-position-bottom', actual)
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

        it('Given incorrect positioning values (made up, as opposed to parent/child values that make sense), returns an empty string', function() {
            var actual = getActualPosition({top: 1, left: 2, bottom: 3, right: 4}, {top: 5, left: 6, width: 7, height: 8} , noGap)
            assert(actual === '', actual)
        })

})
