<template>
  <mu-container style="margin-top:100pt">
    <div class="col-md-12 col-lg-8 offset-lg-2 ">
      <mu-paper :z-depth='1'>
        <mu-appbar style="width: 100%;" title="简单课表查询" color="primary">
          <mu-button icon slot="left">
            <mu-icon value="event"></mu-icon>
          </mu-button>
        </mu-appbar>

        <!-- Select function  -->
        <div class="container-fluid center-container">
          <div class="row align-items-center">
            <mu-col span="6">
              <h1 style="text-align:center">{{currentTerm}}<br>
                <small>{{`7 月 1 日，第${termWeek} 星期一`}}</small>
              </h1>
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
                </mu-list>
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
    currentTerm: () => "2017-2018学年第二学期"
  },

  methods: {}
};
</script>

<style scoped>
.center-container {
  padding-top: 10pt;
  padding-bottom: 10pt;
}
</style>
