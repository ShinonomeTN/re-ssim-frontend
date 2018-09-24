<template>
  <mu-container style="margin-top:100pt">
    <div class="col-md-12 col-lg-8 offset-lg-2 ">
      <mu-paper :z-depth='1'>
        <mu-appbar style="width: 100%;" title="简单课表查询" color="primary">
          <mu-button icon slot="left">
            <mu-icon value="event"></mu-icon>
          </mu-button>
          <mu-button flat slot="right" v-if="menuState === 'select_history'" @click="backToFunctionList()">
            <mu-icon left value="arrow_back"></mu-icon>
            返回
          </mu-button>
        </mu-appbar>

        <!-- Select function  -->
        <div class="container-fluid center-container" v-if="menuState === 'select_function'">
          <div class="row align-items-center">
            <mu-col span="6">
              <div v-if="!term">
                <h1 style="text-align:center">{{currentTerm}}<br>
                  <small>{{`7 月 1 日，第${termWeek} 星期一`}}</small>
                </h1>
              </div>
              <div v-else>
                <h1 style="text-align:center">{{currentTerm}}<br>
                  <small>历史学期</small>
                </h1>
              </div>
            </mu-col>
            <mu-col span='6' style="border-left: 1pt solid lightgray;">
              <div>
                <mu-list>
                  <mu-list-item button v-for="(item,index) in functionList" :key="index" @click="$router.push(item.to(currentTerm))" class="list-group-item">
                    <mu-list-item-action>
                      <mu-icon :value="item.icon"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{item.title}}</mu-list-item-title>
                  </mu-list-item>
                  <mu-list-item button @click="enterSelectTerm()" class="list-group-item">
                    <mu-list-item-action>
                      <mu-icon value="history"></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>历史学期</mu-list-item-title>
                  </mu-list-item>
                </mu-list>
              </div>
            </mu-col>
          </div>
        </div>

        <!-- Select history -->
        <div class="container-fluid center-container" v-if="menuState === 'select_history'">
          <div class="row align-items-center">
            <mu-col span="6" style="text-align:center">
              <mu-icon value="history" size="56" center></mu-icon>
              <h1 style="margin-top:0">选择历史学期</h1>
            </mu-col>
            <mu-col span='6' style="border-left: 1pt solid lightgray;">
              <div align="center">
                <mu-circular-progress class="demo-circular-progress " :size="56" v-if="isLoadingTermHistories"></mu-circular-progress>
                <div v-else style="height:208px; overflow-y: auto">
                  <mu-list>
                    <mu-list-item button v-for="(item,index) in termHistories" :key="index" @click="toTerm(item.name)" class="list-group-item">
                      <mu-list-item-action v-if="item.name === currentTerm">
                        <mu-badge content="当前" color="primary"></mu-badge>
                      </mu-list-item-action>
                      <mu-list-item-title>{{item.name}}</mu-list-item-title>
                      <mu-list-item-action>
                        <mu-badge :content="`${item.courseCount}`" color="secondary"></mu-badge>
                      </mu-list-item-action>
                    </mu-list-item>
                  </mu-list>
                </div>
              </div>
            </mu-col>
          </div>
        </div>
      </mu-paper>
    </div>
  </mu-container>
</template>

<script>
import Utils from "@/commons/utils";
import UX from "@/commons/ux";

export default {
  name: "pc-welcome",

  props: {
    term: String
  },

  data: () => {
    return {
      termWeek: "二十周",

      menuState: "select_function",

      termHistories: [],
      isLoadingTermHistories: false,

      // The function menu
      functionList: [
        {
          title: "班级课表",
          to: termName => `/pc/term/${termName}/class`,
          icon: "face"
        },
        {
          title: "教师课表",
          to: termName => `/pc/term/${termName}/teacher`,
          icon: "assignment_ind"
        },
        {
          title: "课程一览",
          to: termName => `/pc/term/${termName}/courses`,
          icon: "dashboard"
        }
      ]
    };
  },

  computed: {
    currentTerm: () => (this.term ? this.term : "2017-2018学年第二学期")
  },

  methods: {
    //
    // UI status changing
    //
    enterSelectTerm() {
      this.menuState = "select_history";

      if (this.termHistories.length <= 0) {
        this._updateHistoriesList();
      }
    },

    toTerm(termName) {
      if (termName === this.currentTerm) {
        this.$router.push("/pc/current");
      } else {
        this.$router.push(`/pc/term/${termName}`);
      }

      this.backToFunctionList();
    },

    backToFunctionList() {
      this.menuState = "select_function";
    },

    /**
     *
     * Helper methos
     *
     */
    _updateHistoriesList() {
      this.isLoadingTermHistories = true;

      Utils.newRequest("/api/term")
        .then(r => {
          if (!r.data || r.data.length <= 0) {
            this._handleEmptyHistories();
            return;
          }

          this.termHistories = r.data;
        })
        .catch(error => {
          if(error.response){
            UX.toastWarning("获取数据错误");
            this.backToFunctionList();

            console.log(error);
          }
        })
        .then(() => {
          this.isLoadingTermHistories = false;
        });
    },

    _handleEmptyHistories() {
      UX.toastWarning("无历史数据");
      this.backToFunctionList();
    }
  }
};
</script>

<style scoped>
.center-container {
  padding-top: 10pt; 
  padding-bottom: 10pt;
}
</style>
