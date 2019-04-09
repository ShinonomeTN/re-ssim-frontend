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
              <term-choosing v-model="term" @changed="onTermChanged($event)"></term-choosing>
            </div>

            <div>
              <div style="padding:5pt 0pt; font-size: 17px">教师</div>
              <mu-select v-model="selectedTeacher" label="选择任课教师" full-width filterable>
                <mu-option v-for="name in teacherList" :key="name" :label="name" :value="name"></mu-option>
              </mu-select>
            </div>
          </div>
        </mu-paper>
      </div>

      <!-- Lesson list content -->
      <div class="col col-lg-8">
        <div>
          <!-- Week range list -->
          <week-bar ref="weekBar" class="mu-elevation-4" :max="maxWeek" :min="minWeek" :activated="activatedWeeks" @changed="onWeekChanged($event)"></week-bar>
        </div>

        <div style="margin: 10pt 5pt 0 0;">
          <div class="view_trigger"><span>日视图</span> <mu-switch v-model="listMode"></mu-switch> <span>周视图</span></div>
        </div>

        <div style="margin-top: 10pt">
          <lesson-list v-if="listMode" :data="queryResult" placeholder="选择教师与周以查看课程">
            <template slot-scope="scope">
              <div>
                <mu-badge :content="scope.lesson.code" color="primary"></mu-badge> 
                {{scope.lesson.name}}（{{scope.lesson.classType}})
              </div>
              <div style="padding-left: 10pt"><small>{{scope.lesson.position}}</small></div>
            </template>
          </lesson-list>

          <lesson-week-page v-else :data="queryResult" placeholder="选择教师与周以查看课程">
            <template slot-scope="scope">
              <div>
                <mu-badge :content="scope.lesson.code" color="primary"></mu-badge> 
                {{scope.lesson.name}}（{{scope.lesson.classType}})
              </div>
              <div style="padding-left: 10pt"><small>{{scope.lesson.position}}</small></div>
            </template>
          </lesson-week-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";
import Toast from "muse-ui-toast";

import WeekBar from "@/components/weekBar";
import LessonList from "./components/lessonList";
import LessonWeekPage from "./components/lessonWeekPage";

import TermChoosing from "./components/termChoosing";

export default {
  name: "pc-teacher-query",

  props: {
    term: String
  },

  components: {
    WeekBar,
    LessonList,
    LessonWeekPage,
    TermChoosing
  },

  data() {
    return {
      listMode: false,

      currentTermInfo: {},

      teacherList: [],
      // courseTypeList: [],
      activatedWeeks: [],

      selectedTeacher: "",
      selectedWeek: 0,

      queryResult: []
    };
  },
  onRouterUpdate(_, next) {
    this.getCurrentTerm();

    Utils.newRequest(`/api/term/${this.term}/teacher`).then(response => {
      this.teacherList = response.data;
    });

    next();
  },
  mounted() {
    this.getCurrentTerm();

    Utils.newRequest(`/api/term/${this.term}/teacher`).then(response => {
      this.teacherList = response.data;
    });
  },

  // watch: {
  //   selectedTeacher: (newVal, oldVal) => {
  //     if (!!this.selectedTeacher && !!this.selectedWeek) {

  //     }
  //   }
  // },

  methods: {
    getCurrentTerm() {
      const termList = this.$store.state.courseTermList;
      if (termList.size === 0) {
        Toast.error("没有学期数据");
        this.$router.push("/");
        return;
      }

      const calendar = this.$store.state.calendar;
      this.currentTermInfo = termList.find((o, i, a) => {
        if (this.term) return o.name === this.term;
        else if (calendar.term) return o.name === calendar.term;
        else return i === 0;
      });

      if (this.currentTermInfo == null) {
        this.currentTermInfo = termList[0];
        Toast.error("没有当前校历的课程数据！");
      }

      if (this.currentTermInfo == null) {
        Toast.error("没有学期数据");
        this.$router.push("/");
        return;
      }
    },

    query(teacherName, week) {
      Utils.newRequest(
        `/api/term/${this.term}/teacher/${teacherName}/course?week=${week}`
      ).then(resp => (this.queryResult = resp.data));
    },

    onTermChanged(term) {
      this.$router.push(`/pc/term/${term}/teacher`);
    }
  }
};
</script>