const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

module.exports = {
	mode: "production",
	entry: {
		app: './app/app.js',
		vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'redux-thunk']
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: '[name].js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					filename: 'vendor.js'
				}
			}
		},
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{ test: /\.jsx|\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['env', 'react']}},
			{
				test: /\.css$/,
				include: /stylesheets|node_modules/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file-loader"
			},{
                test: /\.less$/,
                use: [{
                  loader: 'style-loader',
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                    modifyVars: {
                         'primary-color': '#C10310',
                         'link-color': '#C10310',
                         'border-radius-base': '2px',
                    },
                        javascriptEnabled: true,
                    },
                }],
            }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		devFlagPlugin
	]

};
