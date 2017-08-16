var convict = require('convict');

var config = convict({
    analytics: {
        googleServiceEmail: {
            doc: 'The google email address generated by developer console',
            default: '',
            format: String,
            env: 'GOOGLE_SERVICE_EMAIL'
        },
        googleServiceKeypath: {
            doc: 'Absolute path to service account json file',
            default: '',
            format: String,
            env: 'GOOGLE_SERVICE_KEYPATH'
        },
        googleServiceKey: {
            doc: 'Contents of the .PEM file. Either key or keypath is required',
            default: '',
            format: String,
            env: 'GOOGLE_SERVICE_KEY'
        }
    }
});

module.exports = config;