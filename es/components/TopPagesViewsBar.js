function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveBar } from 'nivo';
import { resultsMapper } from '../lib/dto';

var mapResults = resultsMapper({
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


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            body = React.createElement(ResponsiveBar, {
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

    return TopPagesViewsBar;
}(Component);

TopPagesViewsBar.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    apiData: PropTypes.shape({
        rows: PropTypes.array.isRequired
    }),
    theme: PropTypes.object.isRequired
};
TopPagesViewsBar.defaultProps = {
    title: 'Top pages views'
};
export default TopPagesViewsBar;