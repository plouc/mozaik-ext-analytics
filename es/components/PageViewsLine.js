function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveLine } from 'nivo';
import { resultsMapper } from '../lib/dto';

var mapResults = resultsMapper({
    'ga:date': ['date'],
    'ga:pageviews': ['views', function (v) {
        return Number(v);
    }],
    'ga:sessions': ['sessions', function (v) {
        return Number(v);
    }]
});

var margin = { top: 20, right: 20, bottom: 54, left: 60 };
var format = function format(d) {
    return moment(d, 'YYYYMMDD').format('MM/DD');
};
var axisLeft = {
    legend: 'sessions/views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
    tickRotation: -60,
    format: format
};

var PageViewsLine = function (_Component) {
    _inherits(PageViewsLine, _Component);

    function PageViewsLine() {
        _classCallCheck(this, PageViewsLine);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PageViewsLine.getApiRequest = function getApiRequest(_ref) {
        var id = _ref.id,
            _ref$startDate = _ref.startDate,
            startDate = _ref$startDate === undefined ? PageViewsLine.defaultProps.startDate : _ref$startDate,
            endDate = _ref.endDate;

        return {
            id: 'analytics.pageViews.' + id + '.' + (startDate || '') + '.' + (endDate || ''),
            params: { id: id, startDate: startDate, endDate: endDate }
        };
    };

    PageViewsLine.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            apiData = _props.apiData,
            theme = _props.theme;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            var data = mapResults(apiData.results).reduce(function (acc, _ref2) {
                var date = _ref2.date,
                    views = _ref2.views,
                    sessions = _ref2.sessions;

                acc[0].data.push({
                    x: date,
                    y: views
                });
                acc[1].data.push({
                    x: date,
                    y: sessions
                });

                return acc;
            }, [{
                id: 'views',
                data: []
            }, {
                id: 'sessions',
                data: []
            }]);

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
            React.createElement(WidgetHeader, { title: title, icon: 'line-chart' }),
            React.createElement(
                WidgetBody,
                { style: { overflowY: 'hidden' } },
                body
            )
        );
    };

    return PageViewsLine;
}(Component);

PageViewsLine.propTypes = {
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
PageViewsLine.defaultProps = {
    title: 'sessions/page views',
    dateFormat: 'YYYY-MM-DD',
    startDate: '14daysAgo'
};
export default PageViewsLine;