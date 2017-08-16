"use strict";

exports.__esModule = true;
var mapEntry = exports.mapEntry = function mapEntry(mapping) {
    return function (entry) {
        var result = {};

        Object.keys(mapping).forEach(function (key) {
            var match = entry.find(function (d) {
                return d.col.name === key;
            });
            if (match) {
                result[mapping[key]] = match.value;
            }
        });

        return result;
    };
};

var mapResults = exports.mapResults = function mapResults(mapping) {
    return function (results) {
        return results.map(mapEntry(mapping));
    };
};