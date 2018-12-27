/* 启动文件 */
import Vue from "vue";
import router from "@/routes/";
import store from "@/store";
import App from "@/components/App";

// Vue selector
import vSelector from "vue-select";
Vue.component("v-select", vSelector);

// MuseUI
import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import "typeface-roboto";
Vue.use(MuseUI);

// Vue Toasted
// import Toasted from "vue-toasted";
// Vue.use(Toasted);

// Muse UI toast
import Toast from "muse-ui-toast";
Vue.use(Toast, {
  position: "top",
  time: 2000
});

import postInit from "@/init";
postInit();

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

if (__DEV__) {
  console.info("[当前环境] 开发环境");
  Vue.config.devtools = true;
  Vue.config.productionTip = false;
}

if (__PROD__) {
  console.info("[当前环境] 生产环境");
  Vue.config.devtools = false;
}
