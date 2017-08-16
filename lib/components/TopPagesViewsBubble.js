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

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
};

var mapper = (0, _dto.mapResults)({
    'ga:pagePath': 'page',
    'ga:pageviews': 'views',
    'ga:avgTimeOnPage': 'avgTime'
});

var TopPagesViewsBubble = function (_Component) {
    _inherits(TopPagesViewsBubble, _Component);

    function TopPagesViewsBubble() {
        _classCallCheck(this, TopPagesViewsBubble);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesViewsBubble.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsBubble.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var data = {
                id: 'views',
                children: mapper(apiData.results)
            };

            body = _react2.default.createElement(_nivo.ResponsiveBubble, {
                margin: margin,
                identity: 'page',
                value: 'views',
                root: data,
                colors: theme.charts.colors,
                colorBy: 'page',
                leavesOnly: true,
                innerPadding: 2,
                enableLabels: true,
                animate: false,
                label: 'page',
                labelTextColor: 'inherit:darker(1.2)'
            });
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title,
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return TopPagesViewsBubble;
}(_react.Component);

TopPagesViewsBubble.propTypes = {
    title: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        rows: _propTypes2.default.array.isRequired
    }),
    theme: _propTypes2.default.object.isRequired
};
TopPagesViewsBubble.defaultProps = {
    title: 'Top pages views'
};
exports.default = TopPagesViewsBubble;