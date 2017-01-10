module.exports = {
  module: {
    loaders: [
      {
        test: /\.less/,
        loaders: [
          'style',
          'css?localIdentName=[hash:base64:5]&modules&importLoaders=1!less'
        ]
      }
    ]
  }
};
