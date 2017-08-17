export var mapEntry = function mapEntry(mapping) {
    return function (entry) {
        var result = {};

        Object.keys(mapping).forEach(function (key) {
            var match = entry.find(function (d) {
                return d.col.name === key;
            });
            if (match) {
                var transform = mapping[key][1];
                result[mapping[key][0]] = transform ? transform(match.value) : match.value;
            }
        });

        return result;
    };
};

export var resultsMapper = function resultsMapper(mapping) {
    return function (results) {
        return results.map(mapEntry(mapping));
    };
};