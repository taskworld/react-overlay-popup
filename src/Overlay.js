
var React = require('react');

var _layer;

function getOverlayLayer () {

  if (!_layer) {
    _layer = document.createElement('div');
    _layer.className = 'tw-overlay-layer';
    document.body.appendChild(_layer);
  }

  return _layer;
}

var Overlay = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
  },

  componentDidMount: function () {

    this.updateOverlay();
  },

  componentDidUpdate: function () {

    this.updateOverlay();
  },

  componentWillUnmount: function () {

    if (this._element) {
      React.unmountComponentAtNode(this._element);
      if (this._element.parentNode) {
        this._element.parentNode.removeChild(this._element);
      }
    }
  },

  updateOverlay: function () {

    if (!this._element) {
      this._element = document.createElement('div');
      this._element.className = 'tw-overlay-layer__item';
      getOverlayLayer().appendChild(this._element);
    }
    var overlay = (
      <div className='tw-overlay'>
        {this.props.children}
      </div>
    );
    React.render(overlay, this._element);
  },

  render: function () {

    return (
      <tw-overlay style={{ display: 'none' }}></tw-overlay>
    );
  },

});

module.exports = Overlay;
