const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// vue.config.js
module.exports = {
    css: {
        extract: {
            filename: 'css/cookieconsent.css',
            chunkFilename: 'css/cookieconsent.css',
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: path.resolve(__dirname, 'dist/index.html'),
                inject: 'head',
            }),
        ],
        output: {
            filename: 'js/cookieconsent.js',
            chunkFilename: 'js/cookieconsent.js',
            libraryTarget: 'umd',
            library: 'Cookieconsent',
            libraryExport: 'default',
        },
    },
    chainWebpack: (config) => {
        // remove the old loader
        config.module.rules.delete('svg');

        // add the new one
        config.module.rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .use()
            .loader('url-loader')
            .options({
                limit: 16000,
                name: 'img/[name].[hash:8].[ext]',
            });
    },
};
