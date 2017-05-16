exports.path = require('path')
exports.APP_DIR = exports.path.resolve(__dirname, 'javascript')

exports.entry = {
  search: exports.APP_DIR + '/Search/index.jsx',
  vendor: ['react', 'react-dom']
}
