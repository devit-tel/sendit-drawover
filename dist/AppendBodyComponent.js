'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appenedElements = {};

if (!document.querySelector('#DrawOver')) {
  var DrawOverElem = document.createElement('div');
  DrawOverElem.setAttribute('id', 'DrawOver');
  document.body.appendChild(DrawOverElem);
}
var appendElementContainer = document.querySelector('#DrawOver');

var getAppendedElements = function getAppendedElements() {
  var elements = [];
  var keys = Object.keys(appenedElements);
  var length = keys.length;
  if (length > 0) {
    keys.forEach(function (key) {
      elements.push(appenedElements[key]);
    });
  }
  return elements;
};

var AppendBodyComponent = function (_Component) {
  _inherits(AppendBodyComponent, _Component);

  function AppendBodyComponent(props) {
    _classCallCheck(this, AppendBodyComponent);

    var _this = _possibleConstructorReturn(this, (AppendBodyComponent.__proto__ || Object.getPrototypeOf(AppendBodyComponent)).call(this, props));

    _this.appendElementContainer = appendElementContainer;
    return _this;
  }

  _createClass(AppendBodyComponent, [{
    key: 'setAppendElementId',
    value: function setAppendElementId(id) {
      this.appendElementId = id;
    }
  }, {
    key: 'updateAppendElement',
    value: function updateAppendElement(content) {
      appenedElements[this.appendElementId] = content;
      this.updateAppendElements();
    }
  }, {
    key: 'updateAppendElements',
    value: function updateAppendElements() {
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        { className: 'DrawOver' },
        getAppendedElements()
      ), appendElementContainer);
    }
  }, {
    key: 'removeAppendElement',
    value: function removeAppendElement() {
      delete appenedElements[this.appendElementId];
      this.updateAppendElements();
    }
  }]);

  return AppendBodyComponent;
}(_react.Component);

exports.default = AppendBodyComponent;