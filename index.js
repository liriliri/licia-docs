const path = require('path')
const fs = require('fs')
const ncp = require('ncp')
const marked = require('marked')
const autoprefixer = require('autoprefixer-stylus')
const rmdir = require('licia/rmdir')

const layouts = require('metalsmith-layouts')
const stylus = require('metalsmith-stylus')
const uglify = require('metalsmith-uglify')
const markdown = require('metalsmith-markdown')
const prism = require('metalsmith-prism')
const ignore = require('metalsmith-ignore')
const markedToc = require('./lib/markedToc')

const dirname = __dirname
const port = 3000
let env = 'release'

function dirPath() {
  const args = [].slice.call(arguments)
  args.unshift(dirname)
  return path.join.apply(null, args)
}

function copyStatic() {
  console.time('[metalsmith] build/static finished')

  fs.mkdir(dirPath('dist'), function() {
    fs.mkdir(dirPath('dist/static'), function() {
      ncp(dirPath('static'), dirPath('dist/static'), function(err) {
        if (err) return console.error(err)

        console.timeEnd('[metalsmith] build/static finished')
      })
    })
  })
}

const site = require('./src/site.json')
const licia = require('./src/licia.json')

function build() {
  site.baseUrl =
    env === 'development' ? '//localhost:' + port + '/' : '//licia.liriliri.io/'
  site.env = env

  const metalsmith = require('metalsmith')(dirname)

  const renderer = new marked.Renderer()

  renderer.heading = heading

  console.time('[metalsmith] build/site finished')

  metalsmith
    .metadata({
      site: site,
      licia: licia
    })
    .source('src')
    .clean(false)
    .use(
      markedToc({
        maxdepth: 2,
        slugify
      })
    )
    .use(
      markdown({
        renderer,
        langPrefix: 'language-'
      })
    )
    .use(
      stylus({
        compress: true,
        paths: [dirPath('layout/css')],
        use: [autoprefixer()]
      })
    )
    .use(ignore(['site.json']))
    .use(
      layouts({
        engine: 'jade',
        directory: 'layout',
        pattern: '**/*.html'
      })
    )
    .use(prism())
    .use(uglify())
    .destination('dist')
    .build(function(err) {
      if (err) throw err

      console.timeEnd('[metalsmith] build/site finished')
    })
}

function fullBuild() {
  rmdir('dist', function() {
    copyStatic()
    build()
  })
}

function server() {
  copyStatic()
  build()

  const st = require('st')
  const http = require('http')

  const mount = st({
    path: dirPath('dist'),
    cache: false,
    index: 'index.html'
  })

  http
    .createServer(function(req, res) {
      mount(req, res)
    })
    .listen(port, function() {
      console.log('http://localhost:' + port + '/')
    })

  const chokidar = require('chokidar')

  const options = {
    persistent: true,
    ignoreInitial: true,
    followSymlinks: true,
    usePolling: true,
    alwaysStat: false,
    depth: undefined,
    interval: 100,
    atomic: true,
    ignorePermissionErrors: false
  }

  const layout = chokidar.watch(dirPath('layout'), options)
  const src = chokidar.watch(dirPath('src'), options)
  const staticFiles = chokidar.watch(dirPath('static'), options)

  layout.on('change', build)
  src.on('change', build)
  staticFiles.on('change', copyStatic)
}

function heading(text, level) {
  if (level !== 2) return '<h' + level + '>' + text + '</h' + level + '>'

  return (
    '<h' + level + ' id="' + slugify(text) + '">' + text + '</h' + level + '>'
  )
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\$/, 'dollar-')
    .replace(/[^\w]+/g, '-')
}

if (process.argv[2] === 'serve') {
  env = 'development'
  server()
} else {
  fullBuild()
}
