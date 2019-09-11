// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 3 会假设你的应用是被部署在一个域名的根路径上。
  // 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  // 例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  // baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和publicPath的生产环境路径一致）；
  // 构建时传入 --no-clean 可关闭该行为。
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录；
  // 项目打包之后，静态资源会放在这个文件夹下。
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // 打包之后，改变系统默认的index.html的文件名
  //indexPath: 'index.html',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  // 你可以通过将这个选项设为 false 来关闭文件名哈希(false的时候就是让原来的文件名不改变)。
  filenameHashing: false,

  // 构建多页面应用，页面的配置
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'showdown-markdown-editor',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html`，并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    //subpage: 'src/subpage/main.js'
  },

  // 是否通过 eslint-loader 在每次保存时 lint 代码;
  // 在生产构建时禁用 eslint-loader。
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 是否使用包含运行时编译器的 Vue 构建版本。
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。(默认false)
  runtimeCompiler: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // 打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
  // map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  productionSourceMap: false,

  // Babel 显式转译列表
  //transpileDependencies: [],
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  //crossorigin: '',
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  //integrity: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
  // 该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象。
  configureWebpack: {
    devtool: 'source-map'
  },
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  //chainWebpack: () => {},

  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: false,
    // 当为true时，css文件名可省略 module 默认为 false
    modules: true,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: true,
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
        //localIdentName: '[name]'
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      sass: {
        // 这里的选项会传递给 sass-loader
      },
      scss: {
        // 这里的选项会传递给 sass-loader
      },
      less: {
        // 这里的选项会传递给 less-loader
      },
      stylus: {
        // 这里的选项会传递给 stylus-loader
      }
    }
  },
  // 支持webPack-dev-server的所有选项
  devServer: {
    //配置自动启动浏览器
    open: process.platform === 'darwin',
    //host: '0.0.0.0',
    // 端口号
    port: 8088,
    // https:{type:Boolean}
    https: false
    //proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // 配置多个代理
    //proxy: {
    //  "/api": {
    //    target: "<url>",// 要访问的接口域名
    //    ws: true,// 是否启用websockets
    //    changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //    pathRewrite: {
    //        '^/api': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
    //      }
    //  },
    //  "/foo": {
    //   target: "<other_url>"
    //  }
    //}
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1
  // 向 PWA 插件传递选项
  //pwa: {},
  // 可以用来传递任何第三方插件选项
  //pluginOptions: {}
};
