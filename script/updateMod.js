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
    'docs',
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC.md',
    'en'
  )
  requestDoc(
    'docs_cn',
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC_CN.md',
    'cn'
  )
})

function requestDoc(name, url, lang) {
  request(url, function(err, res, body) {
    if (err) return console.log(err)

    body = addDesc(body, lang)
    body = addLink(body)

    var data = '---\nlayout: docs.jade\ntitle: Docs\n---\n\n' + body

    fs.writeFile(`src/${name}.md`, data, 'utf-8', function(err) {
      if (err) console.log(err)
    })
  })
}

function addDesc(body, lang) {
  if (lang === 'en') {
    return body.replace(/^#.*/, function() {
      return '[English](/docs.html) [中文](/docs_cn.html)'
    })
  } else if (lang === 'cn') {
    return '[English](/docs.html) [中文](/docs_cn.html)\n\n' + body
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

    const since = util.safeGet(index, [name, 'since']) || '1.0.0'
    ret += '<i class="since">' + since + '</i>'

    ret += `<i class="download iconfont icon-download" data-name="${name}"></i>`

    const env = index[name].env
    let envHtml = ''

    if (env.indexOf('browser') > -1) {
      envHtml += '<i class="env iconfont icon-browser"></i>'
    }
    if (env.indexOf('node') > -1) {
      envHtml += '<i class="env iconfont icon-nodejs"></i>'
    }
    if (env.indexOf('miniprogram') > -1) {
      envHtml += '<i class="env iconfont icon-mini-program"></i>'
    }

    ret += envHtml

    return ret
  })
}
