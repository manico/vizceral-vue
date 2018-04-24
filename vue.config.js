const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production')
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
      }]);
  }
};
