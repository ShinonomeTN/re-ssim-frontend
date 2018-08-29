<template>
  <div class="container-fuild" style="margin:10pt">
    <div class="row">

      <!-- Term info, class choosing and exclude type choosing -->
      <div class="col col-lg-3">
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
              <class-choosing :term="term"></class-choosing>
            </div>

            <div>
              <div style="padding:5pt 0pt; font-size: 17px">排除课程类型</div>
              <mu-select v-model="queryForm.excludedTypes" chips multiple full-width no-data-text="空">
                <mu-option v-for="(item,index) in courseTypeList" :key="index" :label="item" :value="item"></mu-option>
              </mu-select>
            </div>

          </div>
        </mu-paper>
      </div>

      <div class="col col-lg-9">
        <div style="margin-top:10pt">
          <!-- Week range list -->
          <week-bar :max="maxWeek" :min="minWeek" :activated="activatedWeekList"></week-bar>
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
      activatedWeekList : [],

      // Course type
      courseTypeList: [],

      courseTypeExcludeList: {},

      queryForm: {
        class: null,
        week: null,
        excludedTypes: []
      }
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

  methods: {
    formSubmit(formData) {
      this.$router.push({
        path: `/pc/term/${this.term}/class/${this.queryForm.class}/schedule`,
        query: {
          week: this.queryForm.week,
          excludedTypes: this.queryForm.excludedTypes
        }
      });
    }
  },

  computed: {}
};
</script>

<style scoped>

</style>

