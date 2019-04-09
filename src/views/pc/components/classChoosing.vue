<template>
    <div>
      
      <mu-button full-width color="orange" @click="_openDialog()" >{{className ? className : '选择一个班级'}}</mu-button>

      <mu-dialog width="500" scrollable :open.sync="isDialogOpened">

        <div slot="title">
          选择班级<br> 
          <small>从名称的左到右索引</small>
          <div>
            <mu-breadcrumbs divider="—">
              <mu-icon value="chevron_right" slot="divider"></mu-icon>
              <mu-breadcrumbs-item v-for="item in classTreeSelectHistory" :key="item.name" disabled>{{item.name}}</mu-breadcrumbs-item>
            </mu-breadcrumbs>
          </div>  
        </div>

        <div class="container-fuild">
          <mu-list v-if="!isLoadingClasses && classTreeSelectHistory.length > 0">
            <mu-list-item button @click="gotoNextClassMapping(item)" v-for="(item,index) in classTreeSelectHistory[classTreeSelectHistory.length - 1].children" :key="index">
              {{item.name}}
            </mu-list-item>
          </mu-list>
          <div v-if="isLoadingClasses" align="center">
            <mu-circular-progress class="demo-circular-progress" :size="56"></mu-circular-progress>
          </div>
        </div>

        <div slot="actions">
          <mu-button flat color="primary" @click="backPreviewClassMapping()" v-if="classTreeSelectHistory.length > 1">上一个</mu-button>
          <mu-button flat color="primary" @click="_closeDialog()">关闭</mu-button>
        </div>
      </mu-dialog>
    </div>
</template>

<script>
import Utils from "@/commons/utils";
import UX from "@/commons/ux";

const Business = window.$ressim.businesses;

export default {
  name: "pc-class-choosing",

  props: {
    term: String
  },

  data() {
    return {
      // Should open dialog
      isDialogOpened: false,

      // Show loading
      isLoadingClasses: false,

      // Current selected class
      className: "",

      // Raw data
      classList: [],

      // Dialog choosing
      classMapping: {},
      classTreeSelectHistory: []
    };
  },

  mounted() {},

  watch: {
    className(newValue, oldValue) {
      this.$emit("changed", newValue);
    }
  },

  methods: {
    loadClassList() {
      this.isLoadingClasses = true;
      Utils.newRequest(`/api/term/${this.term}/class`)
        .then(response => {
          const data = response.data;
          if (!data || data.length <= 0) {
            this._handleEmptyData();
            return;
          }

          this.classList = data;
          this.classMapping = Business.buildClassTree(
            Business.splitClassNames(this.classList)
          );

          this.classTreeSelectHistory.push(this.classMapping);
        })
        .catch(error => this._handleEmptyData())
        .then(() => (this.isLoadingClasses = false));
    },

    gotoNextClassMapping(target) {
      if (target.children) {
        this.classTreeSelectHistory.push(target);
      } else {
        this.className = target.name;
        this._closeDialog();
      }
    },

    backPreviewClassMapping() {
      if (this.classTreeSelectHistory.length > 1) {
        this.classTreeSelectHistory.pop();
      }
    },

    /**
     *
     * Helper methods
     *
     */

    _openDialog() {
      this.isDialogOpened = true;
      if (this.classList.length <= 0) {
        this.loadClassList();
      }
    },

    _closeDialog() {
      this.isDialogOpened = false;
      this.classTreeSelectHistory = [];
      this.classTreeSelectHistory.push(this.classMapping);
    },

    _handleEmptyData() {
      UX.toastDefault("无班级数据");
      this.isLoadingClasses = false;
      this._closeDialog();
    }
  }
};
</script>

<style>
</style>
