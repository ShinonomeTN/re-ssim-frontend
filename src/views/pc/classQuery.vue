<template>
  <div>
    <div class="page-header">
      <h1 align="center">班级课表 <small>in {{term}}</small></h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3>班级课表</h3>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <label>班级</label>
              <v-select :options="classList" v-model="queryForm.class"></v-select>
            </div>
            <div class="form-group">
              <label>周 ({{minWeek}}-{{maxWeek}})</label>
              <input type="number" :max="maxWeek" :min="minWeek" v-model="queryForm.week" class="form-control" :placeholder="`最小 ${minWeek} 最大 ${maxWeek}`">
            </div>
            <div class="form-group">
              <label>排除课程类型</label>
              <v-select :options="courseTypeList" v-model="queryForm.excludedTypes" multiple></v-select>
            </div>
          </div>
          <div class="panel-footer">
            <button class="btn btn-success btn-block" @click="formSubmit(queryForm)">查询</button>
            <button @click="$router.go(-1)" class="btn btn-block btn-default">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";
import axios from "axios";

export default {
  name: "pc-class-query",

  props: {
    term: String
  },

  data: () => {
    return {
      classList: [],

      maxWeek: 0,
      minWeek: 0,
      courseTypeList: [],

      queryForm: {
        class: null,
        week: null,
        excludedTypes: null
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
          week : this.queryForm.week,
          excludedTypes : this.queryForm.excludedTypes
        }
      });
    }
  },

  computed: {}
};
</script>
