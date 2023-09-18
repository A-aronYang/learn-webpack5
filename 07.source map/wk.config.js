const path = require("path");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { DefinePlugin } = require("webpack")
// 导出配置信息
module.exports = {
  // 开发模式
  mode: "development",
  // 常见的值:
  // 1.false
  // 2.none => production
  // 3.eval => development
  // 4.source-map => production

  // 不常见的值: 
  // 1.eval-source-map: 添加到eval函数的后面
  // 2.inline-source-map: 添加到文件的后面
  // 3.cheap-source-map(dev环境): 低开销, 更加高效
  // 4.cheap-module-source-map: 和cheap-source-map比如相似, 但是对来自loader的source-map处理的更好
  // 5.hidden-source-map: 会生成sourcemap文件, 但是不会对source-map文件进行引用
  // 6.会生成sourcemap，但是生成的sourcemap只有错误信息的提示，不会生成源代码文件
  devtool: 'source-map',
  // 入口文件
  entry: "./src/main.js",
  // 设置出口
  output: {
    // 打包后文件名称
    filename: "bundle.js",
    // 打包的路径
    path: path.resolve(__dirname, "./dist"),
    // assetModuleFilename: "abc.png",
    // 重新打包时不用手动删除之前的打包文件
    clean: true
  },
  resolve: {
    // 扩展名配置，导入时可以省略扩展名
    extensions: [".js", ".json", ".vue", ".jsx", ".ts", ".tsx"],
    // 别名配置，导入时可以使用别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
  devServer: {
    hot: true,
    // host: "0.0.0.0",
    // port: 8888,
    // open: true,
    // compress: true
  },
  module: {
    rules: [
      {
        // 告诉webpack匹配什么文件
        test: /\.css$/,
        // use: [ // use中多个loader的使用顺序是从后往前
        //   { loader: "style-loader" },
        //   { loader: "css-loader" }
        // ],
        // 简写一: 如果loader只有一个
        // loader: "css-loader"
        // 简写二: 多个loader不需要其他属性时, 可以直接写loader字符串形式
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         "autoprefixer"
          //       ]
          //     }
          //   }
          // }
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        // 1.打包两张图片, 并且这两张图片有自己的地址, 将地址设置到img/bgi中
        // 缺点: 多图片加载的两次网络请求
        // type: "asset/resource",

        // 2.将图片进行base64的编码, 并且直接编码后的源码放到打包的js文件中
        // 缺点: 造成js文件非常大, 下载js文件本身消耗时间非常长, 造成js代码的下载和解析/执行时间过长
        // type: "asset/inline"

        // 3.合理的规范:
        // 3.1.对于小一点的图片, 可以进行base64编码
        // 3.2.对于大一点的图片, 单独的图片打包, 形成url地址, 单独的请求这个url图片
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024,
          },
        },
        generator: {
          // 占位符
          // name: 指向原来的图片名称
          // ext: 扩展名
          // hash: webpack生成的hash
          filename: "img/[name]_[hash:8][ext]",
        },
      },
      {
        test: /\.(m?js)$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: [["@babel/preset-env"]],
          // },
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // new CleanWebpackPlugin(),
    // 使用html模板
    new HtmlWebpackPlugin({
      title: "webpack 案例",
      template: "./public/index.html"
    }),
    // 创建全局常量
    new DefinePlugin({
      BASE_URL: "'./'",
      counter: "123",
      aaron: "'aaron'"
    })
  ],
};
