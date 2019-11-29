import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
    entry: './src/index.tsx',
    resolve: {
        extensions:['.ts', '.tsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        port: 3000,
        publicPath: '/',
        historyApiFallback: true
    }
}

export default config;