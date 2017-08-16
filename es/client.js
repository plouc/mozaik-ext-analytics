var chalk = require('chalk');
var config = require('./config');
var API = require('./api');

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var api = void 0;

    // Either key or keyPath is required
    var key = config.get('analytics.googleServiceKey');
    if (!key) {
        var keyPath = config.get('analytics.googleServiceKeypath');

        if (!keyPath) {
            mozaik.logger.error(chalk.red('No key or key path defined'));
            process.exit(1);
        }

        try {
            api = API.fromJSON(keyPath);
        } catch (err) {
            mozaik.logger.error(chalk.red('An error occurred while loading key file'));
            process.exit(1);
        }
    } else {
        api = new API(config.get('analytics.googleServiceEmail'), key);
    }

    var operations = {
        pageViews: function pageViews(_ref) {
            var id = _ref.id,
                startDate = _ref.startDate,
                endDate = _ref.endDate;

            mozaik.logger.info(chalk.yellow('[g-analytics] calling page views (' + id + ', ' + startDate + ', ' + endDate + ')'));

            return api.getPageViews(id, { startDate: startDate, endDate: endDate });
        },
        topPages: function topPages(_ref2) {
            var id = _ref2.id,
                dimensions = _ref2.dimensions,
                startDate = _ref2.startDate,
                endDate = _ref2.endDate;

            mozaik.logger.info(chalk.yellow('[g-analytics] calling top pages (' + id + ', ' + startDate + ', ' + endDate + ')'));

            return api.getTopPages(id, { dimensions: dimensions, startDate: startDate, endDate: endDate });
        },
        browser: function browser(_ref3) {
            var id = _ref3.id,
                startDate = _ref3.startDate,
                endDate = _ref3.endDate;

            mozaik.logger.info(chalk.yellow('[g-analytics] calling browser (' + id + ', ' + startDate + ', ' + endDate + ')'));

            return api.getBrowserInfo(id, { startDate: startDate, endDate: endDate });
        }
    };

    return operations;
};

module.exports = client;