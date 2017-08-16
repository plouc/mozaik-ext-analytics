function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveBar } from 'nivo';
import { mapResults } from '../lib/dto';

var mapper = mapResults({
    'ga:date': 'date',
    'ga:pageviews': 'views',
    'ga:sessions': 'sessions'
});

var margin = { top: 20, right: 30, bottom: 40, left: 60 };
var format = function format(d) {
    return moment.unix(d).format('MM/DD');
};
var axisLeft = {
    legend: 'sessions/views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    format: format
};

var PageViews = function (_Component) {
    _inherits(PageViews, _Component);

    function PageViews() {
        _classCallCheck(this, PageViews);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PageViews.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            _ref$startDate = _ref.startDate,
            startDate = _ref$startDate === undefined ? PageViews.defaultProps.startDate : _ref$startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.pageViews.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    PageViews.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            var data = mapper(apiData.results).reduce(function (acc, entry) {
                acc[0].data.push({
                    x: entry.date,
                    y: Number(entry.sessions)
                });
                acc[1].data.push({
                    x: entry.date,
                    y: Number(entry.views)
                });

                return acc;
            }, [{
                id: 'sessions',
                data: []
            }, {
                id: 'views',
                data: []
            }]);

            body = React.createElement(ResponsiveBar, {
                data: data,
                margin: margin,
                groupMode: 'grouped',
                xPadding: 0.3,
                theme: theme.charts,
                colors: theme.charts.colors,
                enableLabels: false,
                axisLeft: axisLeft,
                axisBottom: axisBottom,
                animate: false
            });
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, { title: title, icon: 'line-chart' }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return PageViews;
}(Component);

PageViews.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    dateFormat: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    tickCount: PropTypes.number,
    theme: PropTypes.object.isRequired,
    apiData: PropTypes.shape({
        results: PropTypes.array.isRequired
    })
};
PageViews.defaultProps = {
    title: 'sessions/page views',
    dateFormat: 'YYYY-MM-DD',
    startDate: '30daysAgo'
};
export default PageViews;