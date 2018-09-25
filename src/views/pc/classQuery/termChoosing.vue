<template>
  <div>
    <mu-button full-width @click="_openDialog()">{{value ? value: "选择一个学期"}}</mu-button>

    <mu-dialog :open.sync="isDialogOpened" :width="500" scrollable>
      <div slot="title">
        选择学期
      </div>

      <div class="container-fuild">
        <mu-list v-if="!isLoadingTerms">
          <mu-list-item button v-for="(item,index) in termList" :key="index" @click="onTermItemClick(item.name)">
            <mu-list-item-action v-if="item.name === value">
              <mu-badge content="当前" color="primary"></mu-badge>
            </mu-list-item-action>
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="`${item.courseCount}`" color="secondary"></mu-badge>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
        <div v-else align="center">
          <mu-circular-progress class="demo-circular-progress" :size="56"></mu-circular-progress>
        </div>
      </div>

      <div slot="actions">
        <mu-button flat color="primary" @click="_closeDialog()">关闭</mu-button>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import Utils from "@/commons/utils";

export default {
  name: "pc-term-choosing",

  model: {
    prop: "value",
    method: "changed"
  },

  props: {
    value: {
      type: String,
      default: ""
    }
  },

  data: () => ({
    isDialogOpened: false,
    isLoadingTerms: false,

    termList: []
  }),

  methods: {
    _openDialog() {
      this.isDialogOpened = true;
      if (this.termList.length <= 0) {
        this.loadTermList();
      }
    },

    _closeDialog() {
      this.isDialogOpened = false;
    },

    onTermItemClick(term) {
      this.$emit("changed", term);
      this._closeDialog();
    },

    loadTermList() {
      this.isLoadingTerms = true;
      Utils.newRequest("/api/term")
        .then(r => {
          if (!r.data || r.data.length <= 0) {
            this.$toast.message("无数据");
            return;
          }

          this.termList = r.data;
        })
        .then(() => {
          this.isLoadingTerms = false;
        });
    }
  }
};
</script>

<style>
</style>
