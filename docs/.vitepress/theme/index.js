import DefaultTheme from 'vitepress/theme'
import Download from './components/Download.vue'
import 'luna-shader-toy-player/css'
import '../share/index.css'
import './css/index.styl'
import './css/iconfont/iconfont.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Download', Download)
  },
}
