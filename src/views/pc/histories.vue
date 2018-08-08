<template>
  <div>
    <div class="page-header">
      <h1 align="center">简单课表查询 <small>for 广东岭南职业技术学院</small></h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3>历史学期</h3>
          </div>
          <div class="list-group">
            <a v-for="(item,index) in terms" :key="index" class="list-group-item">
              <div class="pull-left">{{item.name}}</div>
              <div class="pull-right">{{item.courseCount}} 门课程</div>
              <div class="clearfix"></div>
            </a>
            <!-- <a href="#" class="list-group-item">2017-2018 年第一学期</a>
                      <a href="#" class="list-group-item">2016-2017 年第一学期</a>
                      <a href="#" class="list-group-item">2015-2016 年第一学期</a>
                      <a href="#" class="list-group-item">2014-2015 年第一学期</a> -->
          </div>
          <div class="panel-footer">
            <router-link to="/" class="btn btn-default btn-sm pull-right">返回</router-link>
            <div class="clearfix">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  h3 {
    margin-top: 10pt;
  }
</style>

<script>
  import axios from "axios";
  
  export default {
    name: "histories",
    data: () => {
      return {
        terms: []
      }
    },
    mounted() {
      axios.get("/api/term").then(response => {
        this.terms = response.data
      })
    }
  }
</script>
