<script setup>
import { useData, useRouter } from 'vitepress'

const { lang } = useData()

const { go } = useRouter()

const props = defineProps({
  name: String,
})

function goTo(href) {
  if (lang.value === 'zh') {
    href = '/zh' + href
  }
  go(href)
}
</script>

<template>
  <i
    class="download iconfont icon-download"
    @click="goTo(`/builder.html?module=${name}`)"
  ></i>
</template>
