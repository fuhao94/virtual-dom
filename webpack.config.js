const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // 虚拟打包路径
    // publicPath: 'virtual',
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
  },
  devtool: 'cheap-source-map',
};
