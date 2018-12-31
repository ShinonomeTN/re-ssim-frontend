<template>
  <div>
    <mu-appbar color="primary">
      <span>{{!appBarMeta.title ? "简单课表查询" : appBarMeta.title}}</span>

      <mu-button v-if="appBarMeta.navBack" flat slot="right" @click="$router.push('/')">
        <mu-icon left value="arrow_back"></mu-icon>
        <span>首页</span>
      </mu-button>

      <mu-button v-if="!appBarMeta.navBack && appBarMeta.userMenu" flat slot="right">
        
      </mu-button>
    </mu-appbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import Utils from "@/commons/utils";

export default {
  name: "App",

  mounted() {
    // this.$store.commit("changeAppTitle", "简单课程查询");
  },

  computed: {
    appBarMeta() {
      return this.$store.state.appBarMeta;
    }
  }
};
</script>
<style>
</style>
