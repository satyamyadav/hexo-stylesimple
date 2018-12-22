const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
  mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: { hexo: "./webpack/sass/hexo" }, // string | object | array  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "../source"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: 'js/[name].js',
    publicPath: "/", // string    // the url to the output directory resolved relative to the HTML page
    library: "MyLibrary", // string,
    // the name of the exported library
    libraryTarget: "umd", // universal module definition    // the type of the exported library
    /* Advanced output configuration (click to show) */
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../css'
            }
          },
          // "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      // rules for modules (configure loaders, parser options, etc.)

    ],
    /* Advanced module configuration (click to show) */
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules",
      // path.resolve(__dirname, "app")
    ],
    // directories where to look for modules
    extensions: ['.min.js', '.js', '.json', '.scss']
    // extensions that are used
  },
  performance: {
    hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  target: "web", // enum  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  // lets you provide options for webpack-serve
  stats: "errors-only",  // lets you precisely control what bundle information gets displayed
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ],
  // list of additional plugins
  /* Advanced configuration (click to show) */
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
}