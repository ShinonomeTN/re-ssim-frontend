<template>
  <mu-container style="margin-top:60pt">
    <div class="row">
      <div class="col-md-7 col-lg-8"></div>
      <div class="col-md-5 col-lg-4">
        <mu-paper :z-depth="1" style="padding: 10pt; margin-bottom: 10pt" round>
          <school-calendar :calendar="this.$store.state.calendar"></school-calendar>
        </mu-paper>

        <mu-paper :z-depth="1" style="margin-bottom: 10pt">
          <mu-list>
            <mu-list-item
              button
              v-for="(item,index) in functionList"
              :key="index"
              @click="$router.push(item.to(currentTerm))"
              class="list-group-item"
            >
              <mu-list-item-action>
                <mu-icon :value="item.icon"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>{{item.title}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-paper>

        <mu-paper :z-depth="1">
          <mu-list>
            <mu-list-item button :ripple="false" class="list-group-item" @click="login()">
              <mu-list-item-action>
                <mu-icon value="info"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>共 {{termList.length}} 个学期的数据</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </div>
    </div>
  </mu-container>
</template>

<script>
import Utils from "@/commons/utils";
import Toast from "muse-ui-toast";

import SchoolCalendar from "@/components/schoolCalendar";

export default {
  name: "pc-welcome",

  components: {
    SchoolCalendar
  },

  mounted() {},

  data() {
    return {
      loginCounter: 0,

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
    currentTerm() {
      return this.$store.state.calendar.term;
    },

    termList() {
      return this.$store.state.courseTermList;
    }
  },

  methods: {
    login() {
      if (this.loginCounter < 7) {
        this.loginCounter++;
      } else {
        this.$router.push("/staff");
        this.loginCounter = 0;
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
