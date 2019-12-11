const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProduction ? './' : '/',
  filenameHashing: false,
  lintOnSave: false,
  productionSourceMap: true,
  css: {
		//是否使用 css分离插件 ExtractTextPlugin
		extract: true,
    // 启用 CSS modules for all css / pre-processor files(v3用modules v4用requireModuleExtension)
    requireModuleExtension: false,
    sourceMap: false
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1
};
