
var React = require('react');

var _layer;

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
      this._element.className = Overlay.CONTAINER_CLASS_NAME;
      document.body.appendChild(this._element);
    }
    var overlay = (
      <div className={Overlay.OVERLAY_CLASS_NAME}>
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

Overlay.CONTAINER_CLASS_NAME = 'tw-overlay-container';
Overlay.OVERLAY_CLASS_NAME = 'tw-overlay';

module.exports = Overlay;
