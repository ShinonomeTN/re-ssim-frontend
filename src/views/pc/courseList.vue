<template>
  <mu-paper :z-depth="4" style="margin-top: 10pt">
    <mu-appbar color="primary">
      <mu-button icon slot='right' @click="$router.push('/')">
        <mu-icon value="home"></mu-icon>
      </mu-button>
      学院与课程
      <small>in {{term}}</small>
    </mu-appbar>

    <div style="margin-top: 10pt">
      <div class="row">

        <div class="col-sm-3">
          <mu-list :value="currentCourse">
            <mu-list-item button class="list-group-item" :value="key" @click="currentCourse = key" v-for="(unit,key) in courseList" :key="key">
              <mu-list-item-title>{{key}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </div>

        <div class="col-sm-9">
          <div class="panel panel-default rs-list">
            <div class="panel-heading">
              {{currentCourse ? currentCourse : "选择一个学院查看"}}
            </div>

            <div class="list-group" v-if="currentCourse && courseList[currentCourse]">
              <div v-for="(item,index) in courseList[currentCourse]" :key="index" class="list-group-item">
                <div>
                  <label>{{item.name}}</label>
                </div>
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
  </mu-paper>
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

