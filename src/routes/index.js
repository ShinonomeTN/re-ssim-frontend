import Vue from 'vue';
import VueRouter from 'vue-router';

import pcRouting from './pc';
import staffRouting from "./staff";

import Utils from "@/commons/utils";
// import store from ""

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

  // PC client routing
  pcRouting,

  // Manager panel
  staffRouting,

  // Error
  {
    path: 'error',
    component: {
      template: '<div>Ooops, something goes wrong.</div>'
    }
  },

  // 404 置后
  {
    path: '*',
    component: {
      // beforeCreate() {
      //   window.swal({
      //     type: 'warning',
      //     title: '功能或页面不存在',
      //     timer: 1500,
      //     showConfirmButton: false
      //   })
      //   this.$router.replace('/')
      // },
      template: '<div>Ooops, nothing here</div>'
    }
  }
]

const router = new VueRouter({
  routes: routeMapping
});

export default router;