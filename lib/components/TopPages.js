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

var TopPages = function (_Component) {
    _inherits(TopPages, _Component);

    function TopPages() {
        _classCallCheck(this, TopPages);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPages.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPages.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData;


        var items = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            var rows = apiData.rows;

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
                            'page'
                        ),
                        _react2.default.createElement(
                            _ui.WidgetTableHeadCell,
                            null,
                            'views'
                        ),
                        _react2.default.createElement(
                            _ui.WidgetTableHeadCell,
                            null,
                            'avg. time'
                        )
                    )
                ),
                _react2.default.createElement(
                    'tbody',
                    null,
                    rows.map(function (row) {
                        return _react2.default.createElement(
                            'tr',
                            { key: row[0] },
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                row[0]
                            ),
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                row[1]
                            ),
                            _react2.default.createElement(
                                _ui.WidgetTableCell,
                                null,
                                Number(row[2]).toFixed(2)
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
                title: title || 'Top pages views/avg. time',
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null,
                icon: 'line-chart'
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                items
            )
        );
    };

    return TopPages;
}(_react.Component);

TopPages.propTypes = {
    id: _propTypes2.default.number.isRequired,
    apiData: _propTypes2.default.shape({
        rows: _propTypes2.default.array.isRequired
    }),
    title: _propTypes2.default.string
};
exports.default = TopPages;