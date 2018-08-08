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
            <router-link :to="`/pc/term/${item.name}`" v-for="(item,index) in terms" :key="index" class="list-group-item">
              <div class="pull-left">{{item.name}}</div>
              <div class="pull-right">{{item.courseCount}} 门课程</div>
              <div class="clearfix"></div>
            </router-link>
          </div>
          <div class="panel-footer">
            <button @click="$router.go(-1)" class="btn btn-default pull-right">返回</button>
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
    name: "pc-histories",
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
