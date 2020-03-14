const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.tsx',
  target: 'electron-renderer',
  output: {
    filename: 'renderer.js',
  },

  devtool: 'source-map',
  devServer: {
    publicPath: 'dist/',
    hot: true,
    port: process.env.DEV_PORT,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  // plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HotModuleReplacementPlugin({}),
  ],
};