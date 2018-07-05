<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3>班级课表</h3>
              </div>
              <div class="panel-body">
                  <div class="form-group">
                      <label>班级</label>
                      <v-select :options="classList" v-model="queryForm.class" ></v-select>
                  </div>
                  <div class="form-group">
                      <label>周 ({{minWeek}}-{{maxWeek}})</label>
                        <!-- <v-select :options="weekList" v-model="queryForm.week"></v-select> -->
                        <input type="number" :max="maxWeek" :min="minWeek" v-model="queryForm.week" class="form-control" :placeholder="weekRangePlaceholder">
                  </div>
                  <div class="form-group">
                      <label>排除课程类型</label>
                      <v-select :options="courseTypeList" v-model="queryForm.excludedTypes" multiple></v-select>
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
        // this.weekRangePlaceholder = response.data;
        this.maxWeek = response.data.max;
        this.minWeek = response.data.min;

        console.log(`${this.maxWeek} <- ${this.minWeek}`);
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
  },

  computed: {
    weekRangePlaceholder: {
      get: () => "最小" + this.minWeek + " 最大 " + this.maxWeek + "。"
    }
  }
};
</script>
