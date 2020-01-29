_.ready(function() {
  const $buildBtn = _.$('#build-btn')
  const $clearBtn = _.$('#clear-btn')
  const $input = _.$('#input-modules')
  const $buildModules = _.$('#build-modules')
  const $downloadBtn = _.$('#download-btn')

  var localStore = window.localStorage

  logger.init()

  $buildBtn.on('click', function(e) {
    e.preventDefault()

    startBuild()
  })

  $clearBtn.on('click', function(e) {
    e.preventDefault()

    $buildModules.show()
    logger.reset()
    disableDownload()
    $input.val('')
  })

  function startBuild() {
    var modules = _.trim($input.val())

    modules = _.filter(modules.split(/\s+/), function(name) {
      return name !== ''
    })

    modules = _.unique(modules)

    if (modules.length === 0) return

    $buildBtn.addClass('disabled')
    $clearBtn.addClass('disabled')
    $downloadBtn.addClass('disabled')

    var startTime = _.now()

    build(modules, function(err, output) {
      $buildBtn.rmClass('disabled')
      $clearBtn.rmClass('disabled')

      if (err) {
        logger.log(err.message)
        logger.log('TASK ABORT.')
        return
      }

      logger.log('TIME COST %dms.', _.now() - startTime)

      enableDownload(output)
    })

    localStore.setItem(INPUT_STORE_NAME, $input.val())
  }

  var INPUT_STORE_NAME = 'buildModules'

  $input.on('input', function() {
    $buildModules.show()
    logger.reset()
    disableDownload()
  })

  $buildModules.on('click', 'li', function() {
    var $this = _.$(this),
      name = $this.text(),
      val = ''

    if (
      name === 'allBrowser' ||
      name === 'allNode' ||
      name === 'all' ||
      name === 'allMiniProgram'
    ) {
      if (name === 'allBrowser') {
        name = 'browser'
      } else if (name === 'allNode') {
        name = 'node'
      } else if (name === 'allMiniProgram') {
        name = 'miniprogram'
      }
      $buildModules.find('li').each(function() {
        var $this = _.$(this),
          env = $this.data('env') || ''

        env = env.split(/\s+/g)
        if (name === 'all') {
          if (env.length === 3) val += ' ' + $this.text()
          return
        }
        if (env.indexOf(name) > -1) val += ' ' + $this.text()
      })
    } else {
      val = $input.val()
      val += ' ' + name
    }

    $input.val(_.trim(val))
  })

  var lastVal = localStore.getItem(INPUT_STORE_NAME)

  if (lastVal) $input.val(lastVal)

  var url = new _.Url()
  if (url.query.module) {
    $input.val(url.query.module)
    startBuild()
  }
})

function build(modules, cb) {
  logger.clear()

  logger.log('MODULES INCLUDED')
  logger.log(modules.join(' '))
  logger.log('BUILDING...')

  _.$('#build-modules').hide()

  eustia.build(
    {
      include: modules
    },
    function(err, result) {
      if (err) return cb(err)

      cb(null, result)
    }
  )
}

function enableDownload(output) {
  var $btn = _.$('#download-btn')

  $btn.rmClass('disabled')
  $btn.attr('href', _.createUrl(output))
  $btn.get(0).click()
}

function disableDownload() {
  _.$('#download-btn').addClass('disabled')
}

var logger = {
  init: function() {
    this._$el = _.$('#build-logger')
    this._initHtml = this._$el.html()
  },
  log: function() {
    this._$el.append(
      '<li class="log">' + _.escape(_.format.apply(null, arguments)) + '</li>'
    )
  },
  reset: function() {
    this._$el.html(this._initHtml)
  },
  clear: function() {
    this._$el.html('')
  }
}
