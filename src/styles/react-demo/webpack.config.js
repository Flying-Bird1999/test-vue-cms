const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	mode: "development",
  entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'js/bundle.js'
	},
	devServer: {
		hot: true,
		port: 3000,
		open: true
	},
	resolve: {
		extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				type: 'asset',
				generator: {
					filename: 'img/[name]_[hash:6][ext]'
				}
			},
			{
				test: /\.(eot|ttf|woff2?)$/,
				type: "asset/resource",
				generator: {
					filename: "font/[name]_[hash:6][ext]"
				}
			},
			{
				test: /\.(js|jsx)$/,
				use: ["babel-loader?cacheDirectory=true"]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
				template: "./public/index.html",  //自定义模板
		}),
		new CleanWebpackPlugin()
	]
}