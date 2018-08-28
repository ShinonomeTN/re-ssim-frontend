<template>
    <div>
      <mu-auto-complete :data="['fake','data']" full-width label="手动填写班级" v-model="className"></mu-auto-complete>
      <mu-button full-width color="orange" @click="openDialog()" >选择一个班级</mu-button>
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
          <mu-button flat color="primary" @click="closeDialog()">关闭</mu-button>
        </div>
      </mu-dialog>
    </div>
</template>

<script>
import Utils from "@/commons/utils";

const Business = $ressim.businesses;

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
      classList: null,

      // Dialog choosing
      classMapping: {},
      classTreeSelectHistory: []
    };
  },

  mounted() {},

  methods: {
    openDialog() {
      this.isDialogOpened = true;
      if (!this.classList) {
        this.loadClassList();
      }
    },

    closeDialog() {
      this.isDialogOpened = false;
      this.classTreeSelectHistory = [];
      this.classTreeSelectHistory.push(this.classMapping);
    },

    loadClassList() {
      this.isLoadingClasses = true;
      Utils.newRequest(`/api/term/${this.term}?class`)
        .then(response => {
          this.classList = Business.splitClassNames(response.data.classes);
          this.classMapping = Business.buildClassTree(this.classList);

          this.classTreeSelectHistory.push(this.classMapping);
        })
        .then(() => (this.isLoadingClasses = false));
    },

    gotoNextClassMapping(target) {
      if (target.children) {
        this.classTreeSelectHistory.push(target);
      } else {
        this.className = target.name;
        this.closeDialog();
      }
    },

    backPreviewClassMapping() {
      if (this.classTreeSelectHistory.length > 1) {
        this.classTreeSelectHistory.pop();
      }
    }
  }
};
</script>

<style>
</style>
