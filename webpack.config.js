const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ["./src/vue-waiting.js"],
  output: {
    library: "VueWaiting",
    libraryTarget: "umd",
    filename: "vue-waiting.js",
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
