var path = require('path');
var webpack = require('webpack');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var APP_PATH = path.resolve(__dirname, './src/app.jsx');
var MAIN_PATH = path.resolve(__dirname, './app/main.js');
var BUILD_PATH = path.resolve(__dirname, './app');

var config = {
    entry: {
        bundle: APP_PATH
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader?presets[]=es2015,presets[]=react'],
            exclude: /node_modules/
        },
        {
            test: /\.css?$/,
            loader: 'style-loader!css-loader'
        }]
    },
    target: "electron",
    // node: {
    //     __dirname: false,
    //     __filename: false
    // },
    // target: 'node',
    // node: {
    // 	fs: "empty"
    // },
    devtool: 'source-map',
    devServer: {
        contentBase: "./app",
        noInfo: true,
        hot: true,
        inline: true,
        publicPath: 'http://localhost:8080/',
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        stats: {
            colors: true
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new openBrowserWebpackPlugin({ url: 'http://localhost:8080' })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {

        }
    }
}

module.exports = config