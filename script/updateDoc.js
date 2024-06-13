const axios = require('axios')
const fs = require('fs')
const path = require('path')
const safeGet = require('licia/safeGet')
const stripIndent = require('licia/stripIndent')
const trim = require('licia/trim')

const INDEX_URL =
  'https://raw.githubusercontent.com/liriliri/licia/master/index.json'
let index = {}

axios.get(INDEX_URL).then(function(res) {
  const liciaPath = path.resolve(__dirname, '../docs/.vitepress/theme/lib/licia.json')
  index = res.data
  fs.writeFile(liciaPath, JSON.stringify(res.data, null, 4), function() {})

  getDoc(
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC.md',
    'en'
  )
  getDoc(
    'https://raw.githubusercontent.com/liriliri/licia/master/DOC_CN.md',
    'cn'
  )
})

function getDoc(url, lang) {
  axios.get(url, {
    responseType: 'text'
  }).then(function(res) {
    let body = res.data

    if (lang === 'en') {
      body = body.replace(/^#.*\n\n/, '')
    }
    body = addLink(body)

    let data = stripIndent`---
    layout: page
    ---
    
    <div class="vp-doc document">
    
    __body__

    </div>`

    data = data.replace('__body__', trim(body))

    fs.writeFile(`docs/${lang === 'cn' ? 'zh/' : ''}document.md`, data, 'utf-8', function(err) {
      if (err) console.log(err)
    })
  })
}

function addLink(body) {
  return body.replace(/^##\s+([\w$]+)/gm, function(match, name) {
    var source = 'https://github.com/liriliri/licia/blob/master/'

    var ret = `${match}\n\n[source](${source}src/${name}.js) [test](${source}test/${name}.js)`

    if (safeGet(index, [name, 'benchmark'])) {
      ret += ' [benchmark](' + source + 'benchmark/' + name + '.js)'
    }

    if (safeGet(index, [name, 'demo'])) {
      ret += ' <a href="/demo/' + name + '.html" target="_blank">demo</a>'
    }

    const since = safeGet(index, [name, 'since']) || '1.0.0'
    ret += '<i class="since">' + since + '</i>'

    ret += `<Download name="${name}" />`

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
