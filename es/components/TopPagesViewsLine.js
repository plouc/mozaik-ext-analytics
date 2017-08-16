function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveLine } from 'nivo';
import { mapResults } from '../lib/dto';

var mapper = mapResults({
    'ga:pagePath': 'page',
    'ga:pageviews': 'views'
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
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsLine.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            var data = [{
                id: 'views',
                data: mapper(apiData.results).map(function (_ref2) {
                    var page = _ref2.page,
                        views = _ref2.views;
                    return {
                        x: page,
                        y: Number(views)
                    };
                })
            }];

            body = React.createElement(ResponsiveLine, {
                data: data,
                margin: margin,
                theme: theme.charts,
                colors: theme.charts.colors,
                animate: false,
                axisLeft: axisLeft,
                axisBottom: axisBottom
            });
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title,
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null,
                icon: 'line-chart'
            }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return TopPagesViewsLine;
}(Component);

TopPagesViewsLine.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    apiData: PropTypes.shape({
        rows: PropTypes.array.isRequired
    }),
    theme: PropTypes.object.isRequired
};
TopPagesViewsLine.defaultProps = {
    title: 'Top pages views'
};
export default TopPagesViewsLine;