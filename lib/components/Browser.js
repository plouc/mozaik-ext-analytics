'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Browser = function (_Component) {
    _inherits(Browser, _Component);

    function Browser() {
        _classCallCheck(this, Browser);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Browser.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.browser.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    Browser.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData;


        var items = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var results = apiData.results;

            items = _react2.default.createElement(
                _ui.WidgetTable,
                null,
                _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            _ui.WidgetTableHeadCell,
                            null,
                            'browser'
                        ),
                        _react2.default.createElement(
                            _ui.WidgetTableHeadCell,
                            null,
                            'version'
                        ),
                        _react2.default.createElement(
                            _ui.WidgetTableHeadCell,
                            null,
                            'sessions'
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    results.map(function (row) {
                        return _react2.default.createElement(
                            'tr',
                            { key: row.browser + '.' + row.browserVersion },
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                row.browser
                            ),
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                row.browserVersion
                            ),
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                row.sessions
                            )
                        );
                    })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title,
                count: apiData ? apiData.totals.sessions : null,
                icon: 'line-chart'
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                items
            )
        );
    };

    return Browser;
}(_react.Component);

Browser.propTypes = {
    title: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        totals: _propTypes2.default.object.isRequired,
        results: _propTypes2.default.array.isRequired
    })
};
Browser.defaultProps = {
    title: 'Browser'
};
exports.default = Browser;