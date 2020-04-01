const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = "dist";

module.exports = {
	entry: ['@babel/polyfill', './client/index.js'],
	devServer: { port: 3000, open: true, hot: true, proxy: { "/api/*": "http://localhost:8000" } },
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, use: {loader: "babel-loader"}},
			{test: /\.css$/, use: ['style-loader', 'css-loader',]},
			{test: /\.(png|svg|jpg|gif)$/, use: ['file-loader',]},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: "client/static/index.html", favicon: "client/static/favicon.ico"}),
		new webpack.HotModuleReplacementPlugin()
	],
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory) },
};
