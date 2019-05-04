const request = require('request')
const fs = require('fs')

const util = require('../lib/util')

const INDEX_URL =
  'https://raw.githubusercontent.com/liriliri/licia/master/index.json'
let index = {}

request(INDEX_URL, function(err, res, body) {
  if (err) return console.log(err)

  index = JSON.parse(body)

  fs.writeFile('src/licia.json', JSON.stringify(index, null, 4), function() {})

  requestDoc(
    'module',
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC.md',
    'en'
  )
  requestDoc(
    'module_cn',
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC_CN.md',
    'cn'
  )
})

function requestDoc(name, url, lang) {
  request(url, function(err, res, body) {
    if (err) return console.log(err)

    body = addDesc(body, lang)
    body = addLink(body)

    var data = '---\nlayout: module.jade\ntitle: Module\n---\n\n' + body

    fs.writeFile(`src/${name}.md`, data, 'utf-8', function(err) {
      if (err) console.log(err)
    })
  })
}

function addDesc(body, lang) {
  if (lang === 'en') {
    return body.replace(/^#.*/, function() {
      return '[English](/module.html) [中文](/module_cn.html)\n'
    })
  } else if (lang === 'cn') {
    return (
      ['[English](/module.html) [中文](/module_cn.html)'].join('\n\n') +
      '\n\n' +
      body
    )
  }

  return body
}

function addLink(body) {
  return body.replace(/^##\s+([\w$]+)/gm, function(match, name) {
    var source =
      'https://github.com/liriliri/licia/blob/master/src/' +
      name[0].toLowerCase() +
      '/' +
      name

    var ret =
      match +
      '\n\n[source](' +
      source +
      '.js) ' +
      '[test](' +
      source +
      '.test.js)'

    if (util.safeGet(index, [name, 'benchmark'])) {
      ret += ' [benchmark](' + source + '.benchmark.js)'
    }

    if (util.safeGet(index, [name, 'demo'])) {
      ret += ' [demo](/demo/' + name + '.html)'
    }

    var env = index[name].env,
      envHtml = ''

    if (env === 'browser' || env === 'all')
      envHtml += '<i class="env iconfont icon-browser"></i>'
    if (env === 'node' || env === 'all')
      envHtml += '<i class="env iconfont icon-nodejs"></i>'

    ret += envHtml

    return ret
  })
}
