<template>
  <div class="container-fuild" style="margin:10pt">
    <div class="row">

      <!-- Term info, class choosing and exclude type choosing -->
      <div class="col col-lg-4">
        <mu-paper :z-depth='1'>

          <mu-appbar style="width: 100%;" color="primary">
            <div>
              <p>班级课表</p>
            </div>
            <mu-button flat slot="right" @click="$router.go(-1)">
              <mu-icon left value="arrow_back"></mu-icon>
              返回
            </mu-button>
          </mu-appbar>

          <div style="padding: 3pt 10pt">

            <div>
              <div style="padding:5pt 0pt; font-size: 17px">当前学期</div>
              <mu-button full-width>{{term}}</mu-button>
            </div>
            
            <div>
              <div style="padding:5pt 0pt; font-size: 17px">班级</div>
              <class-choosing :term="term" @changed="onClassChanged($event)"></class-choosing>
            </div>

            <div>
              <div style="padding:5pt 0pt; font-size: 17px">排除课程类型</div>
              <mu-select v-model="selectedexcludedTypes" chips multiple full-width no-data-text="空">
                <mu-option v-for="(item,index) in courseTypeList" :key="index" :label="item" :value="item"></mu-option>
              </mu-select>
            </div>

          </div>
        </mu-paper>
      </div>

      <div class="col col-lg-8">
        <div style="">
          <!-- Week range list -->
          <week-bar class="mu-elevation-4" :max="maxWeek" :min="minWeek" :activated="activatedWeekList" @changed="onWeekChanged($event)"></week-bar>
        </div>

        <div style="margin-top:10pt">
          <mu-paper :z-depth="1" v-if="queryResult.length > 0">
            <div v-for="(item,index) in queryResult" :key="index">
              {{item}}
            </div>
          </mu-paper>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";
import axios from "axios";

import ClassChoosing from "./classQuery/classChoosing";
import WeekBar from "./classQuery/weekBar";

export default {
  name: "pc-class-query",

  components: {
    ClassChoosing,
    WeekBar
  },

  props: {
    term: String
  },

  data: () => {
    return {
      classList: [],

      maxWeek: 0,
      minWeek: 0,
      activatedWeekList: [],

      // Course type
      courseTypeList: [],

      courseTypeExcludeList: {},

      selectedClass : "",
      selectedWeek : "",
      selectedexcludedTypes: [],

      queryResult : []
    };
  },

  mounted() {
    console.log(`${this.maxWeek} <- ${this.minWeek}`);

    Utils.newRequest(`/api/term/${this.term}?class`).then(response => {
      this.classList = response.data.classes;
    });

    Utils.newRequest(`/api/term/${this.term}?weekRange`).then(response => {
      this.maxWeek = response.data.max;
      this.minWeek = response.data.min;
    });

    Utils.newRequest(`/api/term/${this.term}?classType`).then(response => {
      this.courseTypeList = response.data.classTypes;
    });
  },

  watch: {
    selectedWeek(newValue, oldValue) {
      console.log("Method called");
      if ((this.selectedWeek != null) && this.selectedWeek != null) {
        console.log("New Request")
        Utils.newQuery(`/api/term/${this.term}/course`, {
          class: this.selectedClass,
          week: this.selectedWeek,
          excludedType: this.selectedexcludedTypes
        }).then(response => {
          this.queryResult = response.data;
        });
      }
    }
  },

  methods: {
    // formSubmit(formData) {
    //   this.$router.push({
    //     path: `/pc/term/${this.term}/class/${this.queryForm.class}/schedule`,
    //     query: {
    //       week: this.queryForm.week,
    //       excludedTypes: this.queryForm.excludedTypes
    //     }
    //   });
    // },

    onClassChanged(newClass) {
      Utils.newRequest(`/api/term/${this.term}/${newClass}?weeks`).then(
        r => (this.activatedWeekList = r.data.weeks)
      );

      this.selectedClass = newClass;
    },

    onWeekChanged(newWeek) {
      this.selectedWeek = newWeek;
    }
  },

  computed: {}
};
</script>

<style scoped>
</style>

