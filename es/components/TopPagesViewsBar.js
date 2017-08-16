function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash-es';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveBar } from 'nivo';

var margin = { top: 20, right: 20, bottom: 40, left: 60 };
var axisLeft = {
    legend: 'views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {};

var TopPagesViewsBar = function (_Component) {
    _inherits(TopPagesViewsBar, _Component);

    function TopPagesViewsBar() {
        _classCallCheck(this, TopPagesViewsBar);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TopPagesViewsBar.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            dimensions = _ref.dimensions,
            startDate = _ref.startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.topPages.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, dimensions: dimensions, startDate: startDate, endDate: endDate }
        };
    };

    TopPagesViewsBar.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            var data = [{
                id: 'views',
                data: apiData.results.reduce(function (acc, entry) {
                    var page = _.find(entry, function (d) {
                        return d.col.name === 'ga:pagePath';
                    });
                    var pageViews = _.find(entry, function (d) {
                        return d.col.name === 'ga:pageviews';
                    });

                    if (page && pageViews) {
                        return [].concat(acc, [{
                            x: page.value,
                            y: Number(pageViews.value)
                        }]);
                    }

                    return acc;
                }, [])
            }];

            body = React.createElement(ResponsiveBar, {
                data: data,
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