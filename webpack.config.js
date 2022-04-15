let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin'); // 将打包后的js自动添加到html
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 把css抽取成一个单独的文件
// 默认webpack支持js打包压缩（生产模式），添加了optimize-css-assets-webpack-plugin后，webpack的js打包压缩无效，需要配置terser-webpack-plugin
let TerserPlugin = require('terser-webpack-plugin'); //js压缩
let OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCssPlugin({})],
  },
  entry: './src/main.js', //入口
  mode: 'development', //开发模式  生产production
  output: {
    //出口
    // 打包命令 npx webpack
    filename: 'js/index.js', //指定输出的文件名
    path: path.resolve(__dirname, 'dist'), //指定输出的位置
  },
  devServer: {
    //web服务配置
    port: 8081, //指定端口
    open: true, //服务启动时自动打开浏览器
    contentBase: './dist', //http容器的根目录
  },
  module: {
    rules: [
      // 在html中直接使用<img>标签
      // 需要安装file-loader
      {
        test: /\.html$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.(png|jpg|bmp|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 200 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader',
      },
      {
        // 支持es6语法
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/, //以css结尾的文件
        use: ['style-loader', 'css-loader'], //装载器loader
        // use: [MiniCssExtractPlugin.loader, 'css-loader'] //装载器loader
      },
      {
        test: /\.less$/,
        // 还需要安装less
        use: ['style-loader', 'css-loader', 'less-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        // 还需要安装node-sass  版本不要太高
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader', // 处理 .vue 文件的 loader
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html', //指定模板
      filename: 'index.html', //打包之后的模板名字
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
  ],
};
