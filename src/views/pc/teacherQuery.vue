<template>
  <div>
    <div class="page-header">
      <h1 align="center">教师课表 <small>in {{term}}</small></h1>
    </div>
    <div class="row">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-primary">
          <div class="panel-body">
            <div class="page-head">
              <h3>教师课表</h3>
              <hr>
            </div>
            <div class="form-group">
              <label>教师名称</label>
              <input type="text" class="form-control">
            </div>
            <div class="form-group">
              <label>周</label>
              <input type="number" class="form-control">
            </div>
            <div class="form-group">
              <label>排除课程类型</label>
              <select class="form-control"></select>
            </div>
          </div>
          <div class="panel-footer">
            <button class="btn btn-success btn-block">查询</button>
            <router-link to="/" class="btn btn-block btn-default">返回</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      term: String
    },
    name: "teacherQuery"
  };
</script>