<script setup>
import { ref, onMounted } from 'vue'
import { useData, useRouter } from 'vitepress'

const { lang } = useData()

const { go } = useRouter()

const canvas = ref(null)

onMounted(() => {
  import('../lib/Canvas').then(({ default: Canvas }) => {
    new Canvas({
      el: canvas.value,
      count: 15,
      speed: 0.3,
      radius: 10,
      width: function () {
        return window.innerWidth
      },
      height: function () {
        return window.innerWidth < 1024 ? 280 : 360
      },
      size: 15,
      color: '255, 255, 255',
      maxDistance: 100,
      background: ['58, 58, 84', '191, 33, 93'],
    })
  })
})

function goTo(href) {
  if (lang.value === 'zh') {
    href = '/zh' + href
  }
  go(href)
}
</script>

<template lang="pug">
.banner
  canvas#canvas(ref="canvas")
  h1 {{ lang === 'zh' ? '实用 JavaScript 工具库' : 'Useful Utility Collection with Zero Dependencies' }}
  a.btn.second(href='' @click="goTo('/document.html')") {{ lang === 'zh' ? '查看文档' : 'VIEW DOCS' }}
</template>

<style lang="stylus">
@import '../css/variable.styl'

.banner
    position relative
    height 360px
    padding 80px 48px 40px
    text-align center
    position relative
    h1
        margin 40px auto
        text-align center
        color #fff
        font-size 24px
    canvas
        position absolute
        left 0
        top 0
        z-index -50

.intro
    padding 20px 0 64px

@media (max-width $container-width)
    .banner
        padding 20px 48px
        height 280px
</style>
