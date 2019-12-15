const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: isProduction ? './' : '/',
  filenameHashing: false,
  lintOnSave: false,
  productionSourceMap: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'markdown-showdowns-editor'
    }
  },
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
