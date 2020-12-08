const path = require('path')

module.exports = {
  port: 9000,
  publicPath: 'qfabc/efg',
  proxy: {
    '/api': {
      // target: 'http://10.20.158.42:9999',
      // target: 'http://10.20.158.29:9999',
      target: 'http://192.168.0.106:9999',
      changeOrigin: true
    },
    '/soso': {
      target: 'https://c.y.qq.com',
      changeOrigin: true
    }
  },
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      // less-loader用于加载.less文件，交给 less 进行编译，编译成 css文件。
      // 如何配置 less 支持 antd 主题色的修改？如下两种方法（二选一）：
      // 一种是使用 webpack 的 less-loader 选项配置
      // 一种是直接修改文件 /node_modules/antd/lib/style/themes/default.less
      { test: /\.less$/, use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader', options: {
          lessOptions: {
            // 开启JavaScript，支持less中的JS函数
            javascriptEnabled: true,
            // 自定义antd主题
            modifyVars: {
              "primary-color": "#9932CC"
            }
          }
        }}
      ]}
    ]
  }
}
