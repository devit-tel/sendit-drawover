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

var Toastr = function (_AppendBodyComponent) {
  _inherits(Toastr, _AppendBodyComponent);

  function Toastr(props) {
    _classCallCheck(this, Toastr);

    var _this = _possibleConstructorReturn(this, (Toastr.__proto__ || Object.getPrototypeOf(Toastr)).call(this, props));

    _this.uniqueId = (0, _senditUtility.UniqueId)(6);
    _this.setAppendElementId(_this.uniqueId);
    _this.state = {
      isVisible: false,
      timeoutStyle: {},
      timeoutMessage: null,
      toastrStyle: _this.props.toastrStyle,
      completeStyle: {},
      completeMessage: null,
      isError: false,
      errorStyle: {},
      errorMessage: null
    };
    return _this;
  }

  _createClass(Toastr, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var isVisible = this.props.isVisible;

      this.setState({ isVisible: isVisible });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          isVisible = _props.isVisible,
          timeout = _props.timeout,
          timeoutDelay = _props.timeoutDelay,
          timeoutStyle = _props.timeoutStyle,
          timeoutMessage = _props.timeoutMessage;

      this.updateSelf();
      if (timeout && isVisible) {
        if (timeoutDelay && timeoutStyle && timeoutMessage) {
          setTimeout(function () {
            _this2.setState({ timeoutStyle: timeoutStyle, timeoutMessage: timeoutMessage });
          }, timeout);
          setTimeout(function () {
            _this2.setState({ isVisible: false });
            resetState();
          }, timeout + timeoutDelay);
        } else {
          setTimeout(function () {
            _this2.setState({ isVisible: false });
            _this2.resetState();
          }, timeout);
        }
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this3 = this;

      var _props2 = this.props,
          completeDelay = _props2.completeDelay,
          completeStyle = _props2.completeStyle,
          completeMessage = _props2.completeMessage,
          isError = _props2.isError,
          errorStyle = _props2.errorStyle,
          errorMessage = _props2.errorMessage;

      this.updateSelf();
      if (nextProps.isVisible == false && this.props.isVisible == true) {
        if (nextProps.isError) {
          this.setState({ errorStyle: errorStyle, isError: nextProps.isError, errorMessage: nextProps.errorMessage });
          setTimeout(function () {
            _this3.setState({ isVisible: false });
            _this3.resetState();
          }, completeDelay);
        } else {
          console.log('Toastr is going to invisible');
          this.setState({ completeStyle: completeStyle, completeMessage: completeMessage });
          setTimeout(function () {
            _this3.setState({ isVisible: false });
            _this3.resetState();
          }, completeDelay);
        }
      }if (nextProps.isVisible == true && this.props.isVisible == false) {
        this.setState({ isVisible: true });
        console.log('Toastr is going to visible');
      }
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
    key: 'resetState',
    value: function resetState() {
      var _this4 = this;

      setTimeout(function () {
        _this4._resetState();
      }, 300);
    }
  }, {
    key: '_resetState',
    value: function _resetState() {
      this.setState({ isVisible: false, timeoutStyle: {}, timeoutMessage: null, completeStyle: {}, completeMessage: null, isError: false, errorStyle: {}, errorMessage: null });
    }
  }, {
    key: 'updateSelf',
    value: function updateSelf() {
      var _this5 = this;

      var _state = this.state,
          isVisible = _state.isVisible,
          toastrStyle = _state.toastrStyle,
          timeoutStyle = _state.timeoutStyle,
          timeoutMessage = _state.timeoutMessage,
          completeStyle = _state.completeStyle,
          completeMessage = _state.completeMessage,
          isError = _state.isError,
          errorStyle = _state.errorStyle,
          errorMessage = _state.errorMessage;

      this.updateAppendElement(_react2.default.createElement(
        'div',
        { key: this.uniqueId, className: 'toastr' + (isVisible ? ' __visible' : ''), style: Object.assign(toastrStyle ? toastrStyle : {}, timeoutStyle ? timeoutStyle : {}, completeStyle ? completeStyle : {}, errorStyle ? errorStyle : {}), onClick: function onClick() {
            return _this5._resetState();
          } },
        _react2.default.createElement(
          'div',
          { className: '__container' },
          timeoutMessage ? timeoutMessage : isError ? errorMessage : completeMessage ? completeMessage : this.props.children
        )
      ));
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Toastr;
}(_AppendBodyComponent3.default);

exports.default = Toastr;

Toastr.propTypes = {
  isVisible: _react.PropTypes.bool,
  timeout: _react.PropTypes.number,
  timeoutDelay: _react.PropTypes.number,
  timeoutStyle: _react.PropTypes.object,
  timeoutMessage: _react.PropTypes.string,
  toastrStyle: _react.PropTypes.object,
  completeDelay: _react.PropTypes.number,
  completeStyle: _react.PropTypes.object,
  completeMessage: _react.PropTypes.string,
  isError: _react.PropTypes.bool,
  errorMessage: _react.PropTypes.string,
  errorStyle: _react.PropTypes.object
};
Toastr.defaultProps = {
  completeStyle: {
    backgroundColor: '#00A79D',
    color: 'white'
  },
  errorStyle: {
    backgroundColor: '#FB1465',
    color: 'white'
  },
  timeoutStyle: {}
};