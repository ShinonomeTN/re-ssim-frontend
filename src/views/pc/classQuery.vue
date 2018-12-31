<template>
  <mu-paper :z-depth="4" class="container-fuild" style="margin:10pt; min-height: 400pt">

    <div class="row">
      <!-- Term info, class choosing and exclude type choosing -->
      <div class="col col-lg-4">
        <div style="padding: 3pt 10pt">

          <div>
            <div style="padding:5pt 0pt; font-size: 17px">当前学期</div>
            <term-choosing v-model="term" @changed="onTermChanged($event)"></term-choosing>

          </div>

          <div>
            <div style="padding:5pt 0pt; font-size: 17px">班级</div>
            <class-choosing :term="term" v-model="selectedClass"></class-choosing>
          </div>

          <div>
            <div style="padding:5pt 0pt; font-size: 17px">排除课程类型</div>
            <mu-select v-model="selectedExcludedTypes" chips multiple full-width no-data-text="空">
              <mu-option v-for="(item,index) in currentTermInfo.courseTypes" :key="index" :label="item" :value="item"></mu-option>
            </mu-select>
          </div>

        </div>
      </div>

      <div class="col col-lg-8">
        <div style="margin: 10pt 10pt 0 0">

          <div style="">
            <!-- Week range list -->
            <week-bar ref="weekBar" class="mu-elevation-4" :max="currentTermInfo.maxWeek" :min="currentTermInfo.minWeek"
              :activated="activatedWeekList" v-model="selectedWeek"></week-bar>
          </div>

          <div style="margin: 10pt 5pt 0 0;">
            <div class="view_trigger">
              <span>日视图</span>
              <mu-switch v-model="listMode"></mu-switch>
              <span>周视图</span>
            </div>
          </div>

          <div style="margin-top: 10pt">
            <lesson-list v-if="listMode" :data="queryResult">
              <template slot-scope="scope">
                <div>
                  <mu-badge :content="scope.lesson.code" color="primary"></mu-badge>
                  {{scope.lesson.name}}（{{scope.lesson.classType}})
                </div>
                <div style="padding-left: 10pt">
                  <small>{{scope.lesson.position}}， {{scope.lesson.teacher}} 任课</small>
                </div>
              </template>
            </lesson-list>

            <lesson-week-page v-else :data="queryResult">
              <template slot-scope="scope">
                <div>
                  <mu-badge :content="scope.lesson.code" color="primary"></mu-badge>
                  {{scope.lesson.name}}（{{scope.lesson.classType}})
                </div>
                <div style="padding-left: 10pt">
                  <small>{{scope.lesson.position}}， {{scope.lesson.teacher}} 任课</small>
                </div>
              </template>
            </lesson-week-page>
          </div>
        </div>
      </div>

    </div>
  </mu-paper>
</template>

<script>
import Utils from "@/commons/utils";
import Toast from "muse-ui-toast";

import WeekBar from "@/components/weekBar";

import ClassChoosing from "./components/classChoosing";
import TermChoosing from "./components/termChoosing";

import LessonList from "./components/lessonList";
import LessonWeekPage from "./components/lessonWeekPage";

export default {
  name: "pc-class-query",

  components: {
    WeekBar,
    ClassChoosing,
    LessonList,
    LessonWeekPage,
    TermChoosing
  },

  props: {
    term: String
  },

  data: () => {
    return {
      currentTermInfo: {},

      listMode: false,

      activatedWeekList: [],

      // Course type
      courseTypeExcludeList: {},

      selectedClass: "",
      selectedWeek: 0,
      selectedExcludedTypes: [],

      queryResult: []
    };
  },

  beforeRouterUpdate(_, next) {
    this.getCurrentTerm();
    next();
  },

  mounted() {
    this.getCurrentTerm();
  },

  watch: {
    selectedWeek(newValue, oldValue) {
      this.queryClassLessons();
    },

    selectedClass(newValue, oldValue) {
      this.updateActivatedWeeks();
      this.queryClassLessons();
    },

    selectedExcludedTypes(newValue, oldValue) {
      this.queryClassLessons();
    }
  },

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
        Toast.error("没有当前校历的学期课程数据");
        this.currentTermInfo = termList[0];
      }

      if (this.currentTermInfo == null) {
        Toast.error("没有学期数据");
        this.$router.push("/");
        return;
      }
    },

    queryClassLessons() {
      if (!!this.selectedWeek && !!this.selectedWeek) {
        // console.log("New Request")
        Utils.newQuery(
          `/api/term/${this.term}/class/${this.selectedClass}/course`,
          {
            // class: this.selectedClass,
            week: this.selectedWeek,
            excludedType: this.selectedExcludedTypes
          }
        ).then(response => {
          this.queryResult = response.data;
        });
      }
    },

    onTermChanged(term) {
      this.$router.push(`/pc/term/${term}/class`);
    },

    updateActivatedWeeks() {
      Utils.newRequest(
        `/api/term/${this.term}/class/${this.selectedClass}/week`
      ).then(r => (this.activatedWeekList = r.data));
    }
  },

  computed: {
    switcherLabel() {
      return this.listMode ? "周列表" : "日列表";
    }
  }
};
</script>

<style scoped>
.view_trigger {
  margin: 0 3pt;
}
</style>

