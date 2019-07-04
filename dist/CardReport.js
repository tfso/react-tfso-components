var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  background-color: #FFF;\n  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral([" &&{\n  background: #f5f5f5;\n  min-height: 100px;\n  max-height: 150px;\n  padding: 10px 10px 0 10px;\n  position: relative;\n}"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral([" &&{\n  border-top: 1px solid #dadce0;\n  position: relative;\n  background-color: white;\n  :last-child{\n    padding-bottom: ", "px;\n  }  \n}"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral([" &&{\n  padding: 2px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral([" && {\n  font-size: 12px;\n}\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral([" && {\n  flex: 1;\n  font-weight: 500;\n  font-size: 13px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-grow: 1;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import OpenInNew from '@material-ui/icons/OpenInNew';
import IconButton from '@material-ui/core/IconButton';
import { withScreenSize } from './ScreenSize';
import { Tooltip } from '@material-ui/core';
import TfsoReport from './icons/TfsoReport';
var TitleContainer = styled.div(_templateObject());
var CustomHeader = styled(Typography)(_templateObject2());
var CustomDescription = styled(Typography)(_templateObject3());
var CustomIconButton = styled(IconButton)(_templateObject4());
var CustomContent = styled(CardContent)(_templateObject5(), function (_ref) {
  var theme = _ref.theme;
  return theme.mui.spacing.unit * 2;
});
var CustomArea = styled(CardActionArea)(_templateObject6());
var CustomViewArea = styled.div(_templateObject7());
export default withScreenSize((_temp =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CardReport, _PureComponent);

  function CardReport() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CardReport);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CardReport)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onClickLink = function (event, report) {
      _this.props.onClick(event, report);
    };

    return _this;
  }

  _createClass(CardReport, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          options = _this$props.options,
          screenSize = _this$props.screenSize;
      var report = React.createElement(CustomContent, null, React.createElement(TitleContainer, null, React.createElement(Tooltip, {
        title: options.title
      }, React.createElement(CustomHeader, {
        noWrap: true,
        gutterBottom: true,
        variant: "body1"
      }, this.props.options.title)), React.createElement(CustomIconButton, {
        color: "primary",
        onClick: function onClick(e) {
          _this2.onClickLink(e, options);
        }
      }, React.createElement(OpenInNew, null))), React.createElement(Tooltip, {
        title: options.description
      }, React.createElement(CustomDescription, {
        variant: "body2",
        color: "textSecondary",
        noWrap: true
      }, options.description)));
      var reportImage = React.createElement(CustomArea, {
        onClick: function onClick(e) {
          return _this2.onClickLink(e, options);
        }
      }, React.createElement(CustomViewArea, null, React.createElement(CardMedia, {
        component: options.image ? 'img' : function (props) {
          return React.createElement(TfsoReport, {
            style: {
              width: '100%',
              minHeight: '110px'
            }
          });
        },
        image: options.image ? options.image : 'dummy',
        title: options.title
      })));
      var desktopCard = React.createElement(Card, null, reportImage, report);
      var mobileList = React.createElement(Card, null, report);
      var mobile = screenSize.mobile;
      return mobile ? mobileList : desktopCard;
    }
  }]);

  return CardReport;
}(PureComponent), _temp));
//# sourceMappingURL=CardReport.js.map