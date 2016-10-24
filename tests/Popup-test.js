import assert from 'assert'

import { getActualStrategy } from '../src/Popup'

describe('Testing output class of getActualStrategy function', function() {

        var noGap = {x:0, y:0}

        it('Given positions where the child is below and left of parent, returns the left-top strategy class', function() {
            var actual = getActualStrategy({top: 20, left: 70, bottom: 10, right: 10}, {top: 20, left: 30, width: 40, height: 40} , noGap)
            assert(actual === 'tw-strategy-left-top', actual);
        })

        // it('Given positions where the child is below and right of parent, returns the bottom-right strategy class', function() {
        //     var actual = getActualStrategy({top: 10, left: 10, width: 35, height: 25}, {top: 17, left: 17}, noGap)
        //     assert( actual === 'tw-strategy-bottom-left', actual)
        // })
        //
        // it('Given positions where the child is on top and left of parent, returns the top-left strategy class', function() {
        //     var actual = getActualStrategy({top: 10, left: 10, width: 35, height: 25}, {top: 8, left: 3}, noGap)
        //     assert( actual === 'tw-strategy-top-right', actual)
        // })
        //
        // it('Given positions where the child is on top and right of parent, returns the top-right strategy class', function() {
        //     var actual = getActualStrategy({top: 10, left: 10, width: 18, height: 56}, {top: 8, left: 20}, noGap)
        //     assert(actual  === 'tw-strategy-top-left', actual)
        // })

})
