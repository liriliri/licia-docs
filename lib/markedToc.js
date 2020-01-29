const toc = require('markdown-toc')
const marked = require('marked')
const each = require('licia/each')
const endWith = require('licia/endWith')

module.exports = function(options) {
  return function(files, metalsmith, done) {
    setImmediate(done)

    each(files, function(data, key) {
      if (!endWith(key, '.md')) return

      data.toc = marked(toc(data.contents.toString(), options || {}).content)
    })
  }
}
