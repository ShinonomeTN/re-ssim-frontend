import Vue from 'vue';
import VueRouter from 'vue-router';

import pcRoutes from './pc/';

import Utils from "@/commons/utils";

Vue.use(VueRouter)

const routeMapping = [
  // mode: 'hash|history|abstract',
  // base: '/',
  // linkActiveClass: 'router-link-active',
  // scrollBehavior: fn
  {
    path: '/',
    beforeEnter(to, from, next) {
      if (Utils.client.isPc) next("/pc")
      else next("/mobile");
    }
  },

  pcRoutes,

  // 404 置后
  {
    path: '*',
    component: {
      beforeCreate() {
        window.swal({
          type: 'warning',
          title: '功能或页面不存在',
          timer: 1500,
          showConfirmButton: false
        })
        this.$router.replace('/')
      },
      template: '<div></div>'
    }
  }
]

const router = new VueRouter({
  routes: routeMapping
});

export default router;
