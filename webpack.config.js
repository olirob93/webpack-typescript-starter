const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack')
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

let webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[id].[hash:10].js',
    chunkFilename: '[id].[chunkhash:10].chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      chunks: isDev ? 'async' : 'all'
    }
  },  
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10240,
              name: '[name].[hash:10].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      filename: 'index.html',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 100000,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {from: path.resolve('./public/manifest.json'), to: 'manifest.json'},
        {from: path.resolve('./public/robots.txt'), to: 'robots.txt'}
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    hotOnly: true,
    open: true,
    quiet: true
  }
};

if (isDev) {
  webpackConfig.entry.main = ['react-hot-loader/patch', './src/index.tsx'];
  webpackConfig.resolve = {
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  };
  webpackConfig.plugins.push(new Dotenv());
  webpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin());

  delete webpackConfig.optimization;
} else {
  webpackConfig.plugins.push(
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  )
};

module.exports = webpackConfig
  


