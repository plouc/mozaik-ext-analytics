'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var googleapis = require('googleapis');
var _ = require('lodash');
var analytics = googleapis.analytics('v3');

/**
 * API class for communicating with Analytics via googleapis.
 */

var API = function () {
    /**
     * @constructor
     * @param {string} email
     * @param {string} privateKey
     */
    function API(email, privateKey) {
        _classCallCheck(this, API);

        this.jwtClient = new googleapis.auth.JWT(email, null, privateKey, API.scopes);
    }

    API.prototype.authorize = function authorize() {
        var _this = this;

        return new Promise(function (resolve, reject) {
            _this.jwtClient.authorize(function (err, tokens) {
                if (err) {
                    console.error(err); // eslint-disable-line no-console

                    return reject(err);
                }

                resolve({ client: _this.jwtClient, tokens: tokens });
            });
        });
    };

    /**
     * Internal method for making requests to Analytics.
     *
     * @param  {function} method      - Optional alternative function to call in request
     * @param  {object}   params      - Params to provide to the method
     * @param  {function} [transform] - Optional function to parse/transform received data
     * @return {Promise} Promise
     */


    API.prototype.request = function request(method, params, transform) {
        return this.authorize().then(function (auth) {
            return new Promise(function (resolve, reject) {
                method(Object.assign({}, params, { auth: auth.client }), function (err, body) {
                    if (err) {
                        console.error(err); // eslint-disable-line no-console

                        return reject(err);
                    }

                    if (transform) return resolve(transform(body));

                    return resolve(body);
                });
            });
        });
    };

    // Ensure the given id is prefixed with ga:


    API.prototype.prefixId = function prefixId(id) {
        return (id || '').toString().match(/^ga:/) ? id : 'ga:' + id;
    };

    API.prototype.mapRequestResponse = function mapRequestResponse(res) {
        res.results = _.chain(res.rows).map(function (row) {
            return _.chain(row).map(function (val, index) {
                return {
                    value: val,
                    col: res.columnHeaders[index]
                };
            }).flatten().value();
        }).value();

        return res;
    };

    API.prototype.getAccountProfiles = function getAccountProfiles() {
        var params = {
            fields: 'items(name,webProperties(name,profiles(id,name)))'
        };

        var transform = function transform(res) {
            return _.chain(res.items).map(function (_ref) {
                var name = _ref.name,
                    webProperties = _ref.webProperties;

                return {
                    name: name,
                    properties: _.chain(webProperties).map(function (_ref2) {
                        var name = _ref2.name,
                            profiles = _ref2.profiles;
                        return { name: name, profiles: profiles };
                    }).value()
                };
            }).flatten().flatten().value();
        };

        // Retrieve summary info and pick the relevant info from it
        return this.request(analytics.management.accountSummaries.list, params, transform);
    };

    API.prototype.getTopPages = function getTopPages(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var params = {
            ids: this.prefixId(id),
            'start-date': opts.startDate || '30daysAgo',
            'end-date': opts.endDate || 'yesterday',
            'max-results': opts.maxResults || 10,
            dimensions: 'ga:pagePath',
            metrics: 'ga:pageviews,ga:avgTimeOnPage',
            sort: '-ga:pageviews'
        };

        return this.request(analytics.data.ga.get, params, this.mapRequestResponse);
    };

    API.prototype.getPageViews = function getPageViews(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var params = {
            ids: this.prefixId(id),
            'start-date': opts.startDate || '7daysAgo',
            'end-date': opts.endDate || 'yesterday',
            dimensions: 'ga:date',
            metrics: 'ga:pageviews,ga:sessions'
        };

        return this.request(analytics.data.ga.get, params, this.mapRequestResponse);
    };

    API.prototype.getBrowserInfo = function getBrowserInfo(id) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var params = {
            ids: this.prefixId(id),
            'start-date': opts.startDate || '7daysAgo',
            'end-date': opts.endDate || 'yesterday',
            dimensions: 'ga:browser,ga:browserVersion',
            metrics: 'ga:sessions',
            sort: 'ga:browser'
        };

        return this.request(analytics.data.ga.get, params, this.mapRequestResponse).then(function (data) {
            return {
                query: data.query,
                totalResults: data.totalResults,
                totals: _.chain(data.totalsForAllResults).mapKeys(function (v, k) {
                    return k.slice(3);
                }).mapValues(Number).value(),
                results: data.results.map(function (entry) {
                    return _(entry).keyBy(function (o) {
                        return o.col.name.slice(3);
                    }).mapValues(function (o, k) {
                        var v = o.value;
                        if (k === 'sessions') return Number(v);
                        return v;
                    }).value();
                })
            };
        });
    };

    return API;
}();

/**
 * Required scopes.
 *
 * @type {Array<string>}
 */


API.scopes = ['https://www.googleapis.com/auth/analytics', 'https://www.googleapis.com/auth/analytics.readonly'];

/**
 * Instantiate a new API client from given JSON service key file.
 *
 * @param {string} _jsonPath - path to the json service key file
 * @return {API}
 */
API.fromJSON = function (_jsonPath) {
    var jsonPath = path.isAbsolute(_jsonPath) ? _jsonPath : path.join(process.cwd(), _jsonPath);
    var key = require(jsonPath);

    return new API(key.client_email, key.private_key);
};

module.exports = API;