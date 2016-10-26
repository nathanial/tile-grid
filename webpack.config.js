var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
	target: 'web',
	entry: ["./src/index.tsx"],
	output: {
		path: __dirname + '/dist',
		filename: "tile-grid.js"
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		root: [
			path.join(__dirname, "node_modules")
		],
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".less"]
	},

	module: {
		loaders: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css!less")
			}
		],

		preLoaders: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: "source-map-loader" }
		]
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},

	plugins: [
		new CopyWebpackPlugin([
			// {output}/file.txt
			{ from: 'src/index.html' }
		]),
		new ExtractTextPlugin("[name].css")
	],

	devServer: {
		contentBase: "./dist"
	}
};
