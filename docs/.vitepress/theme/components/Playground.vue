<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const playground = ref(null)

onMounted(() => {
  import('@stackblitz/sdk').then((sdk) => {
    sdk.default.embedProjectId(
      playground.value,
      'stackblitz-starters-dlntz4ak',
      {
        forceEmbedLayout: true,
        openFile: 'index.js',
        theme: isDark.value ? 'dark' : 'light',
        hideExplorer: true,
        view: 'editor',
        terminalHeight: 50,
      }
    )
  })
})
</script>

<template lang="pug">
.container.mobile
  .playground(ref="playground")
    .initial-text(v-if="loading") {{ lang === 'zh' ? '初始化 StackBlitz 中...' : 'Initializing StackBlitz...' }}
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
iframe.playground
    width 100%
    min-height 600px
    padding-top 0
    border 1px solid var(--vp-c-gutter)
</style>
