var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var merge = require('webpack-merge');
var uglify = require("uglify-js");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Load *package.json* so we can use `dependencies` from there
var pkg = require('./package.json');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var WebpackOnBuildPlugin = require('on-build-webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'parse-server/public/app')
};

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.json', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.json?$/,
        loaders: ['json-loader'],
        include: /\.json$/
        
      }
    ]
  },
  plugins: []
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    stats: { children: false },
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      quite: true,
      colors: true, // 터미널 출력내용을 컬러풀하게 출력한다.
      historyApiFallback: true,
      inline: true,
      contentBase: './public', // --content-base public/ package.json 에서 가져옴

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'node_modules/moment-timezone'),
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        }

      ]
    },
    plugins: [
      new HtmlwebpackPlugin({ 
        title: 'RedBook',
        favicon: 'public/favicon.ico',
        chunks: ['public'],
        template: 'public/index.html',
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'start-bs' || !TARGET) {
  module.exports = merge(common, {
    stats: { children: false },
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      quite: true,
      colors: true, // 터미널 출력내용을 컬러풀하게 출력한다.
      historyApiFallback: true,
      inline: true,
      contentBase: './public', // --content-base public/ package.json 에서 가져옴

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.join(__dirname, 'node_modules/moment-timezone'),
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        }

      ]
    },
    plugins: [
      new HtmlwebpackPlugin({
        title: 'RedBook',
        favicon: 'public/favicon.ico',
        chunks: ['public'],
        template: 'public/index.html',
        filename: 'index.html'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new BrowserSyncPlugin(
        {
          // browse to http://localhost:3000/ during development,
          // ./public directory is being served
          host: 'localhost',
          port: 8081,
          proxy: 'http://localhost:8080/'
        },
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false
        }

      )]
  });
}



if(TARGET === 'build' || TARGET === 'stats') {

  module.exports = merge(common, {
    stats: { children: false },
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies).filter(function(v) {
        return v !== 'alt-utils';
      }) 
    },
    //devtool: 'eval-source-map',
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
      ]
    },
    postcss: [ require('autoprefixer')],
    plugins: [
      new Clean([PATHS.build]),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.OccurenceOrderPlugin(),
      // Extract vendor and manifest files
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['vendor', 'manifest']
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if(TARGET === 'build-test') {

  module.exports = merge(common, {
    stats: { children: false },
    entry: {
      app: PATHS.app,
      vendor: Object.keys(pkg.dependencies).filter(function(v) {
        return v !== 'alt-utils';
      }) 
    },
    devtool: 'eval-source-map',
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
      ]
    },
    plugins: [
      new Clean([PATHS.build]),
      new ExtractTextPlugin('styles.css'),
      // Extract vendor and manifest files
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['vendor', 'manifest']
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
      }),
      // Setting DefinePlugin affects React library size!
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('test')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new WebpackOnBuildPlugin(function(stats) {

        var uglified = uglify.minify([
          './parse-server/public/app/vendor.js'
        ]);

        fs.writeFile('./parse-server/public/app/vendor.all.js', uglified.code, function (err){
          if(err) {
            console.log(err);
          } else {
            console.log("Script generated and saved:", 'vendor.all.js');
          }      
        });

      })
    ]
  });
}

