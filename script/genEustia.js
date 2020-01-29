const browserify = require('browserify')
const path = require('path')
const fs = require('fs')

const writeSteam = fs.createWriteStream(
  path.resolve(__dirname, '../static/js/eustia.js'),
  {
    encoding: 'utf8'
  }
)
const b = browserify(
  [path.resolve(__dirname, '../node_modules/eustia/out/index.js')],
  {
    standalone: 'eustia'
  }
)
b.ignore('fs-extra')
b.ignore('chokidar')
b.ignore('glob')
b.ignore('nopt')
b.ignore('qs')
b.ignore('request')
b.ignore('request-promise')
b.bundle().pipe(writeSteam)
