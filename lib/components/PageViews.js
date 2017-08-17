'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ui = require('@mozaik/ui');

var _nivo = require('nivo');

var _dto = require('../lib/dto');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapResults = (0, _dto.resultsMapper)({
    'ga:date': ['date'],
    'ga:pageviews': ['views', function (v) {
        return Number(v);
    }],
    'ga:sessions': ['sessions', function (v) {
        return Number(v);
    }]
});

var margin = { top: 20, right: 30, bottom: 54, left: 60 };
var format = function format(d) {
    return (0, _moment2.default)(d, 'YYYYMMDD').format('MM/DD');
};
var axisLeft = {
    legend: 'sessions/views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    tickRotation: -60,
    format: format
};

var PageViews = function (_Component) {
    _inherits(PageViews, _Component);

    function PageViews() {
        _classCallCheck(this, PageViews);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PageViews.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            _ref$startDate = _ref.startDate,
            startDate = _ref$startDate === undefined ? PageViews.defaultProps.startDate : _ref$startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.pageViews.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    PageViews.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            body = _react2.default.createElement(_nivo.ResponsiveBar, {
                data: mapResults(apiData.results),
                indexBy: 'date',
                keys: ['sessions', 'views'],
                margin: margin,
                groupMode: 'grouped',
                xPadding: 0.3,
                theme: theme.charts,
                colors: theme.charts.colors,
                enableLabels: false,
                axisLeft: axisLeft,
                axisBottom: axisBottom,
                animate: false
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

    return PageViews;
}(_react.Component);

PageViews.propTypes = {
    id: _propTypes2.default.number.isRequired,
    title: _propTypes2.default.string,
    dateFormat: _propTypes2.default.string,
    startDate: _propTypes2.default.string,
    endDate: _propTypes2.default.string,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    tickCount: _propTypes2.default.number,
    theme: _propTypes2.default.object.isRequired,
    apiData: _propTypes2.default.shape({
        results: _propTypes2.default.array.isRequired
    })
};
PageViews.defaultProps = {
    title: 'sessions/page views',
    dateFormat: 'YYYY-MM-DD',
    startDate: '30daysAgo'
};
exports.default = PageViews;