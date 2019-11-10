const toc = require('markdown-toc')
const marked = require('marked')
const util = require('./util')

module.exports = function(options) {
  return function(files, metalsmith, done) {
    setImmediate(done)

    util.each(files, function(data, key) {
      if (!util.endWith(key, '.md')) return

      data.toc = marked(toc(data.contents.toString(), options || {}).content)
    })
  }
}
