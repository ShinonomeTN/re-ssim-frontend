import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

import pcRouting from "./pc";
import staffRouting from "./staff";

import Utils from "@/commons/utils";
// import store from ""

Vue.use(VueRouter);

const routeMapping = [
  // mode: 'hash|history|abstract',
  // base: '/',
  // linkActiveClass: 'router-link-active',
  // scrollBehavior: fn
  {
    path: "/",
    beforeEnter(_, __, next) {
      if (Utils.client.isPc) next("/pc");
      else next("/mobile");
    }
  },

  // PC client routing
  pcRouting,

  // Manager panel
  staffRouting,

  // Error
  {
    path: "error",
    component: {
      template: "<div>Ooops, something goes wrong.</div>"
    }
  },

  // 404 置后
  {
    path: "*",
    component: {
      template: "<div>Ooops, nothing here</div>"
    }
  }
];

const router = new VueRouter({
  routes: routeMapping
});

router.beforeEach((to, form, next) => {
  const metaInfo = to.meta;
  if (metaInfo) store.commit("pushAppBarMeta", metaInfo);

  next();
});

export default router;
