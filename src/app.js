/* 启动文件 */
import Vue from 'vue'
import router from '@/routes/'
import App from '@/components/App'

import Selector from "@/components/Selector"

Vue.component("bs-selector", Selector)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
  Vue.config.productionTip = false
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}
