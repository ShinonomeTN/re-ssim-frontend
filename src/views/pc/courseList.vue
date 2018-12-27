<template>
  <div style="margin: 10pt">
    <div class="row">

      <div class="col-sm-3">
        <mu-paper
          :z-depth="4"
          style="margin-right: 10pt"
        >
          <mu-list :value="currentCourse">
            <mu-list-item
              button
              class="list-group-item"
              :value="key"
              @click="currentCourse = key"
              v-for="(unit,key) in courseList"
              :key="key"
            >
              <mu-list-item-title>{{key}}</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-paper>

      </div>

      <div class="col-sm-9">
        <mu-paper :z-depth='4'>
          <div
            class="panel panel-default rs-list"
            style="padding: 10pt"
          >
            <div class="panel-heading">
              {{currentCourse ? currentCourse : "选择一个学院查看"}}
            </div>

            <div
              class="list-group"
              v-if="currentCourse && courseList[currentCourse]"
            >
              <div
                v-for="(item,index) in courseList[currentCourse]"
                :key="index"
                class="list-group-item"
              >
                <div>
                  <label>{{item.name}}</label>
                </div>
                <hr>
                <div>代号 : {{item.code}}</div>
                <div>类型 : {{item.classType}}</div>
              </div>
            </div>
            <div
              class="panel-body"
              v-if="!(currentCourse && courseList[currentCourse])"
            >
              空
            </div>
          </div>
        </mu-paper>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Utils from "@/commons/utils";

const groupBy = window.$ressim.collections.groupBy;

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
    Utils.newRequest(`/api/term/${this.term}/course`).then(r => {
      const data = r.data;
      console.log(data);
      this.courseList = groupBy(data, "unit");
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

