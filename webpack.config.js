const webpack = require('webpack');
const path = require('path');

const entry = [
	'./src/components/index.js'
];

const output = {
	path: path.resolve(__dirname, 'dist'),
	publicPath: '/dist/',
	filename: 'main.js',
};
  
module.exports = {
	mode: 'production', 
	performance: { hints: false },
	entry, 
	output,
	devtool: 'eval-source-map',
	module: {
		rules : [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties']
				},
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
		],
	},
};    



// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlPlugin = new HtmlWebPackPlugin({
//   template: "./src/index.html",
//   filename: "./index.html"
// });

// module.exports = {
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           loader: "babel-loader",
//           options: {
//             presets: ["env", "react"]
//           }
//         },
//         {
//           test: /\.css$/,
//           use: ["style-loader", "css-loader"]
//         }
//       ]
//     },
//     plugins: [htmlPlugin]
//   };
