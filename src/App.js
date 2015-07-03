
var React = require('react');

var Overlay = require('./Overlay');
var Popup = require('./Popup');

var _strategies = [
  'bottom left', 'bottom center', 'bottom right',
  'top left', 'top center', 'top right',
  'left top', 'left center', 'left bottom',
  'right top', 'right center', 'right bottom',
];

module.exports = React.createClass({

  getInitialState: function () {

    return {
      x: 100,
      y: 100,
      strategy: _strategies[0],
    };
  },

  componentDidMount: function () {

    window.addEventListener('mousemove', this.move);
  },

  move: function (e) {

    var button = React.findDOMNode(this.refs.button);
    this.setState({
      x: e.clientX - button.offsetWidth / 2,
      y: e.clientY - button.offsetHeight / 2,
    });
  },

  nextStrategy: function () {

    this.setState({
      strategy: _strategies[(_strategies.indexOf(this.state.strategy) + 1) % _strategies.length]
    });
  },

  render: function () {
    return (
      <div>
        <h1>Taskworld Popup and Overlay component!</h1>
        <Overlay>I am plucked out to another layer!</Overlay>
        <div style={{ padding: '10vh 15vw' }}>
          <button
           ref='button'
           style={{ position: 'absolute', left: this.state.x, top: this.state.y }}
           onClick={this.nextStrategy}>

            {this.state.strategy}

            <Popup strategy={this.state.strategy}>
              <div style={{ background: '#def', border: '1px solid #ccc', width: '160px' }}>
                I am a menu!<br />
                Edit<br />
                Delete<br />

              </div>
            </Popup>
          </button>
        </div>
      </div>
    );
  }
});
