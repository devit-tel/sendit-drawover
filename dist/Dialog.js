'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _senditUtility = require('sendit-utility');

var _AppendBodyComponent2 = require('./AppendBodyComponent');

var _AppendBodyComponent3 = _interopRequireDefault(_AppendBodyComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_AppendBodyComponent) {
  _inherits(Dialog, _AppendBodyComponent);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.uniqueId = (0, _senditUtility.UniqueId)(6);
    _this.setAppendElementId(_this.uniqueId);
    _this.onOkay = _this.onOkay.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.state = {
      isConfirm: false
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          title = _props.title,
          okayLabel = _props.okayLabel,
          cancelLabel = _props.cancelLabel,
          onOkay = _props.onOkay,
          onCancel = _props.onCancel;

      if (title || okayLabel || cancelLabel || onOkay || onCancel) this.setState({ isConfirm: true });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSelf();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateSelf();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeAppendElement();
    }
  }, {
    key: 'onOkay',
    value: function onOkay() {
      var onOkay = this.props.onOkay;

      onOkay();
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      var onCancel = this.props.onCancel;

      onCancel();
    }
  }, {
    key: 'updateSelf',
    value: function updateSelf() {
      var _this2 = this;

      var _props2 = this.props,
          isVisible = _props2.isVisible,
          isBlind = _props2.isBlind,
          title = _props2.title,
          okayLabel = _props2.okayLabel,
          cancelLabel = _props2.cancelLabel;
      var isConfirm = this.state.isConfirm;

      this.updateAppendElement(_react2.default.createElement(
        'div',
        { key: this.uniqueId, className: (isConfirm ? 'confirm' : 'dialog') + (isVisible ? ' __visible' : '') + (isBlind ? ' __blind' : '') },
        isConfirm ? _react2.default.createElement('div', { className: '__cancelDialog', onClick: function onClick() {
            return _this2.onCancel();
          } }) : null,
        _react2.default.createElement(
          'div',
          { className: '__container' },
          title ? _react2.default.createElement(
            'div',
            { className: '__title' },
            title
          ) : null,
          _react2.default.createElement(
            'div',
            { className: '__body' },
            this.props.children
          ),
          isConfirm ? _react2.default.createElement(
            'div',
            { className: '__actionbar' },
            _react2.default.createElement(
              'button',
              { className: 'btn-dialog btn-dialog-cancel', onClick: function onClick() {
                  return _this2.onCancel();
                } },
              cancelLabel ? cancelLabel : 'Cancel'
            ),
            _react2.default.createElement(
              'button',
              { className: 'btn-dialog btn-dialog-ok', onClick: function onClick() {
                  return _this2.onOkay();
                } },
              okayLabel ? okayLabel : 'OK'
            )
          ) : null
        )
      ));
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Dialog;
}(_AppendBodyComponent3.default);

exports.default = Dialog;

Dialog.propTypes = {
  isVisible: _react.PropTypes.bool,
  isBlind: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  okayLabel: _react.PropTypes.string,
  cancelLabel: _react.PropTypes.string,
  onOkay: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};