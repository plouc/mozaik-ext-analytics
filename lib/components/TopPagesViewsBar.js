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
    'ga:pagePath': ['page'],
    'ga:pageviews': ['views', function (v) {
        return Number(v);
    }]
});

var margin = { top: 10, right: 20, bottom: 54, left: 140 };
var axisLeft = {
    format: function format(v) {
        if (v.length <= 14) return v;
        return v.slice(0, 14) + '\u2026';
    }
};
var axisBottom = {
    legend: 'avg. time',
    legendPosition: 'center',
    legendOffset: 36
};

var TopPagesViewsBar = function (_Component) {
    _inherits(TopPagesViewsBar, _Component);

    function TopPagesViewsBar() {
        _classCallCheck(this, TopPagesViewsBar);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesViewsBar.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsBar.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            body = _react2.default.createElement(_nivo.ResponsiveBar, {
                data: mapResults(apiData.results).reverse(),
                indexBy: 'page',
                keys: ['views'],
                groupMode: 'grouped',
                layout: 'horizontal',
                margin: margin,
                theme: theme.charts,
                colors: theme.charts.colors,
                labelsTextColor: 'inherit:darker(1.2)',
                labelsLinkColor: 'inherit',
                animate: false,
                enableLabels: false,
                xPadding: 0.3,
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

    return TopPagesViewsBar;
}(_react.Component);

TopPagesViewsBar.propTypes = {
    title: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        rows: _propTypes2.default.array.isRequired
    }),
    theme: _propTypes2.default.object.isRequired
};
TopPagesViewsBar.defaultProps = {
    title: 'Top pages views'
};
exports.default = TopPagesViewsBar;