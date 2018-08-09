<template>
  <div>
    <div class="page-header">
      <h1 align="center">教师课表 <small>in {{term}}</small></h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3>教师课表</h3>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <label>教师名称</label>
              <v-select :options="teacherList" v-model="queryForm.teacher"></v-select>
            </div>
            <div class="form-group">
              <label>周 ({{minWeek}}-{{maxWeek}})</label>
              <!-- <v-select :options="weekList" v-model="queryForm.week"></v-select> -->
              <input type="number" :max="maxWeek" :min="minWeek" v-model="queryForm.week" class="form-control" :placeholder="`最小 ${minWeek} 最大 ${maxWeek}`">
            </div>
            <div class="form-group">
              <label>排除课程类型</label>
              <v-select :options="courseTypeList" v-model="queryForm.excludedType" multiple></v-select>
            </div>
          </div>
          <div class="panel-footer">
            <button class="btn btn-success btn-block">查询</button>
            <button @click="$router.go(-1)" class="btn btn-block btn-default">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/commons/utils";

export default {
  name: "pc-teacher-query",

  props: {
    term: String
  },

  data() {
    return {
      teacherList: [],
      courseTypeList: [],

      maxWeek: 0,
      minWeek: 0,

      queryForm: {
        teacher: "",
        week: null,
        excludedType: null
      }
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

    Utils.newRequest(`/api/term/${this.term}?classType`).then(response => {
      this.courseTypeList = response.data.classTypes;
    });
  }
};
</script>