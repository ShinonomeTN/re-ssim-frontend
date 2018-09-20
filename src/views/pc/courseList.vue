<template>
  <div>
    <div class="page-header">
      <h1 align="center">学院与课程 <small>in {{term}}</small></h1>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="pull-left">学院</div>
            <router-link to="/" class="btn btn-xs btn-default pull-right">首页</router-link>
            <div class="clearfix"></div>
          </div>
          <div class="list-group">
            <a class="list-group-item" @click="currentCourse = key" v-for="(unit,key,index) in courseList" :key="index">{{key}}</a>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <div class="panel panel-default rs-list">
          <div class="panel-heading">
            {{currentCourse ? currentCourse : "选择一个学院查看"}}
          </div>
          <div class="list-group" v-if="currentCourse && courseList[currentCourse]">
            <div v-for="(item,index) in courseList[currentCourse]" :key="index" class="list-group-item">
              <div><label>{{item.name}}</label></div>
              <hr>
              <div>代号 : {{item.code}}</div>
              <div>类型 : {{item.classType}}</div>
            </div>
          </div>
          <div class="panel-body" v-if="!(currentCourse && courseList[currentCourse])">
            空
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const groupBy = $ressim.collections.groupBy;

export default {
  name: "pc-course-list",

  props: {
    term: String
  },

  data() {
    return {
      courseList: {},
      currentCourse: ""
    };
  },
  mounted() {
    axios.get(`/api/term/${this.term}?course`).then(response => {
      this.courseList = groupBy(response.data, "unit");
    });
  }
};
</script>

<style scoped>
.floatContainer > div {
  display: inline-block;
  width: 200pt;
}

hr {
  margin: 3pt 0pt;
}
</style>

