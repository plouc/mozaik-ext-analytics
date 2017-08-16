'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ui = require('@mozaik/ui');

var _nivo = require('nivo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var margin = { top: 20, right: 20, bottom: 40, left: 60 };
var format = function format(d) {
    return (0, _moment2.default)(d).format('MM/DD');
};
var axisLeft = {
    legend: 'sessions/views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    format: format
};

var PageViewsLine = function (_Component) {
    _inherits(PageViewsLine, _Component);

    function PageViewsLine() {
        _classCallCheck(this, PageViewsLine);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PageViewsLine.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            _ref$startDate = _ref.startDate,
            startDate = _ref$startDate === undefined ? PageViewsLine.defaultProps.startDate : _ref$startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.pageViews.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    PageViewsLine.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var data = apiData.results.reduce(function (acc, entry) {
                var date = _lodash2.default.find(entry, function (d) {
                    return d.col.name === 'ga:date';
                });
                var views = _lodash2.default.find(entry, function (d) {
                    return d.col.name === 'ga:pageviews';
                });
                var sessions = _lodash2.default.find(entry, function (d) {
                    return d.col.name === 'ga:sessions';
                });

                if (date && views && sessions) {
                    var dateString = date.value.slice(0, 4) + '-' + date.value.slice(4, 6) + '-' + date.value.slice(6, 8);

                    acc[0].data.push({
                        x: dateString,
                        y: Number(views.value)
                    });
                    acc[1].data.push({
                        x: dateString,
                        y: Number(sessions.value)
                    });
                }

                return acc;
            }, [{
                id: 'views',
                data: []
            }, {
                id: 'sessions',
                data: []
            }]);

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
            _react2.default.createElement(_ui.WidgetHeader, { title: title, icon: 'line-chart' }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return PageViewsLine;
}(_react.Component);

PageViewsLine.propTypes = {
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
PageViewsLine.defaultProps = {
    title: 'sessions/page views',
    dateFormat: 'YYYY-MM-DD',
    startDate: '14daysAgo'
};
exports.default = PageViewsLine;