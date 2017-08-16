function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveTreeMap } from 'nivo';
import { mapResults } from '../lib/dto';

var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
};

var mapper = mapResults({
    'ga:pagePath': 'page',
    'ga:pageviews': 'views',
    'ga:avgTimeOnPage': 'avgTime'
});

var TopPagesViewsTreemap = function (_Component) {
    _inherits(TopPagesViewsTreemap, _Component);

    function TopPagesViewsTreemap() {
        _classCallCheck(this, TopPagesViewsTreemap);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesViewsTreemap.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsTreemap.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            var data = {
                id: 'views',
                children: mapper(apiData.results)
            };

            body = React.createElement(ResponsiveTreeMap, {
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

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title,
                count: apiData ? apiData.totalsForAllResults['ga:pageviews'] : null
            }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return TopPagesViewsTreemap;
}(Component);

TopPagesViewsTreemap.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    apiData: PropTypes.shape({
        rows: PropTypes.array.isRequired
    }),
    theme: PropTypes.object.isRequired
};
TopPagesViewsTreemap.defaultProps = {
    title: 'Top pages views'
};
export default TopPagesViewsTreemap;