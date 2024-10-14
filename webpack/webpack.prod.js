const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const ZipPlugin = require('zip-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
      new ZipPlugin({
        filename: 'extension.zip', // Name of the output ZIP file
        path: path.resolve(__dirname, '../'), // Destination directory for the ZIP
        include: [/\.js$/, /\.json$/, /\.html$/, /\.css$/, /\.png$/], // File types to include
        exclude: [/\.map$/], // File types to exclude
        compressionOptions: {
          level: 9, // Maximum compression level
        },
      }),
    ],
  });