const path = require('path')

module.exports = {
  port: 9000,
  publicPath: '',
  proxy: {
    '/api': {
      target: 'http://10.20.158.29:9999',
      changeOrigin: true
    }
  },
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}
