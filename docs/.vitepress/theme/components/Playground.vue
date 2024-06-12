<script setup>
import loadJs from 'licia/loadJs'
import $ from 'licia/$'
import { ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()

const playground = ref(null)

loadJs('//embed.runkit.com', function () {
  RunKit.createNotebook({
    element: playground.value,
    source: [
      lang.value === 'zh'
        ? '// 只能引入支持所有环境的模块'
        : '// Only modules with all platform support can be required.',
      'const uuid = require("licia/uuid");',
      'const dateFormat = require("licia/dateFormat");',
      'const now = require("licia/now");',
      'const randomBytes = require("licia/randomBytes");\n',
      'console.log(randomBytes(5));',
      'console.log(uuid());',
      'console.log(dateFormat(now(), "yyyy-mm-dd"));',
    ].join('\n'),
    onLoad: function () {
      $('.initial-text').remove()
    },
  })
})
</script>

<template lang="pug">
.container.mobile
  .playground(ref="playground")
    .initial-text {{ lang === 'zh' ? '初始化 RunKit 中...' : 'Initializing RunKit...' }}
</template>
o
<style lang="stylus">
@import '../css/variable.styl'

.playground
    position relative
    padding-top 30px
    margin-top 10px
    .initial-text
        position absolute
        width 100%
        top 0
        left 0
        text-align center
        color $pri-color
</style>
