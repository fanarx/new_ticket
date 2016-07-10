module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
};
