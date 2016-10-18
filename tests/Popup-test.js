import assert from 'assert'

import { getActualStrategy } from '../src/Popup'

describe('Testing output class of getActualStrategy function', function() {

    describe('easy cases disregarding parent dimensions:', function() {

        it('Given positions where the child is below and left of parent, returns the bottom-left strategy class', function() {
            var actual = getActualStrategy({top: 10, left: 10, width: 5, height: 5},{top: 16, left: 4})
            assert(actual === 'tw-strategy-bottom-left', actual);
        })

        it('Given positions where the child is below and right of parent, returns the bottom-right strategy class', function() {
            var actual = getActualStrategy({top: 10, left: 10, width: 5, height: 5}, {top: 17, left: 17})
            assert( actual === 'tw-strategy-bottom-right', actual)
        })

        it('Given positions where the child is on top and left of parent, returns the top-left strategy class', function() {
            var actual = getActualStrategy({top: 10, left: 10, width: 5, height: 5}, {top: 8, left: 3})
            assert( actual === 'tw-strategy-top-left', actual)
        })

        it('Given positions where the child is on top and right of parent, returns the top-right strategy class', function() {
            var actual = getActualStrategy({top: 10, left: 10, width: 5, height: 5}, {top: 8, left: 20})
            assert(actual  === 'tw-strategy-top-right', actual)
        })
    })

    describe('tricky cases with parent dimensions', function() {
        it('Given positions where the child is below and left of parent, returns the bottom-left strategy class', function() {
            // assert(getActualStrategy({top: 10, left: 10, width: 5, height: 5},
            //     {top: 13, left: 13}) === 'tw-strategy-bottom-left',
            //     'Actual strategy should be bottom-left.')
        })
    })

    describe('cases with only one position description', function() {

    })

})
