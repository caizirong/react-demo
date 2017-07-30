const path = require('path')
module.exports = {
  entry: [
    path.resolve(__dirname, 'src/entry.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=8192" // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  },
  // webpack.config.js加入
  //只看
  devServer: {
    port: 8080,//设置监听端口（默认的就是8080）
    // contentBase: "./src",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转，用于开发单页面应用，依赖于HTML5 history API 设置为true点击链接还是指向index.html
  }
}