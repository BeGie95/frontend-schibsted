const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Schibsted frontend task app',
      meta: {
        description:
          'Schibsted Frontend Assignment - a frontend application that will display list of article previews.',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
