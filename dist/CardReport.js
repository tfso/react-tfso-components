var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject5() {
  var data = _taggedTemplateLiteral([" &&{\n  width: 250px;\n}"]);

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
import _ from 'lodash';
import { withScreenSize } from './ScreenSize';
import { Tooltip } from '@material-ui/core';
var TitleContainer = styled.div(_templateObject());
var CustomHeader = styled(Typography)(_templateObject2());
var CustomDescription = styled(Typography)(_templateObject3());
var CustomIconButton = styled(IconButton)(_templateObject4());
var CustomCard = styled(Card)(_templateObject5());
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
      console.log('navigate to report:' + report.url);

      _this.props.onClick(event, report);
    };

    return _this;
  }

  _createClass(CardReport, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var report = React.createElement(CardContent, {
        style: {
          borderTop: '1px solid #dadce0'
        }
      }, React.createElement(TitleContainer, null, React.createElement(Tooltip, {
        title: this.props.options.title
      }, React.createElement(CustomHeader, {
        noWrap: true,
        gutterBottom: true,
        variant: "body1"
      }, this.props.translate(_.capitalize(this.props.options.title)))), React.createElement(CustomIconButton, {
        color: "primary",
        onClick: function onClick(e) {
          _this2.onClickLink(e, _this2.props.options);
        }
      }, React.createElement(OpenInNew, null))), React.createElement(Tooltip, {
        title: this.props.options.description
      }, React.createElement(CustomDescription, {
        variant: "body2",
        color: "textSecondary",
        noWrap: true
      }, this.props.translate(_.capitalize(this.props.options.description)))));
      var reportImage = React.createElement(CardActionArea, {
        onClick: function onClick(e) {
          return _this2.onClickLink(e, _this2.props.options);
        }
      }, React.createElement(CardMedia, {
        style: {
          height: '100px',
          backgroundColor: '#f5f5f5',
          padding: '10px 10px 0 10px'
        },
        component: "img",
        image: this.props.options.image ? this.props.options.image : 'data:image/png;base64,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',
        title: this.props.translate(_.capitalize(this.props.options.title))
      }));
      var desktopCard = React.createElement(CustomCard, null, reportImage, report);
      var mobileList = React.createElement(Card, null, report);
      var mobile = this.props.screenSize.mobile;
      return mobile ? mobileList : desktopCard;
    }
  }]);

  return CardReport;
}(PureComponent), _temp));
//# sourceMappingURL=CardReport.js.map