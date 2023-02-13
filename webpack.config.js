const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin'); 

module.exports = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'img/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      }
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    // new FileManagerPlugin({
    //   events: {
    //     onStart: {
    //       delete: ['dist'],
    //     },
    //     onEnd: {
    //       copy: [
    //         {
    //           source: path.join('src', 'staticImg'),
    //           destination: 'dist',
    //         },
    //       ],
    //     },
    //   },
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};