<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-primary">
                <div class="panel-body">
                    <div class="page-head">
                        <h3>班级课表</h3>
                        <hr>
                    </div>
                    <div class="form-group">
                        <label>班级</label>
                        <bs-selector :options="classList" v-model="queryForm.term" liveSearch="true"></bs-selector>
                    </div>
                    <div class="form-group">
                        <label>周</label>
                         <bs-selector :options="weekList" v-model="queryForm.week"></bs-selector>
                    </div>
                    <div class="form-group">
                        <label>排除课程类型</label>
                        <bs-selector :options="courseTypeList" v-model="queryForm.excludedTypes" multiple></bs-selector>
                    </div>
                </div>
                <div class="panel-footer">
                    <button class="btn btn-success btn-block" @click="formSubmit(queryForm)">查询</button>
                    <router-link to="/" class="btn btn-block btn-default">返回</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
  name: "classQuery",
  data: () => {
    return {
      classList: [],
      weekList: ["1", "2", "3", "4"],
      courseTypeList: ["种类 1", "种类 2", "种类 3", "种类 4", "种类 5"],
      queryForm: {
        term: null,
        week: null,
        excludedTypes: null
      }
    };
  },

  mounted() {
    axios
      .get(
        "/api/term/2017-2018%e5%ad%a6%e5%b9%b4%e7%ac%ac%e4%ba%8c%e5%ad%a6%e6%9c%9f?class"
      )
      .then(response => {
        this.classList = response.data.classes;
      });

    axios
      .get(
        "/api/term/2017-2018%e5%ad%a6%e5%b9%b4%e7%ac%ac%e4%ba%8c%e5%ad%a6%e6%9c%9f?weekRange"
      )
      .then(response => {
        const weekRange = response.data;
        var arr = [];
        for (var i = weekRange.min; i <= weekRange.max; i++) {
          arr.push(i);
        }
        this.weekList = arr;
      });

    axios
      .get(
        "/api/term/2017-2018%e5%ad%a6%e5%b9%b4%e7%ac%ac%e4%ba%8c%e5%ad%a6%e6%9c%9f?classType"
      )
      .then(response => {
        this.courseTypeList = response.data.classTypes;
      });
  },

  methods: {
    formSubmit(formData) {
      console.log(formData);
    }
  }
};
</script>
