// const path = require("path");

module.exports = {
  publicPath: '/lawgg-ad',
  lintOnSave: false,
  // outputDir: path.resolve(__dirname, "../lg-was-admin/src/main/resources/static"),
  devServer : {
    disableHostCheck: true,
    proxy : {
      '/api': {
        target : 'http://localhost:18001',
        changeOrigin: true,
      }
    }
  },
  configureWebpack: config => {
    config.output.filename = 'js/[name].[hash].js'
    config.output.chunkFilename = 'js/[name].[hash].js'
  },
}
