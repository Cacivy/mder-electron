var path = require('path');
var webpack = require('webpack');

var MAIN_PATH = path.resolve(__dirname, './app/main.js');
var BUILD_PATH = path.resolve(__dirname, './build');


var config = {
    entry: {
        main: MAIN_PATH
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loaders: ['babel-loader?presets[]=es2015'],
            exclude: /node_modules/
        }]
    },
    node: {
        __dirname: true
    },
    target: "electron",
    resolve: {
        extensions: ['', '.js'],
        alias: {

        }
    }
}

module.exports = config