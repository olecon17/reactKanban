'use strict';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/scripts');
const APP_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ReactStaticPlugin = require('react-static-webpack-plugin');


// put all the code of these packages in a single file
const VENDOR_LIBS = [
    'react',
    'react-dom',
    'react-router',
    'react-ga'
];

const WebPackConfig = {
    entry: {
        bundle: APP_DIR + '/app.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: PUBLIC_DIR,
        // place the generated files in /public/scripts directory and name them accordingly.
        filename: 'scripts/[name].[chunkhash].js',
        // chunk files, place them in /public/scripts directory and name them accordingly.
        chunkFilename: 'scripts/[name].[chunkhash].chunk.js',

        // path where the generated code chunks will be, in our case its the same dir.
        publicPath: '/',
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: "/.js$/",
                exclude: /node_modules/,
                loader: 'eslint-loader',
                include: APP_DIR
            },
            {
                loader: 'babel-loader',
                test: /.js$/,
                exclude: /node_modules/,
                include: APP_DIR,
                options: {
                    presets: [['env', {modules: false}], 'react'],
                    plugins: ['lodash', ['import', {libraryName: 'antd', style: 'css'}], 'syntax-dynamic-import']
                }
            },
            {
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                }),
                test: /.css$/
            },
            {
                loader: 'json-loader',
                test: /.json$/
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "styles.css",
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity,
        }),

        new HTMLWebpackPlugin({
            inject: false,
            filename: '200.html',
            template: 'scripts/200.ejs',
            minify: {
                collapseBooleanAttributes: true,
                removeComments: true,
                collapseWhitespace: true,
            }
        }),

    ],

    resolve: {
        alias: {
            app: APP_DIR,
            public: PUBLIC_DIR,
        },
        extensions: [ '.js', '.json' ]
    },
};

module.exports = WebPackConfig;