const path = require("path");
const { VueLoaderPlugin } = require("vue-loader/dist/index")

// 导出配置信息
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // assetModuleFilename: "abc.png"
  },
  resolve: {
    // 扩展名配置，导入时可以省略扩展名
    extensions: [".js", ".json", ".vue", ".jsx", ".ts", ".tsx"],
    // 别名配置，导入时可以使用别名
    alias: {
      "@":path.resolve(__dirname, "./src"),
      utils: path.resolve(__dirname, "./src/utils")
    }
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
        loader: "vue-loader"
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
