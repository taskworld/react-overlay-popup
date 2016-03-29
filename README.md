# react-overlay-popup

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Overlay and Popup components for React. Brought to you by Taskworld Inc.


Synopsis
--------

```jsx
const { Overlay, Popup } = require('react-overlay-popup');
```

See: [src/App.js](src/App.js) for example.


Overlay
-------

Anything inside `<Overlay></Overlay>` will be added to a separate DOM tree appended to `document.body`.
Just that.


Popup
-----

A special kind of Overlay that automatically positions itself relative to its parent.
The position is specified through the `strategy` prop.

![The strategy and the formula behind the magic.](docs/magic.png)

The `gap` prop specifies how far should the popup be to its parent.



## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with npm)
* [nwb](https://github.com/insin/nwb/) - `npm install -g nwb`


## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`


## Running / Development

* `nwb serve` will run the component's demo app
* Visit the demo at [http://localhost:3000](http://localhost:3000)


### Running Tests

* `nwb test` will run the tests once
* `nwb test --server` will run the tests on every change


### Building

* `nwb build`

[build-badge]: https://img.shields.io/travis/user/repo/master.svg?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.svg?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
