<script setup>
import { ref } from 'vue'
import { useData, useRouter, defineClientComponent } from 'vitepress'

const { lang } = useData()

const { go } = useRouter()

const lunaShaderToyPlayerRef = ref(null)
const LunaShaderToyPlayer = defineClientComponent(
  () => import('luna-shader-toy-player/vue'),
  [
    {
      ref: lunaShaderToyPlayerRef,
    },
  ]
)

// https://www.shadertoy.com/view/XX3fDH
const code = `//modified from @XorDev

#define NUM_OCTAVES 5

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2 shake = vec2(sin(iTime * 1.5) * 0.01, cos(iTime * 2.7) * 0.01);

  vec2 p = ((fragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(8.0, -6.0, 6.0, 8.0);
  vec2 v;
  vec4 o = vec4(0.0);

  float f = 3.0 + fbm(p + vec2(iTime * 7.0, 0.0));

  for (float i = 0.0; i++ < 50.0;)
  {
    v = p + cos(i * i + (iTime + p.x * 0.1) * 0.03 + i * vec2(11.0, 9.0)) * 5.0 + vec2(sin(iTime * 4.0 + i) * 0.005, cos(iTime * 4.5 - i) * 0.005);

    float tailNoise = fbm(v + vec2(iTime, i)) * (1.0 - (i / 50.0));
    vec4 currentContribution = (cos(sin(i) * vec4(1.0, 2.0, 3.0, 1.0)) + 1.0) * exp(sin(i * i + iTime)) / length(max(v, vec2(v.x * f * 0.02, v.y)));

    float thinnessFactor = smoothstep(0.0, 1.0, i / 50.0);
    o += currentContribution * (1.0 + tailNoise * 2.0) * thinnessFactor;
  }

  o = tanh(pow(o / 1e2, vec4(1.5)));
  fragColor = o;
}`

const renderPass = ref([
  {
    inputs: [],
    outputs: [],
    code,
    name: 'Image',
    description: '',
    type: 'image',
  },
])

function goTo(href) {
  if (lang.value === 'zh') {
    href = '/zh' + href
  }
  go(href)
}
</script>

<template lang="pug">
.banner
  luna-shader-toy-player.player(:controls="false" :renderPass="renderPass")
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
  .player
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index -50
  h1
    margin 40px auto
    text-align center
    color #fff
    font-size 24px

.intro
  padding 20px 0 64px

@media (max-width $container-width)
  .banner
    padding 20px 48px
    height 280px
</style>
