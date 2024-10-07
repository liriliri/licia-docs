<script setup>
import licia from '../lib/licia.json'
import { ref, watch } from 'vue'
import contain from 'licia/contain'
import each from 'licia/each'
import trim from 'licia/trim'
import filter from 'licia/filter'
import unique from 'licia/unique'
import now from 'licia/now'
import format from 'licia/format'
import getUrlParam from 'licia/getUrlParam'
import createUrl from 'licia/createUrl'
import { useData } from 'vitepress'

const t = (en, zh) => (useData().lang.value === 'zh' ? zh : en)

const INPUT_STORE_NAME = 'buildModules'

const input = ref('')
const isBuilding = ref(false)
const downloadUrl = ref('')
const logs = ref([])
const downloadBtn = ref(null)

watch(() => input.value, reset)

const module = getUrlParam('module')
if (module) {
  input.value = module
  setTimeout(() => startBuild(), 1000)
} else if (typeof localStorage !== 'undefined') {
  input.value = localStorage.getItem(INPUT_STORE_NAME)
}

function startBuild() {
  let modules = trim(input.value)
  modules = unique(filter(modules.split(/\s+/), (name) => name !== ''))
  if (modules.length === 0) return

  const startTime = now()

  build(modules, function (err, output) {
    if (err) {
      log(err.message)
      log(t('TASK ABORT.', '中止任务。'))
      return
    }

    log(t('TIME COST %dms.', '耗时 %dms。'), now() - startTime)

    downloadUrl.value = createUrl(output)
    setTimeout(() => {
      downloadBtn.value.click()
    }, 200)
  })

  localStorage.setItem(INPUT_STORE_NAME, input.value)
}

function build(modules, cb) {
  if (!window.eustia) {
    return
  }

  isBuilding.value = true

  log(t('MODULES INCLUDED', '包含模块'))
  log(modules.join(' '))
  log(t('BUILDING...', '构建中...'))

  eustia.build(
    {
      include: modules,
    },
    function (err, result) {
      isBuilding.value = false

      if (err) return cb(err)

      cb(null, result)
    }
  )
}

function clear() {
  input.value = ''
}

function selectModule(name) {
  if (!contain(input.value, name)) {
    input.value += ' ' + name
    input.value = trim(input.value)
  }
}

function selectModules(type) {
  if (contain(['all', 'browser', 'node', 'miniprogram'], type)) {
    input.value = ''
    each(licia, function (module, name) {
      if (type === 'all' || contain(module.env, type)) {
        input.value += ' ' + name
      }
    })
    input.value = trim(input.value)
  } else {
    selectModule(type)
  }
}

function reset() {
  downloadUrl.value = ''
  logs.value = []
}

function log() {
  logs.value.push(format(...arguments))
}
</script>

<template lang="pug">
.container.mobile

  textarea#input-modules(rows='4' placeholder="fetch each random..." v-model="input" :disabled="isBuilding")
  a.btn#build-btn(:class="isBuilding || downloadUrl ? 'disabled' : ''" href='#' @click="startBuild") {{ t('BUILD', '构建') }}
  a.btn#clear-btn(:class="isBuilding ? 'disabled' : ''" href='#' @click="clear") {{ t('CLEAR', '清除') }}
  a.btn#download-btn(:class="downloadUrl ? '' : 'disabled'" download='util.js' :href="downloadUrl" ref="downloadBtn") {{ t('DOWNLOAD', '下载') }}

  ul#build-logger(v-if="logs.length === 0")
    li {{ t('Note:', '提示：') }}
    li {{ t('Module names are separated by spaces.', '模块名用空格分隔。') }}
    li {{ t('The generated library is exported as "_" in global space, using UMD pattern.', '生成库导出全局变量 “_”，使用 UMD 规范。') }}
  ul#build-logger(v-else)  
    li(v-for="log in logs" :key="log") {{ log }}

  ul#build-modules(v-if="!isBuilding")
    li(title="All modules that can run on both browser and node.js." @click="selectModules('all')") {{ t('All', '全部') }}
    li(title='All browser modules.' @click="selectModules('browser')") {{ t('Browser', '浏览器') }}
    li(title='All node.js modules.' @click="selectModules('node')") Node
    li(title='All miniprogram modules.' @click="selectModules('miniprogram')") {{ t('MiniProgram', '小程序') }}
    li(v-for="(module, name) in licia" :key="name" :title="module.description" @click="selectModules(name)") {{ name }}
</template>

<style lang="stylus">
@import '../css/variable.styl'

#input-modules
  width 100%
  margin-top 25px
  margin-bottom 15px
  outline none
  padding 10px
  border 1px solid $gray
  font-family $font-family
  resize vertical
  appearance none

#build-btn, #download-btn, #clear-btn
  background #fff
  margin-right 15px
  font-size 13px

#build-logger
  margin 25px 0
  li
    margin-bottom 10px
    font-size 14px

#build-modules
  margin 25px 0
  &:after
    content ''
    display block
    clear both
  li
    float left
    margin-right 4px
    margin-top 4px
    padding 2px 4px
    font-size 12px
    cursor pointer
    opacity .6
    line-height 1.5
    &:hover
      text-decoration underline
      opacity 1
</style>
