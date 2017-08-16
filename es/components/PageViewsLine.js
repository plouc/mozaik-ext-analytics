function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash-es';
import moment from 'moment';
import { Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui';
import { ResponsiveLine } from 'nivo';

var margin = { top: 20, right: 20, bottom: 40, left: 60 };
var format = function format(d) {
    return moment(d).format('MM/DD');
};
var axisLeft = {
    legend: 'sessions/views',
    legendPosition: 'center',
    legendOffset: -40
};
var axisBottom = {
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
            var data = apiData.results.reduce(function (acc, entry) {
                var date = _.find(entry, function (d) {
                    return d.col.name === 'ga:date';
                });
                var views = _.find(entry, function (d) {
                    return d.col.name === 'ga:pageviews';
                });
                var sessions = _.find(entry, function (d) {
                    return d.col.name === 'ga:sessions';
                });

                if (date && views && sessions) {
                    var dateString = date.value.slice(0, 4) + '-' + date.value.slice(4, 6) + '-' + date.value.slice(6, 8);

                    acc[0].data.push({
                        x: dateString,
                        y: Number(views.value)
                    });
                    acc[1].data.push({
                        x: dateString,
                        y: Number(sessions.value)
                    });
                }

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