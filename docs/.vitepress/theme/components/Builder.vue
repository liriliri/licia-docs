<script setup>
import licia from '../lib/licia.json'
</script>

<template lang="pug">
.container.mobile

  textarea#input-modules(rows='4' placeholder="fetch each random...")
  a.btn#build-btn(href='#') BUILD
  a.btn#clear-btn(href='#') CLEAR
  a.btn#download-btn.disabled(download='util.js') DOWNLOAD

  ul#build-logger
    li Note:
    li Module names are separated by spaces.
    li The generated library is exported as "_" in global space, using UMD pattern.

  ul#build-modules
    li(title="All modules that can run on both browser and node.js.") all
    li(title='All browser modules.') allBrowser
    li(title='All node.js modules.') allNode
    li(title='All miniprogram modules.') allMiniProgram
</template>

<style lang="stylus">
@import '../css/variable.styl'

#input-modules
  width 100%
  margin-top 25px
  margin-bottom 15px
  outline none
  padding 10px
  border 2px solid $gray
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
    color $pri-color
    font-size 14px

#build-modules
  margin 25px 0
  &:after
    content ''
    display block
    clear both
  li
    float left
    color $pri-color
    margin-right 4px
    margin-top 4px
    padding 2px 4px
    font-size 12px
    cursor pointer
    opacity .6
    &:hover
      text-decoration underline
      opacity 1
</style>
