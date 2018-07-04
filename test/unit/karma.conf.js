// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf');
var reporters = ['spec', 'coverage'];

function isDebug(argument) {
    return argument === '--debug';
}
if (process.argv.some(isDebug)) {
    reporters = [];
}

function parseTestPattern(argv) {
    let found = false;
    const pattern = argv.map(function(v) {
        if (found) {
            return v;
        }
        if (v === '--') {
            found = true;
        }
    }).filter(function(a) { return a; }).join(' ');
    return pattern ? ['--grep', pattern] : [];
}

module.exports = function(config) {
    config.set({
        // to run in additional browsers:
        // 1. install corresponding karma launcher
        //    http://karma-runner.github.io/0.13/config/browsers.html
        // 2. add it to the `browsers` array below.
        browsers: ['PhantomJS', 'Chrome'],
        frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
        reporters: reporters,
        files: [
            '../../node_modules/babel-polyfill/dist/polyfill.js',
            './index.js'
        ],
        exclude: [
            './coverage/**/*.js'
        ],
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        },
        client: {
            args: parseTestPattern(process.argv)
        }
    });
};
