exports.path = require('path')
exports.APP_DIR = exports.path.resolve(__dirname, 'javascript')

exports.entry = {
  add: exports.APP_DIR + '/Add/index.jsx',
  search: exports.APP_DIR + '/Search/index.jsx',
  vendor: ['react', 'react-dom']
}
