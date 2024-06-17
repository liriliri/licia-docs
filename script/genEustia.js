const browserify = require('browserify')
const path = require('path')
const fs = require('fs')

const outputPath = path.resolve(__dirname, '../docs/public/eustia.js')

const writeSteam = fs.createWriteStream(
  outputPath,
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
