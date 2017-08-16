function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader, WidgetTable as Table, WidgetTableCell as Cell, WidgetTableHeadCell as HeadCell } from '@mozaik/ui';

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


        var items = React.createElement(WidgetLoader, null);
        if (apiData) {
            var rows = apiData.rows;

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
                            'page'
                        ),
                        React.createElement(
                            HeadCell,
                            null,
                            'views'
                        ),
                        React.createElement(
                            HeadCell,
                            null,
                            'avg. time'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    rows.map(function (row) {
                        return React.createElement(
                            'tr',
                            { key: row[0] },
                            React.createElement(
                                Cell,
                                null,
                                row[0]
                            ),
                            React.createElement(
                                Cell,
                                null,
                                row[1]
                            ),
                            React.createElement(
                                Cell,
                                null,
                                Number(row[2]).toFixed(2)
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
                title: title || 'Top pages views/avg. time',
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null,
                icon: 'line-chart'
            }),
            React.createElement(
                WidgetBody,
                null,
                items
            )
        );
    };

    return TopPages;
}(Component);

TopPages.propTypes = {
    id: PropTypes.number.isRequired,
    apiData: PropTypes.shape({
        rows: PropTypes.array.isRequired
    }),
    title: PropTypes.string
};
export default TopPages;