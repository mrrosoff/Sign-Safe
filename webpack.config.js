const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = "dist";

module.exports = {
	entry: ['@babel/polyfill', './Client/index.js'],
	devServer: { port: 3000, open: false, hot: true, historyApiFallback: true },
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", options: { presets: ["@babel/preset-env", "@babel/preset-react"]}},
			{test: /\.css$/, loader: ['style-loader', 'CSS-loader',]},
			{test: /\.(png|svg|jpg|gif)$/, loader: ['file-loader',]},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: "Client/Static/HTML/index.html", favicon: "Client/Static/HTML/favicon.ico"}),
		new webpack.HotModuleReplacementPlugin()
	],
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory) },
};
