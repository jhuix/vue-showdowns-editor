const path = require('path');
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
    sourceMap: false,
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        //localIdentName: '[name]'
        importLoaders: 1
      },
      stylus: {
        // 这里的选项会传递给 stylus-loader
        importLoaders: 1
      }
    }
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1
};

function addStyleResource(rule) {
  rule
    .use('style-resource-loader')
    .loader('@jhuix/style-resources-loader')
    .options({
      test: /mainview/,
      patterns: [],
      injector: function (source, resources) {
        return `@import '../../node_modules/@jhuix/vue-showdowns-editor/dist/lib/vue-mdse.css';\n${source.trim()}`;
      }
    });
}
