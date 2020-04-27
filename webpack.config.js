const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = "Dist";

module.exports = {
	entry: ['@babel/polyfill', './index.js'],
	devServer: { port: 3000, open: false, hot: true, historyApiFallback: true },
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", options: { presets: ["@babel/preset-env", "@babel/preset-react"]}},
			{test: /\.css$/, use: ['style-loader', 'css-loader',]},
			{test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']},
			{test: /\.(png|svg|jpg|gif)$/, use: ['file-loader',]},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ template: "Static/HTML/index.html", favicon: "Static/HTML/favicon.ico"}),
		new webpack.HotModuleReplacementPlugin()
	],
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory) },
};
