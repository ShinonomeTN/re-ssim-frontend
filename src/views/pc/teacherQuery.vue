<template>
  <div class="container-fuild" style="margin-top: 10pt">
    <div class="row">
      <!-- Term info, class choosing and exclude type choosing -->
      <div class="col col-lg-4">
        <mu-paper :z-depth='1'>

          <mu-appbar style="width: 100%;" color="primary">
            <div>
              <p>教师课表</p>
            </div>
            <mu-button flat slot="right" @click="$router.go(-1)">
              <mu-icon left value="arrow_back"></mu-icon>
              返回
            </mu-button>
          </mu-appbar>

          <div style="padding: 3pt 10pt 10pt 10pt">
            <div>
              <div style="padding:5pt 0pt; font-size: 17px">当前学期</div>
              <mu-button full-width>{{term}}</mu-button>
            </div>

            <div>
              <div style="padding:5pt 0pt; font-size: 17px">教师</div>
              <mu-button full-width color="orange">某个教师</mu-button>
            </div>
          </div>
        </mu-paper>
      </div>

      <!-- Lesson list content -->
      <div class="col col-lg-8">
        <div>
          <!-- Week range list -->
          <week-bar ref="weekBar" class="mu-elevation-4" :max="maxWeek" :min="minWeek" :activated="[]"></week-bar>
        </div>

        <div style="margin: 10pt 5pt 0 0;">
          <div class="view_trigger"><span>日视图</span> <mu-switch v-model="listMode"></mu-switch> <span>周视图</span></div>
        </div>

        <div style="margin-top: 10pt">
          <lesson-list v-if="listMode" :data="queryResult"></lesson-list>
          <lesson-week-page v-else :data="queryResult"></lesson-week-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";

import WeekBar from "@/components/weekBar";
import LessonList from "./classQuery/lessonList";
import LessonWeekPage from "./classQuery/lessonWeekPage";

export default {
  name: "pc-teacher-query",

  props: {
    term: String
  },

  components: {
    WeekBar,
    LessonList,
    LessonWeekPage
  },

  data() {
    return {
      listMode: false,

      teacherList: [],
      courseTypeList: [],

      maxWeek: 0,
      minWeek: 0,

      queryResult: {}
    };
  },

  mounted() {
    Utils.newRequest(`/api/term/${this.term}?teacher`).then(response => {
      this.teacherList = response.data.teachers;
    });

    Utils.newRequest(`/api/term/${this.term}?weekRange`).then(response => {
      this.maxWeek = response.data.max;
      this.minWeek = response.data.min;
    });
  }
};
</script>