'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _nivo = require('nivo');

var _dto = require('../lib/dto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapResults = (0, _dto.resultsMapper)({
    'ga:pagePath': ['x'],
    'ga:pageviews': ['y', function (v) {
        return Number(v);
    }]
});

var margin = { top: 20, right: 20, bottom: 40, left: 60 };
var axisLeft = {
    legend: 'views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {};

var TopPagesViewsLine = function (_Component) {
    _inherits(TopPagesViewsLine, _Component);

    function TopPagesViewsLine() {
        _classCallCheck(this, TopPagesViewsLine);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesViewsLine.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsLine.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var data = [{
                id: 'views',
                data: mapResults(apiData.results)
            }];

            body = _react2.default.createElement(_nivo.ResponsiveLine, {
                data: data,
                margin: margin,
                theme: theme.charts,
                colors: theme.charts.colors,
                animate: false,
                axisLeft: axisLeft,
                axisBottom: axisBottom
            });
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title,
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null,
                icon: 'line-chart'
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return TopPagesViewsLine;
}(_react.Component);

TopPagesViewsLine.propTypes = {
    title: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        rows: _propTypes2.default.array.isRequired
    }),
    theme: _propTypes2.default.object.isRequired
};
TopPagesViewsLine.defaultProps = {
    title: 'Top pages views'
};
exports.default = TopPagesViewsLine;