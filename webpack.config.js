const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})

module.exports = {
	mode: "development",
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3000',
		'webpack/hot/only-dev-server',
		"./app/app.js"
	],
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	devtool: 'eval-source-map',
	resolve: {
	    extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx|\.js?$/,
				loader: 'babel-loader',
				options: {
					plugins: [
						'react-hot-loader/babel'
					]
				},
				exclude: /node_modules/},
			{
				test: /\.jsx|\.js$/,
				exclude: /node_modules/,
				use: [
				'babel-loader?' + JSON.stringify({presets: ['env', 'react']}),
				{
					loader: 'eslint-loader'
				}]
			},
			{
				test: /\.css$/,
				include: /stylesheets|node_modules/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
            {
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
            },
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file-loader"
			}
		]
	},
	devServer: {
		contentBase: "./build",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		devFlagPlugin,
		new webpack.NoEmitOnErrorsPlugin()
	]

};
