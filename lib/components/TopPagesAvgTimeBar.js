'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nivo = require('nivo');

var _ui = require('@mozaik/ui');

var _dto = require('../lib/dto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapper = (0, _dto.mapResults)({
    'ga:pagePath': 'page',
    'ga:avgTimeOnPage': 'avgTime'
});

var margin = { top: 20, right: 20, bottom: 40, left: 60 };
var axisLeft = {
    legend: 'avg. time',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {};

var TopPagesAvgTimeBar = function (_Component) {
    _inherits(TopPagesAvgTimeBar, _Component);

    function TopPagesAvgTimeBar() {
        _classCallCheck(this, TopPagesAvgTimeBar);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesAvgTimeBar.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesAvgTimeBar.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var data = [{
                id: 'avg. time',
                data: mapper(apiData.results).map(function (_ref2) {
                    var page = _ref2.page,
                        avgTime = _ref2.avgTime;
                    return {
                        x: page,
                        y: Number(avgTime).toFixed(2)
                    };
                })
            }];

            body = _react2.default.createElement(_nivo.ResponsiveBar, {
                data: data,
                margin: margin,
                theme: theme.charts,
                colors: theme.charts.colors,
                enableLabels: false,
                animate: false,
                xPadding: 0.3,
                axisLeft: axisLeft,
                axisBottom: axisBottom
            });
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, { title: title, icon: 'line-chart' }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return TopPagesAvgTimeBar;
}(_react.Component);

TopPagesAvgTimeBar.propTypes = {
    title: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        rows: _propTypes2.default.array.isRequired
    }),
    theme: _propTypes2.default.object.isRequired
};
TopPagesAvgTimeBar.defaultProps = {
    title: 'Top pages avg. time'
};
exports.default = TopPagesAvgTimeBar;