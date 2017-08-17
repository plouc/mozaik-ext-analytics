function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader, WidgetTable as Table, WidgetTableCell as Cell, WidgetTableHeadCell as HeadCell } from '@mozaik/ui';

var Browser = function (_Component) {
    _inherits(Browser, _Component);

    function Browser() {
        _classCallCheck(this, Browser);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Browser.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.browser.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    Browser.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData;


        var items = React.createElement(WidgetLoader, null);
        if (apiData) {
            var results = apiData.results;

            items = React.createElement(
                Table,
                null,
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            HeadCell,
                            null,
                            'browser'
                        ),
                        React.createElement(
                            HeadCell,
                            null,
                            'version'
                        ),
                        React.createElement(
                            HeadCell,
                            null,
                            'sessions'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    results.map(function (row) {
                        return React.createElement(
                            'tr',
                            { key: row.browser + '.' + row.browserVersion },
                            React.createElement(
                                Cell,
                                null,
                                row.browser
                            ),
                            React.createElement(
                                Cell,
                                null,
                                row.browserVersion
                            ),
                            React.createElement(
                                Cell,
                                null,
                                row.sessions
                            )
                        );
                    })
                )
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title,
                count: apiData ? apiData.totals.sessions : null,
                icon: 'line-chart'
            }),
            React.createElement(
                WidgetBody,
                null,
                items
            )
        );
    };

    return Browser;
}(Component);

Browser.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    apiData: PropTypes.shape({
        totals: PropTypes.object.isRequired,
        results: PropTypes.array.isRequired
    })
};
Browser.defaultProps = {
    title: 'Browser'
};
export default Browser;